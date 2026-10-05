export interface IBotaoProps {
    /* Função acionada pelo botão quando clicado */
    action: () => void;
    label: string;
    className?: string;
    icon?: string;
}