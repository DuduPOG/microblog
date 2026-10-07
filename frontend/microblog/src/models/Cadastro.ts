import { Comentario } from "./Comentario";

// -----------------------------
// Interface das props do componente BrComentarios
// -----------------------------
export interface BrComentariosProps {
    comentarios: Comentario[];
    onComentarioAtualizado: (comentarioId: number, mensagem: string) => void;
}

// -----------------------------
// Interface de Modelo de Comentario
// -----------------------------
export interface CadastroSubmit{
    username: string;
    nome: string;
    password: string;
    confirmPassword: string;
}