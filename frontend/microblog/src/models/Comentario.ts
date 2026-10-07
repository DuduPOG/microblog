
// -----------------------------
// Interface de Modelo de Comentario
// -----------------------------
export interface Comentario {
    id: number;
    autor?: {
        id?: number | string;
        nome?: string;
        username?: string;
    } | null;
    mensagem: string;
}

export interface ComentarioProps {
    comentarios: Comentario[];
    onComentarioAtualizado: (comentarioId: number, mensagem: string) => void;
}

// -----------------------------
// Interface das props do componente FormComentario
// -----------------------------
export interface ComentarioSubmitProps {
    publicacao: string;
    onComentarioCriado: () => void | Promise<void>
}

// -----------------------------
// Interface de Submissão de Comentario
// -----------------------------
export interface ComentarioSubmit {
    mensagem: string;
}