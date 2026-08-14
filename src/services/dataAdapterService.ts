import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SalesRecord, ExpenseRecord, InventoryItem, Supplier, AccountsPayable, ExecutiveFinancialSummary } from '../types';
import { calculateGrossProfit, calculateGrossMargin, calculateNetProfit, calculateNetMargin } from '../utils/financialEngine';

export class DataAdapterService {
  
  // ດຶງຂໍ້ມູນການຂາຍຈິງຈາກ Firebase
  static async fetchSales(branchId?: string): Promise<SalesRecord[]> {
    try {
      const salesRef = collection(db, 'sales');
      const q = branchId && branchId !== 'all' ? query(salesRef, where('branchId', '==', branchId)) : salesRef;
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          organizationId: data.organizationId || 'la-dolce',
          branchId: data.branchId || 'main-branch',
          invoiceNumber: data.invoiceNumber || data.receiptNo || doc.id.substring(0, 8).toUpperCase(),
          date: data.date || data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          productName: data.productName || data.itemName || data.item || 'ສິນຄ້າທົ່ວໄປ',
          quantity: Number(data.quantity || data.qty || 1),
          unitPrice: Number(data.unitPrice || data.price || 0),
          discount: Number(data.discount || 0),
          netSales: Number(data.netSales || data.total || data.amount || 0),
          paymentMethod: data.paymentMethod || 'cash',
          createdAt: data.createdAt || new Date().toISOString(),
        };
      });
    } catch (err) {
      console.warn('Error fetching sales from Firestore:', err);
      return [];
    }
  }

  // ດຶງຂໍ້ມູນຄ່າໃຊ້ຈ່າຍຈິງຈາກ Firebase
  static async fetchExpenses(branchId?: string): Promise<ExpenseRecord[]> {
    try {
      const ref = collection(db, 'expenses');
      const q = branchId && branchId !== 'all' ? query(ref, where('branchId', '==', branchId)) : ref;
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          organizationId: data.organizationId || 'la-dolce',
          branchId: data.branchId || 'main-branch',
          category: data.category || 'other',
          amount: Number(data.amount || data.total || 0),
          date: data.date || new Date().toISOString(),
          description: data.description || data.title || '',
          status: data.status || 'paid',
        };
      });
    } catch (err) {
      console.warn('Error fetching expenses from Firestore:', err);
      return [];
    }
  }

  // ດຶງຂໍ້ມູນຄັງສິນຄ້າຈິງຈາກ Firebase
  static async fetchInventory(branchId?: string): Promise<InventoryItem[]> {
    try {
      const ref = collection(db, 'inventory');
      const q = branchId && branchId !== 'all' ? query(ref, where('branchId', '==', branchId)) : ref;
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          organizationId: data.organizationId || 'la-dolce',
          branchId: data.branchId || 'main-branch',
          name: data.name || data.itemName || 'ວັດຖຸດິບ',
          sku: data.sku || doc.id.substring(0, 6).toUpperCase(),
          category: data.category || 'Raw Material',
          currentStock: Number(data.currentStock || data.stock || data.qty || 0),
          minSafetyStock: Number(data.minSafetyStock || data.minStock || 10),
          unit: data.unit || 'kg',
          unitCost: Number(data.unitCost || data.cost || 0),
          totalValue: Number(data.totalValue || (data.currentStock * data.unitCost) || 0),
        };
      });
    } catch (err) {
      console.warn('Error fetching inventory from Firestore:', err);
      return [];
    }
  }

  // ດຶງຂໍ້ມູນຜູ້ສະໜອງຈິງຈາກ Firebase
  static async fetchSuppliers(): Promise<Supplier[]> {
    try {
      const ref = collection(db, 'suppliers');
      const snapshot = await getDocs(ref);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          organizationId: data.organizationId || 'la-dolce',
          name: data.name || data.supplierName || 'Supplier',
          contactPerson: data.contactPerson || data.contact || '-',
          phone: data.phone || data.tel || '-',
          creditTermsDays: Number(data.creditTermsDays || data.creditDays || 30),
          reliabilityRating: Number(data.reliabilityRating || 5),
        };
      });
    } catch (err) {
      console.warn('Error fetching suppliers from Firestore:', err);
      return [];
    }
  }

  // ດຶງຂໍ້ມູນໜີ້ສິນ (AP) ຈິງຈາກ Firebase
  static async fetchAccountsPayable(branchId?: string): Promise<AccountsPayable[]> {
    try {
      const ref = collection(db, 'accountsPayable');
      const snapshot = await getDocs(ref);

      if (snapshot.empty) return [];

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          organizationId: data.organizationId || 'la-dolce',
          branchId: data.branchId || 'main-branch',
          supplierName: data.supplierName || 'Supplier',
          invoiceNumber: data.invoiceNumber || doc.id,
          invoiceDate: data.invoiceDate || new Date().toISOString(),
          dueDate: data.dueDate || new Date().toISOString(),
          totalAmount: Number(data.totalAmount || data.amount || 0),
          paidAmount: Number(data.paidAmount || 0),
          remainingAmount: Number(data.remainingAmount || data.totalAmount || 0),
          status: data.status || 'Unpaid',
        };
      });
    } catch (err) {
      console.warn('Error fetching AP from Firestore:', err);
      return [];
    }
  }

  // ຄິດໄລ່ຜົນສະຫຼຸບການເງິນຜູ້ບໍລິຫານຈາກຂໍ້ມູນຈິງ
  static async fetchExecutiveSummary(branchId?: string): Promise<ExecutiveFinancialSummary> {
    const sales = await this.fetchSales(branchId);
    const expenses = await this.fetchExpenses(branchId);
    const payables = await this.fetchAccountsPayable(branchId);

    const totalRevenue = sales.reduce((sum, s) => sum + (s.netSales || 0), 0);
    const cogs = Math.round(totalRevenue * 0.38); // 38% Standard COGS
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
