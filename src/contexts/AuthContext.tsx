import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { UserProfile, Language, ModuleName, ActionType } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
  activeBranchId: string;
  setActiveBranchId: (id: string) => void;
  activePage: ModuleName;
  setActivePage: (page: ModuleName) => void;
  hasPermission: (module: ModuleName, action: ActionType) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('lo');
  const [activeBranchId, setActiveBranchId] = useState<string>('all');
  const [activePage, setActivePage] = useState<ModuleName>('dashboard');

  const [profile] = useState<UserProfile>({
    uid: 'executive-user',
    email: 'executive@ladolce.com',
    displayName: 'Executive User',
    role: 'SUPER_ADMIN',
    organizationId: 'la-dolce',
    allowedBranchIds: ['hq', 'riverside', 'airport'],
    activeBranchId: 'all',
    status: 'active',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const hasPermission = (_module: ModuleName, _action: ActionType): boolean => {
    return true; // Full access for executive V2 engine
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        lang,
        setLang,
        activeBranchId,
        setActiveBranchId,
        activePage,
        setActivePage,
        hasPermission,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
