import { FormPublicacaoSubmit } from "../models/Publicacao";
import { axiosInstance } from "./axiosInstance";

class PublicacaoService {
    async getId(publicacaoId: number) : Promise<void> {
        const response = await axiosInstance.get(`/publicacao/${publicacaoId}/`);
        return response.data;
    }

    async getAll() : Promise<void> {
        const response = await axiosInstance.get(`/publicacao/`);
        return response.data.results;
    }

    async create(data: FormPublicacaoSubmit) : Promise<void> {
        const formData : FormData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("descricao", data.descricao);

        const imagem = data.imagem instanceof FileList ? data.imagem[0] : data.imagem;
        if (imagem instanceof File) {
            formData.append("imagem", imagem);
        }

        const response = await axiosInstance.post(`publicacao/`, formData);
        return response.data;

    }
    
    async update(publicacaoId: number, data: FormData) : Promise<void> {
        const response = await axiosInstance.put(`/publicacao/${publicacaoId}/`, data);
        return response.data;
    }

    async destroy(publicacaoId: number) : Promise<void> {
        const response = await axiosInstance.delete(`/publicacao/${publicacaoId}/`);
        return response.data;
    }

}

export default new PublicacaoService();