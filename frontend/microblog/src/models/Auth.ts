import { LoginCredentials } from "./Login";

export interface AuthUser {
  id?: number;
  user_id?: number | string;
  username?: string;
  nome?: string;
  email?: string;
  admin?: boolean;
}

export interface AuthContextValue {
  signed: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}
