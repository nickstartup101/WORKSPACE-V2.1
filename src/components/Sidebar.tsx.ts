import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../config/i18n';
import { ModuleName } from '../types';

export const Sidebar: React.FC = () => {
  const { lang, hasPermission } = useAuth();

  const navItems: { key: string; module: ModuleName; icon: string }[] = [
    { key: 'executiveDashboard', module: 'dashboard', icon: 'dashboard' },
    { key: 'sales', module: 'sales', icon: 'payments' },
    { key: 'procurement', module: 'procurement', icon: 'shopping_cart' },
    { key: 'purchaseInvoices', module: 'invoices', icon: 'receipt_long' },
    { key: 'inventory', module: 'inventory', icon: 'inventory_2' },
    { key: 'suppliers', module: 'suppliers', icon: 'handshake' },
    { key: 'financials', module: 'financials', icon: 'account_balance' },
    { key: 'accountsPayable', module: 'accountsPayable', icon: 'pending_actions' },
    { key: 'financialReports', module: 'reports', icon: 'assessment' },
    { key: 'investmentRoi', module: 'roi', icon: 'query_stats' },
    { key: 'usersPermissions', module: 'users', icon: 'manage_accounts' },
    { key: 'settings', module: 'settings', icon: 'settings' },
    { key: 'auditLogs', module: 'auditLogs', icon: 'history' },
  ];

  return (
    <aside className="h-screen w-[260px] fixed left-0 top-0 bg-[#001f3f] z-50 flex flex-col py-6 shadow-2xl">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
          <span className="material-symbols-outlined text-[#001f3f] text-[26px]">workspace_premium</span>
        </div>
        <div>
          <h1 className="text-[16px] font-bold text-white tracking-wide leading-tight">La Dolce<br />Workspace</h1>
        </div>
      </div>

      <div className="px-6 mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/60">Franchise Mgt</p>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 px-4 scrollbar-hide">
        {navItems.map((item) => {
          if (!hasPermission(item.module, 'view')) return null;
          const isActive = item.module === 'dashboard';

          return (
            <a
              key={item.key}
              href={`#${item.module}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all ${
                isActive
                  ? 'bg-white text-[#001f3f] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{t(item.key, lang)}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};