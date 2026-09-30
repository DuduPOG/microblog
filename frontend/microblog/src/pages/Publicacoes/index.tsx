import BotaoVoltar from "../../components/Botao-Voltar";
import FormPublicacao from "../../components/FormPublicacao";
import Header from "../../components/Header";
import Publicacao from "../../components/Publicacao/detail-publicacoes";

export default function Publicacoes() {
    return (
        <>
        <Header/>
        <h1>Adicionar Publicação</h1>
        <FormPublicacao/>
        <Publicacao/>
        <BotaoVoltar/>
        </>
    )
}