// -----------------------------
// Interface de Botão genérico
// -----------------------------
export interface BotaoProps {
    action: () => void;
    label?: string;
    className?: string;
    icon?: string;
}