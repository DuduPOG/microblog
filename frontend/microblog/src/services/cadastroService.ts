import { FormCadastroSubmit } from "../models/Cadastro";
import { axiosInstance } from "./axiosInstance";

class CadastroService {
    async cadastrar(data: FormCadastroSubmit) : Promise<any>{
        const response = await axiosInstance.post("cadastrar/", data);
        return response.data;
    }
}

export default new CadastroService();