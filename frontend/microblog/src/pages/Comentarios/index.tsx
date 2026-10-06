import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormComentario from "../../components/BrFormComentario";
import Header from "../../components/BrHeader";
import ComentarioService from "../../services/ComentarioService";
import Botao from "../../components/BrBotao";
import BrComentarios from "../../components/BrComentarios";
import { Comentario } from "../../models/Comentario";

export default function Comentarios(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    function atualizarComentario(comentarioId: number, mensagem: string) {
        setComentarios((atuais) => atuais.map((comentario) =>
            comentario.id === comentarioId ? { ...comentario, mensagem } : comentario
        ));
    }

    async function recarregarComentarios() {
        if (!id) return;
        const atualizados = await ComentarioService.publicacao(id);
        setComentarios(atualizados);
    }

    useEffect(() => {
        if (!id) {
            setCarregando(false);
            setErro("Não foi possível identificar a publicação.");
            return;
        }

        let ativo = true;
        setCarregando(true);
        setErro("");

        ComentarioService.publicacao(id)
            .then((res: any) => {
                if (ativo) setComentarios(res);
            })
            .catch(() => {
                if (ativo) setErro("Não foi possível carregar os comentários.");
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });

        return () => {
            ativo = false;
        };
    }, [id]);

    return (
        <>
            <Header />
            <Botao 
                label="Voltar ás Publicações"
                action={() => {
                    navigate("/publicacoes")}} 
                className="br-button secondary m-3"
            />
            <Botao 
                label="Voltar á Publicação"
                action={() => {
                    navigate(`/publicacoes/${id}`)}} 
                className="br-button primary m-3"
            />
            <div className="container mb-4">
                <h1 style={{textAlign: "center"}} >Comentários</h1>
                {id ? (
                    <FormComentario 
                        publicacao={id}
                        onComentarioCriado={recarregarComentarios}    
                    />
                ) : (
                    <p>Não foi possível identificar a publicação.</p>
                )}
                <br></br>
                {carregando && <p>Carregando comentários...</p>}
                {erro && <p role="alert">{erro}</p>}
                {!carregando && !erro && comentarios.length === 0 && (
                    <p>Esta publicação ainda não tem comentários.</p>
                )}
                {!carregando && !erro && comentarios.length > 0 && (
                    <>
                        <BrComentarios
                            comentarios={comentarios}
                            onComentarioAtualizado={atualizarComentario}
                        />
                    </>
                )}
            </div>
        </>
    );
}
