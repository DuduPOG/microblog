export interface Comentario {
    id: number;
    autor?: {
        id?: number | string;
        nome?: string;
        username?: string;
    } | null;
    mensagem: string;
}

export interface ComentarioSubmitProps {
    publicacao: string;
    onComentarioCriado: () => void | Promise<void>
}

export interface ComentarioSubmit {
    mensagem: string;
}