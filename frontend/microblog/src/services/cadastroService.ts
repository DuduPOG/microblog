import { axiosInstance } from "./axiosInstance";

class cadastroService {
    async cadastrar(data: any) {
        const response = await axiosInstance.post("cadastrar/", data);
        return response.data;
    }
}

export default new cadastroService();