import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  trendPct?: string;
  isPositive?: boolean;
  referenceText?: string;
  isHighlight?: boolean;
  onInfoClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trendPct,
  isPositive = true,
  referenceText,
  isHighlight = false,
  onInfoClick,
}) => {
  if (isHighlight) {
    return (
      <div className="bg-gradient-to-br from-[#001f3f] to-[#000c1a] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-white/10 hover:-translate-y-0.5 transition-all">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">{title}</p>
          {onInfoClick && (
            <button onClick={onInfoClick} className="text-white/60 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
          )}
        </div>
        <p className="text-[34px] font-extrabold tracking-tight my-2 font-mono">{value}</p>
        <div className="flex items-center gap-2 text-[12px] font-semibold mt-3">
          {trendPct && (
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> {trendPct}
            </span>
          )}
          {referenceText && <span className="text-white/60 text-[11px]">{referenceText}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#C4C6CF]/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#43474E]">{title}</p>
        {onInfoClick && (
          <button onClick={onInfoClick} className="text-[#74777F] hover:text-[#001F3F] transition-colors">
            <span className="material-symbols-outlined text-[18px]">info</span>
          </button>
        )}
      </div>
      <p className="text-[34px] font-extrabold tracking-tight text-[#001F2A] my-2 font-mono">{value}</p>
      <div className="flex items-center gap-2 text-[12px] font-semibold mt-3">
        {trendPct && (
          <span className={`px-2.5 py-0.5 rounded-md flex items-center gap-1 ${isPositive ? 'bg-emerald-50 text-[#059669]' : 'bg-red-50 text-red-600'}`}>
            <span className="material-symbols-outlined text-[14px]">{isPositive ? 'trending_up' : 'trending_down'}</span> {trendPct}
          </span>
        )}
        {referenceText && <span className="text-[#74777F] text-[11px]">{referenceText}</span>}
      </div>
    </div>
  );
};
