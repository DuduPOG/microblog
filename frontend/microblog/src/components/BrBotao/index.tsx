import { BotaoProps } from "../../models/Botao";

export default function Botao(props: BotaoProps) : JSX.Element {

    const { action, label, className, icon } = props;

    return (
        <>
            <button 
                className={className}
                onClick={action}
            >
            <i className={`${icon}`}></i>
                {label}
            </button>
        </>
    )
}