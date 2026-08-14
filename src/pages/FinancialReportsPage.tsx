import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DataAdapterService } from '../services/dataAdapterService';
import { ExecutiveFinancialSummary } from '../types';

export const FinancialReportsPage: React.FC = () => {
  const { activeBranchId } = useAuth();
  const [summary, setSummary] = useState<ExecutiveFinancialSummary | null>(null);

  useEffect(() => {
    DataAdapterService.fetchExecutiveSummary(activeBranchId).then(setSummary);
  }, [activeBranchId]);

  return (
    <div className="ml-[260px] flex-1 min-h-screen bg-[#F8FAFC] p-10">
      <header className="mb-8">
        <h2 className="text-[24px] font-bold text-[#001F2A]">ງົບກຳໄລຂາດທຶນ (Profit & Loss Statement - P&L)</h2>
        <p className="text-[13px] text-gray-500">ບົດລາຍງານສະຫຼຸບຜົນປະກອບການຈາກ Firebase Firestore</p>
      </header>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 max-w-3xl space-y-6">
        <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
          <span className="text-[16px] font-bold text-[#001F2A]">ລາຍຮັບທັງໝົດ (Total Revenue)</span>
          <span className="text-[20px] font-extrabold text-[#001F3F] font-mono">₭ {(summary?.totalRevenue || 0).toLocaleString()}</span>
        </div>

        <div className="border-b border-gray-200 pb-4 flex justify-between items-center text-red-600">
          <span className="text-[15px] font-bold">ຫັກ: ຕົ້ນທຶນຂາຍ (Less: COGS 38%)</span>
          <span className="text-[18px] font-mono font-bold">- ₭ {(summary?.cogs || 0).toLocaleString()}</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl flex justify-between items-center text-[#059669]">
          <span className="text-[16px] font-extrabold">ກຳໄລຂັ້ນຕົ້ນ (Gross Profit)</span>
          <span className="text-[22px] font-mono font-extrabold">₭ {(summary?.grossProfit || 0).toLocaleString()}</span>
        </div>

        <div className="border-b border-gray-200 pb-4 flex justify-between items-center text-red-600">
          <span className="text-[15px] font-bold">ຫັກ: ค່າໃຊ້ຈ່າຍບໍລິຫານ (Less: OPEX)</span>
          <span className="text-[18px] font-mono font-bold">- ₭ {(summary?.operatingExpenses || 0).toLocaleString()}</span>
        </div>

        <div className="bg-[#001F3F] text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
          <div>
            <span className="text-[18px] font-extrabold block">ກຳໄລສຸດທິ (Net Profit)</span>
            <span className="text-[12px] text-white/70">Net Margin: {summary?.netMarginPct || 0}%</span>
          </div>
          <span className="text-[28px] font-mono font-extrabold">₭ {(summary?.netProfit || 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
