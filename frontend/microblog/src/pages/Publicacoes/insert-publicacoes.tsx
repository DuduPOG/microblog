import { useCallback } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Botao from "../../components/BrBotao";
import Header from "../../components/BrHeader";
import FormPublicacao from "../../components/BrFormPublicacao";

export default function NovaPublicação() : JSX.Element {

    const navigate : NavigateFunction = useNavigate();
    const voltarPublicacoes = useCallback(() : void => {
        navigate("/publicacoes");
    }, [navigate]);

    return (
        <>
        <Header />
        <div style={{textAlign: "initial"}}>
            <Botao
                label="Voltar às publicações"
                action={voltarPublicacoes}
                className="br-button secondary m-3"
            />
        </div>
        <h1 style={{textAlign: "center"}} >Adicionar Publicação</h1>
        <FormPublicacao />
        </>
    )
}