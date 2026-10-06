export interface Comentario {
    id: number;
    autor?: {
        id?: number | string;
        nome?: string;
        username?: string;
    } | null;
    mensagem: string;
}