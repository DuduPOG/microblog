import { axiosInstance } from "./axiosInstance";

class CadastroService {
    async cadastrar(data: any) {
        const response = await axiosInstance.post("cadastrar/", data);
        return response.data;
    }
}

export default new CadastroService();