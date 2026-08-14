import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { ExecutiveDashboardPage } from './pages/ExecutiveDashboardPage';
import { SalesPage } from './pages/SalesPage';
import { InventoryPage } from './pages/InventoryPage';

const MainRouter: React.FC = () => {
  const { activePage } = useAuth();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <ExecutiveDashboardPage />;
      case 'sales':
        return <SalesPage />;
      case 'inventory':
        return <InventoryPage />;
      default:
        return (
          <div className="ml-[260px] flex-1 min-h-screen bg-[#F8FAFC] p-10 flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-3xl border border-gray-200 max-w-lg">
              <span className="material-symbols-outlined text-[64px] text-[#001F3F]">construction</span>
              <h3 className="text-[20px] font-bold text-[#001F2A] mt-4">ຟັງຊັ່ນນີ້ກຳລັງດຶງຂໍ້ມູນຈາກ Firebase</h3>
              <p className="text-[13px] text-gray-500 mt-2">ຂໍ້ມູນຈິງໃນ Collection ນີ້ກຳລັງຖືກ Map ເຂົ້າສູ່ລະບົບ V2</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      {renderPage()}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
};

export default App;
