export type Language = 'lo' | 'th' | 'en';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'MANAGER'
  | 'STAFF'
  | 'FINANCE'
  | 'PROCUREMENT'
  | 'INVENTORY'
  | 'VIEWER';

export type ModuleName =
  | 'dashboard'
  | 'sales'
  | 'procurement'
  | 'invoices'
  | 'inventory'
  | 'suppliers'
  | 'financials'
  | 'accountsPayable'
  | 'reports'
  | 'roi'
  | 'users'
  | 'settings'
  | 'auditLogs';

export type ActionType =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'approve'
  | 'export'
  | 'pay'
  | 'adjust'
  | 'manage';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organizationId: string;
  allowedBranchIds: string[];
  activeBranchId: string;
  status: 'active' | 'disabled' | 'pending';
  lastLoginAt?: string;
}

export interface Branch {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  location: string;
  isHQ: boolean;
}

export interface SalesRecord {
  id: string;
  organizationId: string;
  branchId: string;
  invoiceNumber: string;
  date: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  netSales: number;
  paymentMethod: 'cash' | 'transfer' | 'card';
  createdAt: string;
}

export interface ExpenseRecord {
  id: string;
  organizationId: string;
  branchId: string;
  category: 'rent' | 'utilities' | 'marketing' | 'maintenance' | 'software' | 'other';
  amount: number;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'paid';
}

export interface InventoryItem {
  id: string;
  organizationId: string;
  branchId: string;
  name: string;
  sku: string;
  category: 'Raw Material' | 'Packaging' | 'Merchandise' | 'Equipment';
  currentStock: number;
  minSafetyStock: number;
  unit: string;
  unitCost: number;
  totalValue: number;
}

export interface Supplier {
  id: string;
  organizationId: string;
  name: string;
  contactPerson: string;
  phone: string;
  creditTermsDays: number;
  reliabilityRating: number;
}

export interface AccountsPayable {
  id: string;
  organizationId: string;
  branchId: string;
  supplierName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
}

export interface ExecutiveFinancialSummary {
  totalRevenue: number;
  cogs: number;
  grossProfit: number;
  grossMarginPct: number;
  operatingExpenses: number;
  netProfit: number;
  netMarginPct: number;
  estimatedRoiPct: number | null;
  estimatedPaybackMonths: number | null;
  overduePayablesTotal: number;
  upcomingPayablesTotal: number;
}