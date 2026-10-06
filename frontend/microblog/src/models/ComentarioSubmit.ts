export interface ComentarioSubmitProps {
    publicacao: string | number;
    onComentarioCriado: () => void | Promise<void>
}