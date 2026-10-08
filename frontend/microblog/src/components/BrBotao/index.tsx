import { memo } from "react";
import { BotaoProps } from "../../models/Botao";

/**
 * Renderiza um botão reutilizável, com classes de estilo e ícone opcionais,
 * que executa uma ação quando acionado.
 *
 * @author
 *  @DuduPOG
 *
 * @param {BotaoProps} props Propriedades do botão.
 * @param {() => void} props.action Função executada ao clicar no botão.
 * @param {string} [props.label] Texto ou conteúdo exibido no botão.
 * @param {string} [props.className] Classes CSS adicionais aplicadas ao botão.
 * @param {string} [props.icon] Classes CSS usadas para renderizar o ícone do botão.
 *
 * @returns {JSX.Element} Elemento JSX do botão interativo.
 *
 * @example
 * ```tsx
 * <BrBotao action={enviarFormulario} label="Enviar" className="br-button primary" />
 * ```
 *
 */

function BrBotao(props: BotaoProps) : JSX.Element {

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

export default memo(BrBotao);