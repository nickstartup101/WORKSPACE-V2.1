import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { ExecutiveDashboardPage } from './pages/ExecutiveDashboardPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-[#F4FAFF]">
        <Sidebar />
        <ExecutiveDashboardPage />
      </div>
    </AuthProvider>
  );
};

export default App;
