import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ModuleName, ActionType } from '../types';

interface PermissionGuardProps {
  module: ModuleName;
  action: ActionType;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  module,
  action,
  children,
  fallback = null,
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
