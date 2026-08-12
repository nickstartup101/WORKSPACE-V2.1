import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../config/i18n';
import { KpiCard } from '../components/KpiCard';
import { DataAdapterService } from '../services/dataAdapterService';
import { ExecutiveFinancialSummary } from '../types';
import { getKPIExplanation, KPIExplanation } from '../utils/financialEngine';

export const ExecutiveDashboardPage: React.FC = () => {
  const { lang, setLang, activeBranchId, setActiveBranchId } = useAuth();
  const [summary, setSummary] = useState<ExecutiveFinancialSummary | null>(null);
  const [activeModal, setActiveModal] = useState<KPIExplanation | null>(null);

  useEffect(() => {
    DataAdapterService.fetchExecutiveSummary(activeBranchId).then(setSummary);
  }, [activeBranchId]);

  return (
    <div className="ml-[260px] flex-1 flex flex-col min-h-screen bg-[#F8FAFC]">
      <!-- Header -->
      <header className="bg-white/80 backdrop-blur-xl top-0 sticky z-40 border-b border-[#C4C6CF]/20 px-10 py-5 flex justify-between items-center">
        <div>
          <h2 className="text-[22px] font-bold text-[#001F2A]">
            {t('executiveDashboard', lang)} <span className="text-[15px] font-normal text-[#43474E]">(V2 Engine)</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <!-- Branch Selector -->
          <select
            value={activeBranchId}
            onChange={(e) => setActiveBranchId(e.target.value)}
            className="bg-white border border-[#C4C6CF]/40 rounded-full px-5 py-2 text-[13px] font-semibold text-[#001F2A] shadow-sm focus:ring-2 focus:ring-[#001F3F]"
          >
            <option value="all">{t('allBranches', lang)}</option>
            <option value="hq">Downtown HQ</option>
            <option value="riverside">Riverside</option>
            <option value="airport">Airport Lounge</option>
          </select>

          <!-- Language Selector -->
          <div className="flex items-center bg-white border border-[#C4C6CF]/40 rounded-full p-1 shadow-sm text-[12px] font-bold">
            <button onClick={() => setLang('lo')} className={`px-3 py-1 rounded-full ${lang === 'lo' ? 'bg-[#001F3F] text-white' : 'text-[#5C5F60]'}`}>ລາວ</button>
            <button onClick={() => setLang('th')} className={`px-3 py-1 rounded-full ${lang === 'th' ? 'bg-[#001F3F] text-white' : 'text-[#5C5F60]'}`}>ไทย</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-[#001F3F] text-white' : 'text-[#5C5F60]'}`}>EN</button>
          </div>
        </div>
      </header>

      <!-- Main Canvas -->
      <main className="p-10 space-y-8 max-w-[1600px] mx-auto w-full">
        <!-- Top 4 KPI Grid -->
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title={t('totalRevenue', lang)}
            value={`₭ ${(summary?.totalRevenue || 0) / 1000000000}B`}
            trendPct="+12.5%"
            referenceText="vs last month"
          />
          <KpiCard
            title={t('grossProfit', lang)}
            value={`₭ ${(summary?.grossProfit || 0) / 1000000000}B`}
            trendPct="+14.2%"
            referenceText={`Margin: ${summary?.grossMarginPct || 0}%`}
            onInfoClick={() => setActiveModal(getKPIExplanation('grossMargin'))}
          />
          <KpiCard
            title={t('operatingExpenses', lang)}
            value={`₭ ${(summary?.operatingExpenses || 0) / 1000000}M`}
            trendPct="+5.4%"
            isPositive={false}
            referenceText="OPEX"
          />
          <KpiCard
            title={t('netProfit', lang)}
            value={`₭ ${(summary?.netProfit || 0) / 1000000000}B`}
            trendPct="+18.6%"
            referenceText={`Net Margin: ${summary?.netMarginPct || 0}%`}
            isHighlight={true}
            onInfoClick={() => setActiveModal(getKPIExplanation('netProfit'))}
          />
        </div>

        <!-- Analytical Section -->
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Financial Chart -->
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[#C4C6CF]/30 shadow-sm flex flex-col justify-between min-h-[420px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#001F2A]">ແນວໂນ້ມລາຍຮັບ ແລະ ກຳໄລ (Revenue vs Profit Trend)</h3>
                <p className="text-[12px] text-[#43474E]">ຜົນປະກອບການລວມ 6 ເດືອນຫຼ້າສຸດ</p>
              </div>
            </div>

            <!-- SVG Chart -->
            <div className="relative w-full h-[260px] flex items-end">
              <svg className="w-full h-full" viewBox="0 0 600 240">
                <path d="M 20,180 Q 130,120 230,150 T 440,70 T 580,40" fill="none" stroke="#001f3f" strokeWidth="4" />
                <path d="M 20,210 Q 130,170 230,190 T 440,130 T 580,90" fill="none" stroke="#2089e6" strokeWidth="3" />
              </svg>
            </div>

            <div className="flex justify-between text-[12px] font-bold text-[#43474E] mt-4">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

          <!-- Accounts Payable Status -->
          <div className="bg-white rounded-3xl p-8 border border-[#C4C6CF]/30 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[18px] font-bold text-[#001F2A] mb-1">{t('accountsPayable', lang)}</h3>
              <p className="text-[12px] text-[#43474E]">ໜີ້ສິນຄ່າວັດຖຸດິບທີ່ຕ້ອງຊຳລະ</p>
            </div>

            <div className="space-y-6 my-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[13px] font-bold text-[#43474E]">{t('overduePayables', lang)}</span>
                  <span className="text-[20px] font-extrabold text-red-600 font-mono">₭ 120M</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[13px] font-bold text-[#43474E]">ກຳລັງຈະຮອດກຳນົດ (7 ວັນ)</span>
                  <span className="text-[20px] font-extrabold text-[#001F2A] font-mono">₭ 450M</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className="bg-[#001F3F] h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <button className="w-full py-3.5 bg-[#001F3F] text-white font-bold rounded-xl text-[13px] hover:bg-[#000c1a] transition-all">
              ຈັດການຊຳລະເງິນ (Go to AP)
            </button>
          </div>
        </div>
      </main>

      <!-- KPI Explanation Modal -->
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#C4C6CF]/20">
            <h3 className="text-[18px] font-bold text-[#001F2A] mb-3">{activeModal.title}</h3>
            <p className="text-[13px] text-[#43474E] mb-4">{activeModal.definition}</p>
            <div className="bg-[#F4FAFF] p-4 rounded-xl text-[12px] font-mono text-[#001F3F] mb-4">
              <strong>Formula:</strong> {activeModal.formula}
            </div>
            <p className="text-[12px] text-gray-500 mb-6"><strong>Example:</strong> {activeModal.example}</p>
            <button onClick={() => setActiveModal(null)} className="w-full py-3 bg-[#001F3F] text-white font-bold rounded-xl text-[13px]">
              ອັດໜ້າຕ່າງ (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};