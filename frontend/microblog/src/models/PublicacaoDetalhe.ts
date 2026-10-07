export interface PublicacaoDetalhe {
    id: number;
    titulo: string;
    descricao: string;
    imagem?: string | null;
    autor?: { nome?: string; username?: string } | null | undefined;
}