import { axiosInstance } from "./axiosInstance";

class publicacaoService {
    async getId(publicacaoId: any) {
        const response = await axiosInstance.get(`/publicacao/${publicacaoId}/`);
        return response.data;
    }

    async getAll() {
        const response = await axiosInstance.get(`/publicacao/`);
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

        const response = await axiosInstance.post(`publicacao/`, formData);
        return response.data;

    }
    
    async update(publicacaoId: number, data: FormData) {
        const response = await axiosInstance.put(`/publicacao/${publicacaoId}/`, data);
        return response.data;
    }

    async destroy(publicacaoId: number) {
        const response = await axiosInstance.delete(`/publicacao/${publicacaoId}/`);
        return response.data;
    }

}

export default new publicacaoService();