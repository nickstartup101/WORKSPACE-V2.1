/**
 * Financial Calculation Engine - Standardized Central Formulas
 */

export function calculateCOGS(openingInventory: number, purchases: number, closingInventory: number): number {
  return Math.max(0, openingInventory + purchases - closingInventory);
}

export function calculateGrossProfit(revenue: number, cogs: number): number {
  return revenue - cogs;
}

export function calculateGrossMargin(grossProfit: number, revenue: number): number {
  if (revenue <= 0) return 0;
  return Number(((grossProfit / revenue) * 100).toFixed(2));
}

export function calculateOperatingExpenses(expenses: number[]): number {
  return expenses.reduce((acc, curr) => acc + curr, 0);
}

export function calculateNetProfit(grossProfit: number, operatingExpenses: number): number {
  return grossProfit - operatingExpenses;
}

export function calculateNetMargin(netProfit: number, revenue: number): number {
  if (revenue <= 0) return 0;
  return Number(((netProfit / revenue) * 100).toFixed(2));
}

export function calculateROI(initialInvestment: number | null, annualNetProfit: number): number | null {
  if (!initialInvestment || initialInvestment <= 0) return null;
  return Number(((annualNetProfit / initialInvestment) * 100).toFixed(2));
}

export function calculatePaybackPeriodMonths(initialInvestment: number | null, monthlyNetProfit: number): number | null {
  if (!initialInvestment || initialInvestment <= 0 || monthlyNetProfit <= 0) return null;
  return Number((initialInvestment / monthlyNetProfit).toFixed(1));
}

export interface KPIExplanation {
  title: string;
  definition: string;
  formula: string;
  example: string;
}

export function getKPIExplanation(metric: string): KPIExplanation {
  switch (metric) {
    case 'grossMargin':
      return {
        title: 'Gross Margin (ເປີເຊັນກຳໄລຂັ້ນຕົ້ນ)',
        definition: 'Gross Margin measures how much revenue remains after deducting the direct cost of goods sold.',
        formula: 'Gross Margin = (Gross Profit / Total Revenue) × 100',
        example: 'Revenue = ₭ 10,000,000, COGS = ₭ 4,000,000 → Gross Margin = 60%',
      };
    case 'netProfit':
      return {
        title: 'Net Profit (ກຳໄລສຸດທິ)',
        definition: 'Net Profit represents the actual profit remaining after subtracting operating expenses from Gross Profit.',
        formula: 'Net Profit = Gross Profit - Operating Expenses',
        example: 'Gross Profit = ₭ 6,000,000, OPEX = ₭ 2,000,000 → Net Profit = ₭ 4,000,000',
      };
    case 'roi':
      return {
        title: 'Estimated ROI (ຜົນຕອບແທນການລົງທຶນປະເມິນ)',
        definition: 'ROI estimates the efficiency of the initial capital invested in the workspace/branch.',
        formula: 'Estimated ROI = (Estimated Annual Net Profit / Initial Capital) × 100',
        example: 'Initial Capital = ₭ 500M, Annual Net Profit = ₭ 100M → ROI = 20%',
      };
    default:
      return {
        title: 'Financial Indicator',
        definition: 'Financial KPI used for operational decision making.',
        formula: 'N/A',
        example: 'N/A',
      };
  }
}