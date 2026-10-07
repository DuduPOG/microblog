import { AxiosResponse } from "axios";
import { AuthTokens } from "../models/Auth";
import { LoginCredentials } from "../models/Login";
import { axiosInstance } from "./axiosInstance";

class LoginService {
    async logar(data: LoginCredentials): Promise<AuthTokens> {
        const response : AxiosResponse<AuthTokens, any, {}, any>= await axiosInstance.post<AuthTokens>("/login/", data);
        return response.data;
    }
}

export default new LoginService();