import { Comentario } from "./Comentario";

export interface BrComentariosProps {
    comentarios: Comentario[];
    onComentarioAtualizado: (comentarioId: number, mensagem: string) => void;
}