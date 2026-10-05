import { IBotaoProps } from "./IBotaoProps";

/* Componente de Botão */

export default function Botao(props:IBotaoProps) {

    const { action, label, className, icon } = props;

    return (
        <>
            <button 
                className={className}
                onClick={action}
            >
                {label}
            <i className={`${icon}`}></i>
            </button>
        </>
    )
}