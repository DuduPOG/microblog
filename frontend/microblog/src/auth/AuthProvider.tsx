import { createContext, useContext, useState, useEffect, type ReactNode, Context } from 'react';
import LoginService from '../services/LoginService';
import { AuthContextValue } from '../models/Auth';
import { AuthUser } from '../models/AuthUser';
import { LoginCredentials } from '../models/LoginCredentials';

export const AuthContext : Context<AuthContextValue | undefined> = createContext<AuthContextValue | undefined>(undefined);

function decodeAccessToken(access: string): AuthUser {
  const payload : string = access.split(".")[1];
  if (!payload) {
    throw new Error("Token JWT inválido.");
  }

  const base64 : string = payload.replace(/-/g, "+").replace(/_/g, "/");
  const decoded : string = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
  const user : AuthUser = JSON.parse(decoded) as AuthUser;
  return { ...user, id: user.id ?? user.user_id };
}

export const AuthProvider = ({ children }: { children: ReactNode }) : JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSessionExpired : () => void = () => setUser(null);
    window.addEventListener("auth:logout", handleSessionExpired);

    try {
      const access : string | null = localStorage.getItem("access");
      const refresh : string | null  = localStorage.getItem("refresh");

      if (access && refresh) {
        setUser(decodeAccessToken(access));
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    } catch {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } finally {
      setLoading(false);
    }

    return () => window.removeEventListener("auth:logout", handleSessionExpired);
  }, []);

  const login : any = async (credentials: LoginCredentials) => {
    const tokens = await LoginService.logar(credentials);
    const recoveredUser = decodeAccessToken(tokens.access);
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
    setUser(recoveredUser);
  };

  const logout : () => void = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return context;
}

