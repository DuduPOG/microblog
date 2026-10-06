import { BotaoProps } from "../../models/Botao";

export default function Botao(props:BotaoProps) {

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