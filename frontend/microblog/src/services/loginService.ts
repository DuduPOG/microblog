import { axiosInstance } from "./axiosInstance";

class loginService {
    async logar(data) {
        const response = await axiosInstance.post("/login");
        return response.data;
    }
}

export default new loginService();