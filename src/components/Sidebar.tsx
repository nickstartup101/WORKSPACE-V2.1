import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../config/i18n';
import { ModuleName } from '../types';

export const Sidebar: React.FC = () => {
  const { lang, activePage, setActivePage } = useAuth();

  const navItems: { key: string; module: ModuleName; icon: string }[] = [
    { key: 'executiveDashboard', module: 'dashboard', icon: 'dashboard' },
    { key: 'sales', module: 'sales', icon: 'payments' },
    { key: 'inventory', module: 'inventory', icon: 'inventory_2' },
    { key: 'suppliers', module: 'suppliers', icon: 'handshake' },
    { key: 'accountsPayable', module: 'accountsPayable', icon: 'pending_actions' },
    { key: 'financialReports', module: 'reports', icon: 'assessment' },
    { key: 'investmentRoi', module: 'roi', icon: 'query_stats' },
    { key: 'usersPermissions', module: 'users', icon: 'manage_accounts' },
    { key: 'settings', module: 'settings', icon: 'settings' },
  ];

  return (
    <aside className="h-screen w-[260px] fixed left-0 top-0 bottom-0 bg-[#001f3f] z-50 flex flex-col justify-between py-6 shadow-2xl overflow-hidden select-none">
      {/* Upper Navigation Section */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Brand Header */}
        <div 
          className="px-6 mb-8 flex items-center gap-3 cursor-pointer shrink-0" 
          onClick={() => setActivePage('dashboard')}
        >
          <div className="bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
            <span className="material-symbols-outlined text-[#001f3f] text-[26px]">workspace_premium</span>
          </div>
          <div>
            <h1 className="text-[16px] font-bold text-white tracking-wide leading-tight">La Dolce<br />Workspace</h1>
          </div>
        </div>

        <div className="px-6 mb-3 shrink-0">
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/60">Franchise Mgt</p>
        </div>

        {/* Inner Scrollable Menu */}
        <nav className="flex-1 overflow-y-auto space-y-1.5 px-4 scrollbar-hide pr-2">
          {navItems.map((item) => {
            const isActive = activePage === item.module;

            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.module)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-white text-[#001f3f] shadow-lg font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{t(item.key, lang)}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Organization Badge (Fixed at Bottom) */}
      <div className="px-6 pt-4 border-t border-white/10 shrink-0">
        <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-[12px] shrink-0">
            HQ
          </div>
          <div className="truncate">
            <p className="text-[12px] font-bold text-white truncate">La Dolce Franchise</p>
            <p className="text-[10px] text-white/60 truncate">V2.0 • Real Engine</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
