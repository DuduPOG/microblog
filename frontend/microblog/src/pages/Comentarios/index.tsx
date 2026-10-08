import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormComentario from "../../components/BrFormComentario";
import Header from "../../components/BrHeader";
import ComentarioService from "../../services/ComentarioService";
import Botao from "../../components/BrBotao";
import BrComentarios from "../../components/BrComentarios";
import { Comentario } from "../../models/Comentario";

export default function Comentarios(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const publicationId = Number(id);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const atualizarComentario = useCallback((comentarioId: number, mensagem: string) : void => {
        setComentarios((atuais: Comentario[]) : Comentario[] => atuais.map((comentario: Comentario) : Comentario =>
            comentario.id === comentarioId ? { ...comentario, mensagem } : comentario
        ));
    }, []);

    const recarregarComentarios = useCallback(async () : Promise<void> => {
        if (!Number.isSafeInteger(publicationId) || publicationId <= 0) return;
        const atualizados = await ComentarioService.publicacao(publicationId);
        setComentarios(atualizados);
    }, [publicationId]);

    useEffect(() => {
        let ativo = true;
        if (!id || !Number.isSafeInteger(publicationId) || publicationId <= 0) {
            setComentarios([]);
            setCarregando(false);
            setErro("Não foi possível identificar a publicação.");
            return () => {
                ativo = false;
            };
        }

        setCarregando(true);
        setErro("");
        setComentarios([]);

        ComentarioService.publicacao(publicationId)
            .then((res: Comentario[]) => {
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
    }, [id, publicationId]);

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
                {Number.isSafeInteger(publicationId) && publicationId > 0 ? (
                    <FormComentario 
                        publicacao={publicationId}
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
