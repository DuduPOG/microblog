import { CadastroSubmit } from "../models/Cadastro";
import { axiosInstance } from "./axiosInstance";

class CadastroService {
    async cadastrar(data: CadastroSubmit) : Promise<any> {
        const response = await axiosInstance.post<CadastroSubmit>("cadastrar/", data);
        return response.data;
    }
}

export default new CadastroService();