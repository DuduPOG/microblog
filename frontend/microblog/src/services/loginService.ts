import { AxiosResponse } from "axios";
import { AuthTokens } from "../models/AuthTokens";
import { LoginCredentials } from "../models/LoginCredentials";
import { axiosInstance } from "./axiosInstance";

class LoginService {
    async logar(data: LoginCredentials): Promise<AuthTokens> {
        const response : AxiosResponse<AuthTokens, any, {}, any>= await axiosInstance.post<AuthTokens>("/login/", data);
        return response.data;
    }
}

export default new LoginService();