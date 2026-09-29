import { axiosInstance } from "./axiosInstance";

class comentarioService {
    async getId(comentarioId: any) {
        const response = await axiosInstance.get(`/comentario/${comentarioId}`);
        return response.data;
    }

    async getAll() {
        const response = await axiosInstance.get(`/comentario/`);
        return response.data.results;
    }

    async create(data: any) {
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("descricao", data.descricao);

        const imagem = data.imagem instanceof FileList ? data.imagem[0] : data.imagem;
        if (imagem instanceof File) {
            formData.append("imagem", imagem);
        }

        const response = await axiosInstance.post(`comentario/`, formData);
        return response.data.results;

    }
    
    async update(comentarioId: any) {
        const data = this.getId(comentarioId);
        if (data === undefined) return;
        const response = await axiosInstance.put(`/comentario/`, comentarioId);
        return response.data;
    }

    async destroy(comentarioId: any) {
        const data = this.getId(comentarioId);
        if (data === undefined) return;
        const response = await axiosInstance.delete(`/comentario/`, comentarioId);
        return response.data;
    }

}

export default new comentarioService();