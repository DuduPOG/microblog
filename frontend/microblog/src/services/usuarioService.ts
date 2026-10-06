import { axiosInstance } from "./axiosInstance";

class UsuarioService {
    async getId(usuarioId: any) {
        const response = await axiosInstance.get(`/usuario/${usuarioId}/`);
        return response.data;
    }

    async getAll() {
        const response = await axiosInstance.get(`/usuario/`);
        return response.data.results;
    }
}

export default new UsuarioService();