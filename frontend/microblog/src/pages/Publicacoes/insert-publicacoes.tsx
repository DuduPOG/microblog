import { useNavigate } from "react-router-dom";
import Botao from "../../components/Botao";
import Header from "../../components/Header";
import FormPublicacao from "../../components/FormPublicacao";

export default function NovaPublicação(){

    const navigate = useNavigate();

    return (
        <>
        <Header/>
        <div style={{textAlign: "initial"}}>
            <Botao label="Voltar às publicações" action={() => navigate('/publicacoes')} className="br-button secondary m-3"/>
        </div>
        <h1 style={{textAlign: "center"}} >Adicionar Publicação</h1>
        <FormPublicacao/>
        </>
    )
}