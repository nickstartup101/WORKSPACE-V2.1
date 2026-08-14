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
        return <ExecutiveDashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 w-full min-h-screen">
        {renderPage()}
      </div>
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
