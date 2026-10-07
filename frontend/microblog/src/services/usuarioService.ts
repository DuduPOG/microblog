import { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";

class UsuarioService {
    async getId(usuarioId: number) : Promise<any> {
        const response : AxiosResponse<any, any, {}, any> = await axiosInstance.get(`/usuario/${usuarioId}/`);
        return response.data;
    }

    async getAll() : Promise<any[]> {
        const response : AxiosResponse<any, any, {}, any> = await axiosInstance.get(`/usuario/`);
        return response.data.results;
    }
}

export default new UsuarioService();