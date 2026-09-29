import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import loginService, { type LoginCredentials } from '../services/loginService';

interface AuthUser {
  id?: number | string;
  user_id?: number | string;
  username?: string;
  nome?: string;
  email?: string;
  admin?: boolean;
}

interface AuthContextValue {
  signed: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeAccessToken(access: string): AuthUser {
  const payload = access.split('.')[1];
  if (!payload) {
    throw new Error('Token JWT inválido.');
  }

  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  const user = JSON.parse(decoded) as AuthUser;
  return { ...user, id: user.id ?? user.user_id };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSessionExpired = () => setUser(null);
    window.addEventListener('auth:logout', handleSessionExpired);

    try {
      const access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');

      if (access && refresh) {
        setUser(decodeAccessToken(access));
      } else {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    } catch {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    } finally {
      setLoading(false);
    }

    return () => window.removeEventListener('auth:logout', handleSessionExpired);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const tokens = await loginService.logar(credentials);
    const recoveredUser = decodeAccessToken(tokens.access);
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
    setUser(recoveredUser);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}

