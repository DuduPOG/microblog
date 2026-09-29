import { axiosInstance } from "./axiosInstance";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

class LoginService {
    async logar(data: LoginCredentials): Promise<AuthTokens> {
        const response = await axiosInstance.post<AuthTokens>("/login/", data);
        return response.data;
    }
}

export default new LoginService();