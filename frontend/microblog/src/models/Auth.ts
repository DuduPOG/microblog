import { LoginCredentials } from "./Login";

export interface AuthUser {
  id?: number | undefined;
  user_id?: number | undefined;
  username?: string | undefined;
  nome?: string | undefined;
  email?: string | undefined;
  admin?: boolean | undefined;
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
