import { AxiosResponse } from "axios";
import { Comentario, ComentarioSubmit } from "../models/Comentario";
import { axiosInstance } from "./axiosInstance";
import { PublicacaoDetalhe } from "../models/Publicacao";

class ComentarioService {
    async getId(comentarioId: number) : Promise<Comentario> {
        const response = await axiosInstance.get<Comentario>(`/comentario/${comentarioId}/`);
        return response.data;
    }

    async publicacao(publicacaoId: number) : Promise<PublicacaoDetalhe[]> {
        const response = await axiosInstance.get<{ results: PublicacaoDetalhe[] }>(`/publicacao/${publicacaoId}/comentarios/`);
        return response.data.results;
    }

    async getAll() : Promise<Comentario[]> {
        const response = await axiosInstance.get<{ results: Comentario[] }>(`/comentario/`);
        return response.data.results;
    }

    async create(publicacao: string, data: ComentarioSubmit) : Promise<any> {
        const formData : FormData = new FormData();
        formData.append("publicacao", publicacao);
        formData.append("mensagem", data.mensagem);

        const response = await axiosInstance.post(`comentario/`, formData);
        return response.data;

    }
    
    async update(comentarioId: number, mensagem: string) : Promise<Comentario> {
        const response = await axiosInstance.patch<Comentario>(`/comentario/${comentarioId}/`, mensagem);
        return response.data;
    }

    async destroy(comentarioId: number) : Promise<any> {
        const data : Promise<Comentario> = this.getId(comentarioId);
        if (data === undefined) return;
        const response : AxiosResponse<any, any, {}, any> = await axiosInstance.delete(`/comentario/${comentarioId}`);
        return response.data;
    }

}

export default new ComentarioService();