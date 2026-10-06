import { axiosInstance } from "./axiosInstance";

class ComentarioService {
    async getId(comentarioId: any) {
        const response = await axiosInstance.get(`/comentario/${comentarioId}/`);
        return response.data;
    }

    async publicacao(publicacaoId: any) {
        const response = await axiosInstance.get(`/publicacao/${publicacaoId}/comentarios/`);
        return response.data.results;
    }

    async getAll() {
        const response = await axiosInstance.get(`/comentario/`);
        return response.data.results;
    }

    async create(publicacao: string, data: { mensagem : string }) {
        const formData = new FormData();
        formData.append("publicacao", publicacao);
        formData.append("mensagem", data.mensagem);

        const response = await axiosInstance.post(`comentario/`, formData);
        return response.data;

    }
    
    async update(comentarioId: number, mensagem: string) {
        const response = await axiosInstance.patch(`/comentario/${comentarioId}/`, { mensagem });
        return response.data;
    }

    async destroy(comentarioId: any) {
        const data = this.getId(comentarioId);
        if (data === undefined) return;
        const response = await axiosInstance.delete(`/comentario/`, comentarioId);
        return response.data;
    }

}

export default new ComentarioService();