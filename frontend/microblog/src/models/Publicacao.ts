// -----------------------------
// Interface de Submissão de Publicacao
// -----------------------------
export interface PublicacaoSubmit{
    titulo: string;
    imagem?: FileList | null | undefined;
    descricao: string;
}

// -----------------------------
// Interface de detalhamento da Publicacao no componente BrPublicacaoDetalhe
// -----------------------------
export interface PublicacaoDetalhe {
    id: number;
    titulo: string;
    descricao: string;
    imagem?: string | null;
    autor?: {
            id?: number;
            username?: string;
            nome?: string;
    } | null | undefined;
}