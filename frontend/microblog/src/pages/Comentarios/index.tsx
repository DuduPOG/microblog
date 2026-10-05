import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../../components/Botao-Voltar";
import FormComentario from "../../components/FormComentario";
import Header from "../../components/Header";
import comentarioService from "../../services/comentarioService";
import Botao from "../../components/Botao";
import ListaComentarios, { type ComentarioItem } from "../../components/ListaComentarios";

export default function Comentarios() {
    const { id } = useParams<{ id: string }>();
    const [comentarios, setComentarios] = useState<ComentarioItem[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    function atualizarComentario(comentarioId: number, mensagem: string) {
        setComentarios((atuais) => atuais.map((comentario) =>
            comentario.id === comentarioId ? { ...comentario, mensagem } : comentario
        ));
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

        comentarioService.publicacao(id)
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
            <Botao label="Voltar ás Publicações" action={() => navigate('/publicacoes')} className="br-button secondary mb-3"/>
            <Botao label="Voltar á Publicação" action={() => navigate(`/publicacoes/${id}`)} className="br-button secondary mb-3"/>
            <div className="container mb-4">
                <h1>Comentários</h1>
                {id ? (
                    <FormComentario publicacao={id} />
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
                        <ListaComentarios
                            comentarios={comentarios}
                            onComentarioAtualizado={atualizarComentario}
                        />
                    </>
                )}
            </div>
        </>
    );
}
