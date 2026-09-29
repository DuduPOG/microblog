import type { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }: { children: ReactNode }): ReactElement {
  const { signed, loading } = useAuth();

  if (loading) {
    return <p role="status">Verificando sessão...</p>;
  }

  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}