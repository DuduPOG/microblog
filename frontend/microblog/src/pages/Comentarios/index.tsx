import BotaoVoltar from "../../components/Botao-Voltar";
import FormComentario from "../../components/FormComentario";
import Header from "../../components/Header";

export default function Comentarios() {

    return ( 
        <>
            <Header/>
            <h1>Comentários</h1>
            <FormComentario/>
            <BotaoVoltar/>
        </>
    );
}