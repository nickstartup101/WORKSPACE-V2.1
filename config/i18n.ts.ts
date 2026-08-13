import { Language } from '../types';

type TranslationKeys = {
  [key: string]: {
    lo: string;
    th: string;
    en: string;
  };
};

export const translations: TranslationKeys = {
  appName: {
    lo: 'La Dolce Workspace V2',
    th: 'La Dolce Workspace V2',
    en: 'La Dolce Workspace V2',
  },
  platformSubtitle: {
    lo: 'ລະບົບຈັດການທຸລະກິດ ແລະ ການເງິນອັດສະລິຍະ',
    th: 'ระบบจัดการธุรกิจและข้อมูลการเงินอัจฉริยะ',
    en: 'Business Management & Financial Intelligence Platform',
  },
  executiveDashboard: {
    lo: 'ພາບລວມຜູ້ບໍລິຫານ',
    th: 'ภาพรวมผู้บริหาร',
    en: 'Executive Dashboard',
  },
  sales: {
    lo: 'ການຂາຍ',
    th: 'การขาย',
    en: 'Sales',
  },
  procurement: {
    lo: 'ການຈັດຊື້',
    th: 'การจัดซื้อ',
    en: 'Procurement',
  },
  purchaseInvoices: {
    lo: 'ໃບແຈ້ງໜີ້ສັ່ງຊື້',
    th: 'ใบแจ้งหนี้สั่งซื้อ',
    en: 'Purchase Invoices',
  },
  inventory: {
    lo: 'ຄັງສິນຄ້າ & ວັດຖຸດິບ',
    th: 'คลังสินค้า & วัตถุดิบ',
    en: 'Inventory',
  },
  suppliers: {
    lo: 'ຜູ້ສະໜອງ (Suppliers)',
    th: 'ผู้จัดจำหน่าย (Suppliers)',
    en: 'Suppliers',
  },
  financials: {
    lo: 'ການເງິນ',
    th: 'การเงิน',
    en: 'Financials',
  },
  accountsPayable: {
    lo: 'ໜີ້ສິນຕ້ອງສົ່ງ (AP)',
    th: 'เจ้าหนี้การค้า (AP)',
    en: 'Accounts Payable',
  },
  financialReports: {
    lo: 'ບົດລາຍງານການເງິນ',
    th: 'รายงานทางการเงิน',
    en: 'Financial Reports',
  },
  investmentRoi: {
    lo: 'ການລົງທຶນ & ROI',
    th: 'การลงทุน & ROI',
    en: 'Investment & ROI',
  },
  usersPermissions: {
    lo: 'ຜູ້ໃຊ້ & ສິດທິ',
    th: 'ผู้ใช้ & สิทธิ์การใช้งาน',
    en: 'Users & Permissions',
  },
  settings: {
    lo: 'ຕັ້ງຄ່າລະບົບ',
    th: 'ตั้งค่าระบบ',
    en: 'Settings',
  },
  auditLogs: {
    lo: 'ປະວັດການທຳງານ (Audit Logs)',
    th: 'ประวัติการใช้งาน (Audit Logs)',
    en: 'Audit Logs',
  },
  totalRevenue: {
    lo: 'ລາຍຮັບທັງໝົດ',
    th: 'รายได้ทั้งหมด',
    en: 'Total Revenue',
  },
  cogs: {
    lo: 'ຕົ້ນທຶນຂາຍ (COGS)',
    th: 'ต้นทุนขาย (COGS)',
    en: 'COGS',
  },
  grossProfit: {
    lo: 'ກຳໄລຂັ້ນຕົ້ນ',
    th: 'กำไรขั้นต้น',
    en: 'Gross Profit',
  },
  operatingExpenses: {
    lo: 'ຄ່າໃຊ້ຈ່າຍບໍລິຫານ (OPEX)',
    th: 'ค่าใช้จ่ายในการดำเนินงาน (OPEX)',
    en: 'Operating Expenses',
  },
  netProfit: {
    lo: 'ກຳໄລສຸດທິ',
    th: 'กำไรสุทธิ',
    en: 'Net Profit',
  },
  allBranches: {
    lo: 'ທຸກສາຂາ',
    th: 'ทุกสาขา',
    en: 'All Branches',
  },
  thisMonth: {
    lo: 'ເດືອນນີ້',
    th: 'เดือนนี้',
    en: 'This Month',
  },
  lowStockAlerts: {
    lo: 'ແຈ້ງເຕືອນສິນຄ້າໃກ້ໝົດ',
    th: 'แจ้งเตือนสินค้าใกล้หมด',
    en: 'Low Stock Alerts',
  },
  topProducts: {
    lo: 'ສິນຄ້າຂາຍດີອັນດັບຕົ້ນ',
    th: 'สินค้าขายดีอันดับต้น',
    en: 'Top Performing Products',
  },
  overduePayables: {
    lo: 'ໜີ້ສິນເກີນກຳນົດ',
    th: 'เจ้าหนี้เกินกำหนดชำระ',
    en: 'Overdue Payables',
  },
};

export const t = (key: string, lang: Language): string => {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  return key;
};