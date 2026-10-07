import { PublicacaoDetalhe, PublicacaoSubmit } from "../models/Publicacao";
import { axiosInstance } from "./axiosInstance";

class PublicacaoService {
    async getId(publicacaoId: number) : Promise<PublicacaoDetalhe> {
        const response = await axiosInstance.get<PublicacaoDetalhe>(`/publicacao/${publicacaoId}/`);
        return response.data;
    }

    async getAll() : Promise<PublicacaoDetalhe[]> {
        const response = await axiosInstance.get<{ results: PublicacaoDetalhe[] }>(`/publicacao/`);
        return response.data.results;
    }

    async create(data: PublicacaoSubmit) : Promise<void> {
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
    
    async update(publicacaoId: number, data: FormData) : Promise<PublicacaoDetalhe> {
        const response = await axiosInstance.put(`/publicacao/${publicacaoId}/`, data);
        return response.data;
    }

    async destroy(publicacaoId: number) : Promise<void> {
        const response = await axiosInstance.delete(`/publicacao/${publicacaoId}/`);
        return response.data;
    }

}

export default new PublicacaoService();