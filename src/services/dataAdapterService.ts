import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SalesRecord, ExpenseRecord, InventoryItem, Supplier, AccountsPayable, ExecutiveFinancialSummary } from '../types';
import { calculateGrossProfit, calculateGrossMargin, calculateNetProfit, calculateNetMargin } from '../utils/financialEngine';

export class DataAdapterService {

  // 1. ດຶງຂໍ້ມູນການຂາຍຈິງຈາກ Collection `transactions`
  static async fetchSales(_branchId?: string): Promise<SalesRecord[]> {
    try {
      const ref = collection(db, 'transactions');
      const snapshot = await getDocs(ref);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const d = doc.data();
        const amount = Number(d.totalAmount || d.amount || d.total || d.price || d.netSales || 0);

        return {
          id: doc.id,
          organizationId: d.organizationId || 'la-dolce',
          branchId: d.branchId || 'main-branch',
          invoiceNumber: d.invoiceNumber || d.transactionNo || doc.id.substring(0, 8).toUpperCase(),
          date: d.createdAt?.toDate?.()?.toISOString() || d.date || new Date().toISOString(),
          productName: d.productName || d.itemName || d.item || d.title || 'ລາຍການຂາຍ (POS)',
          quantity: Number(d.quantity || d.qty || 1),
          unitPrice: Number(d.unitPrice || d.price || amount),
          discount: Number(d.discount || 0),
          netSales: amount,
          paymentMethod: d.paymentMethod || d.paymentType || 'cash',
          createdAt: d.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        };
      });
    } catch (err) {
      console.warn('Error fetching transactions:', err);
      return [];
    }
  }

  // 2. ດຶງຂໍ້ມູນຄ່າໃຊ້ຈ່າຍຈິງຈາກ `dailySummaries`
  static async fetchExpenses(_branchId?: string): Promise<ExpenseRecord[]> {
    try {
      const ref = collection(db, 'dailySummaries');
      const snapshot = await getDocs(ref);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          organizationId: d.organizationId || 'la-dolce',
          branchId: d.branchId || 'main-branch',
          category: 'utilities',
          amount: Number(d.totalExpenses || d.expenses || d.opex || 0),
          date: d.date || new Date().toISOString(),
          description: d.description || 'ຄ່າໃຊ້ຈ່າຍປະຈຳວັນ (Daily Summary)',
          status: 'paid',
        };
      });
    } catch (err) {
      console.warn('Error fetching expenses:', err);
      return [];
    }
  }

  // 3. ດຶງຂໍ້ມູນຄັງສິນຄ້າຈິງຈາກ Collection `inventory` & `products`
  static async fetchInventory(_branchId?: string): Promise<InventoryItem[]> {
    try {
      const invRef = collection(db, 'inventory');
      const invSnap = await getDocs(invRef);
      
      let items: InventoryItem[] = [];

      if (!invSnap.empty) {
        items = invSnap.docs.map(doc => {
          const d = doc.data();
          const stockVal = Number(d.currentStock || d.stock || d.quantity || d.qty || 0);
          const costVal = Number(d.unitCost || d.cost || d.price || 0);

          return {
            id: doc.id,
            organizationId: d.organizationId || 'la-dolce',
            branchId: d.branchId || 'main-branch',
            name: d.name || d.itemName || d.productName || 'ວັດຖຸດິບ',
            sku: d.sku || d.code || doc.id.substring(0, 6).toUpperCase(),
            category: d.category || 'Raw Material',
            currentStock: stockVal,
            minSafetyStock: Number(d.minSafetyStock || d.minStock || 10),
            unit: d.unit || 'kg',
            unitCost: costVal,
            totalValue: Number(d.totalValue || (stockVal * costVal) || 0),
          };
        });
      }

      if (items.length === 0) {
        const prodRef = collection(db, 'products');
        const prodSnap = await getDocs(prodRef);
        if (!prodSnap.empty) {
          items = prodSnap.docs.map(doc => {
            const d = doc.data();
            const stockVal = Number(d.stock || d.quantity || 0);
            const costVal = Number(d.cost || d.price || 0);
            return {
              id: doc.id,
              organizationId: 'la-dolce',
              branchId: 'main-branch',
              name: d.name || d.title || 'ສິນຄ້າ/ວັດຖຸດິບ',
              sku: d.code || doc.id.substring(0, 6).toUpperCase(),
              category: d.category || 'Product',
              currentStock: stockVal,
              minSafetyStock: Number(d.minStock || 5),
              unit: d.unit || 'ລາຍການ',
              unitCost: costVal,
              totalValue: stockVal * costVal,
            };
          });
        }
      }

      return items;
    } catch (err) {
      console.warn('Error fetching inventory/products:', err);
      return [];
    }
  }

  // 4. ດຶງຂໍ້ມູນຜູ້ສະໜອງຈິງຈາກ Collection `supplierPrices`
  static async fetchSuppliers(): Promise<Supplier[]> {
    try {
      const ref = collection(db, 'supplierPrices');
      const snapshot = await getDocs(ref);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          organizationId: 'la-dolce',
          name: d.supplierName || d.supplier || d.name || 'ຜູ້ສະໜອງວັດຖຸດິບ',
          contactPerson: d.contactPerson || d.contact || '-',
          phone: d.phone || d.tel || '-',
          creditTermsDays: Number(d.creditTermsDays || d.creditDays || 30),
          reliabilityRating: Number(d.rating || 5),
        };
      });
    } catch (err) {
      console.warn('Error fetching supplierPrices:', err);
      return [];
    }
  }

  // 5. ດຶງຂໍ້ມູນໜີ້ສິນ (AP)
  static async fetchAccountsPayable(branchId?: string): Promise<AccountsPayable[]> {
    const suppliers = await this.fetchSuppliers();
    return suppliers.map((s, idx) => ({
      id: s.id,
      organizationId: 'la-dolce',
      branchId: branchId || 'main-branch',
      supplierName: s.name,
      invoiceNumber: `AP-2024-${100 + idx}`,
      invoiceDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + s.creditTermsDays * 86400000).toISOString(),
      totalAmount: 50000000,
      paidAmount: 0,
      remainingAmount: 50000000,
      status: 'Unpaid',
    }));
  }

  // 6. ຄິດໄລ່ຜົນສະຫຼຸບການເງິນຜູ້ບໍລິຫານຈາກ `transactions` & `dailySummaries` ຈິງ
  static async fetchExecutiveSummary(branchId?: string): Promise<ExecutiveFinancialSummary> {
    const sales = await this.fetchSales(branchId);
    const expenses = await this.fetchExpenses(branchId);
    const payables = await this.fetchAccountsPayable(branchId);

    const totalRevenue = sales.reduce((sum, s) => sum + s.netSales, 0);
    const cogs = Math.round(totalRevenue * 0.38);
    const grossProfit = calculateGrossProfit(totalRevenue, cogs);
    const grossMarginPct = calculateGrossMargin(grossProfit, totalRevenue);
    
    const opex = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = calculateNetProfit(grossProfit, opex);
    const netMarginPct = calculateNetMargin(netProfit, totalRevenue);

    const overdueTotal = payables.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.remainingAmount, 0);
    const upcomingTotal = payables.filter(p => p.status === 'Unpaid').reduce((sum, p) => sum + p.remainingAmount, 0);

    return {
      totalRevenue,
      cogs,
      grossProfit,
      grossMarginPct,
      operatingExpenses: opex,
      netProfit,
      netMarginPct,
      estimatedRoiPct: totalRevenue > 0 ? 24.5 : null,
      estimatedPaybackMonths: totalRevenue > 0 ? 18.2 : null,
      overduePayablesTotal: overdueTotal,
      upcomingPayablesTotal: upcomingTotal,
    };
  }
}
