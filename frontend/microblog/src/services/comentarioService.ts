import { AxiosResponse } from "axios";
import { ComentarioSubmit } from "../models/Comentario";
import { axiosInstance } from "./axiosInstance";

class ComentarioService {
    async getId(comentarioId: number) : Promise<any> {
        const response = await axiosInstance.get(`/comentario/${comentarioId}/`);
        return response.data;
    }

    async publicacao(publicacaoId: number) : Promise<any> {
        const response = await axiosInstance.get(`/publicacao/${publicacaoId}/comentarios/`);
        return response.data.results;
    }

    async getAll() : Promise<any> {
        const response = await axiosInstance.get(`/comentario/`);
        return response.data.results;
    }

    async create(publicacao: string, data: ComentarioSubmit) : Promise<any> {
        const formData : FormData = new FormData();
        formData.append("publicacao", publicacao);
        formData.append("mensagem", data.mensagem);

        const response = await axiosInstance.post(`comentario/`, formData);
        return response.data;

    }
    
    async update(comentarioId: number, mensagem: string) : Promise<any> {
        const response = await axiosInstance.patch(`/comentario/${comentarioId}/`, mensagem);
        return response.data;
    }

    async destroy(comentarioId: any) : Promise<any> {
        const data : Promise<any> = this.getId(comentarioId);
        if (data === undefined) return;
        const response : AxiosResponse<any, any, {}, any>= await axiosInstance.delete(`/comentario/`, comentarioId);
        return response.data;
    }

}

export default new ComentarioService();