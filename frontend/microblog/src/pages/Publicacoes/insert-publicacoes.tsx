import { useNavigate } from "react-router-dom";
import Botao from "../../components/Botao";
import Header from "../../components/Header";
import FormPublicacao from "../../components/FormPublicacao";

export default function NovaPublicação(){

    const navigate = useNavigate();

    return (
        <>
        <Header/>
        <Botao label="Voltar às publicações" action={() => navigate('/publicacoes')} className="br-button secondary mb-3"/>
        <FormPublicacao/>
        </>
    )
}