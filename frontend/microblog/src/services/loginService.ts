import { axiosInstance } from "./axiosInstance";

class loginService {
    async logar(data: any) {
        const response = await axiosInstance.post("/login/", data);
        return response.data;
    }
}

export default new loginService();