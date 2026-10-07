import { NavigateFunction, useNavigate } from "react-router-dom";
import Botao from "../../components/BrBotao";
import Header from "../../components/BrHeader";
import FormPublicacao from "../../components/BrFormPublicacao";

export default function NovaPublicação() : JSX.Element {

    const navigate : NavigateFunction = useNavigate();

    return (
        <>
        <Header />
        <div style={{textAlign: "initial"}}>
            <Botao
                label="Voltar às publicações"
                action={() => {
                        navigate("/publicacoes")
                    }
                }
                className="br-button secondary m-3"
            />
        </div>
        <h1 style={{textAlign: "center"}} >Adicionar Publicação</h1>
        <FormPublicacao />
        </>
    )
}