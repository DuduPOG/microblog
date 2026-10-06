import { AuthUser } from "./AuthUser";
import { LoginCredentials } from "./LoginCredentials";

export interface AuthContextValue {
  signed: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}