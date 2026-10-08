import { useCallback, useEffect, useState } from "react";
import PublicacaoService from "../../services/PublicacaoService";
import imgPadrao from "../../assets/image.png";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import Botao from "../BrBotao";
import Header from "../BrHeader";
import ComentarioService from "../../services/ComentarioService";
import { Comentario } from "../../models/Comentario";
import  BrComentarios from "../BrComentarios";
import { PublicacaoDetalhe } from "../../models/Publicacao";

/**
 * Exibe os detalhes de uma publicação e os comentários relacionados.
 * Para o autor da publicação, disponibiliza edição do título, descrição e imagem,
 * além da exclusão; também permite navegar para o formulário de comentários.
 *
 * @author
 *  @DuduPOG
 *
 * @param {void} props Este componente não recebe propriedades; obtém o identificador da publicação pela rota atual.
 *
 * @returns {JSX.Element} Elemento JSX com os detalhes, ações disponíveis e comentários.
 *
 * @example
 * ```tsx
 * <Publicacao />
 * ```
 *
 */

export default function Publicacao() : JSX.Element {
    const navigate : NavigateFunction = useNavigate();
    const { user } = useAuth();
    const id : number | undefined = user?.id;
    const [publicacao, setPublicacao] = useState<PublicacaoDetalhe | null>(null);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [rascunho, setRascunho] = useState({ titulo: "", descricao: "" });
    const [imagem, setImagem] = useState<File | null>(null);
    const [editando, setEditando] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!id) return;

        setCarregando(true);
        PublicacaoService.getId(id)
        .then((res: PublicacaoDetalhe) : void => {
            setPublicacao(res);
            setRascunho({ titulo: res.titulo, descricao: res.descricao });
        })
        .catch(() => {
            setErro("Não foi possível carregar esta publicação.")
        })
        .finally(() => {
            setCarregando(false)
        });

        ComentarioService.publicacao(id)
        .then((res: any) => {
            setComentarios(res);
            console.log(res);
        });
    }, [id]);

    const ehAutor = publicacao?.autor?.id !== undefined
        && Number(publicacao.autor.id) === Number(user?.id);

    const atualizarComentario = useCallback((comentarioId: number, mensagem: string) : void => {
        setComentarios((atuais) => atuais.map((comentario) =>
            comentario.id === comentarioId ? { ...comentario, mensagem } : comentario
        ));
    }, []);

    const salvarEdicao = useCallback(async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        if (!id) return;

        const dados : FormData = new FormData();
        dados.append("titulo", rascunho.titulo);
        dados.append("descricao", rascunho.descricao);
        if (imagem) dados.append("imagem", imagem);

        try {
            const atualizada : PublicacaoDetalhe = await PublicacaoService.update(Number(id), dados);
            setPublicacao(atualizada);
            setRascunho({
                titulo: atualizada.titulo,
                descricao: atualizada.descricao
            });
            setImagem(null);
            setEditando(false);
            setErro("");
        } catch {
            setErro("Não foi possível salvar as alterações.");
        }
    }, [id, imagem, rascunho]);

    const excluir = useCallback(async () : Promise<void> => {
        if (!id || !window.confirm("Deseja realmente excluir esta publicação?")) return;

        try {
            await PublicacaoService.destroy(Number(id));
            navigate("/publicacoes");
        } catch {
            setErro("Não foi possível excluir esta publicação.");
        }
    }, [id, navigate]);

    const voltarPublicacoes = useCallback(() : void => {
        navigate("/publicacoes");
    }, [navigate]);

    const abrirComentarios = useCallback(() : void => {
        if (publicacao) navigate(`/comentarios/${publicacao.id}`);
    }, [navigate, publicacao]);

    const iniciarEdicao = useCallback(() : void => {
        setEditando(true);
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <div style={{textAlign: "initial"}}>
                    <Botao 
                        label="Voltar às publicações"
                        action={voltarPublicacoes}
                        className="br-button secondary m-3"
                    />
                </div>
                <h1 style={{textAlign: "center"}} >Detalhamento</h1>
                {!carregando && publicacao && (
                    <div className="d-flex justify-content-center">
                        <article className="col-12 col-lg-9">
                            <div className="br-card" style={{textAlign: "center", maxHeight: "600px"}}>
                                <div className="card-content">
                                    <img
                                        src={publicacao.imagem || imgPadrao}
                                        alt={publicacao.imagem ? publicacao.titulo : "Publicação sem imagem"}
                                        style={{ width: "auto", maxHeight: "300px"}}
                                    />
                                </div>
                                <div className="card-content">
                                    {editando ? (
                                        <form onSubmit={salvarEdicao}>
                                            <div className="br-input mb-3">
                                                <label htmlFor="titulo">Título</label>
                                                <input
                                                    id="titulo"
                                                    required
                                                    maxLength={200}
                                                    value={rascunho.titulo}
                                                    onChange={(event) => setRascunho({ ...rascunho, titulo: event.target.value })}
                                                />
                                            </div>
                                            <div className="br-input mb-3">
                                                <label htmlFor="descricao">Descrição</label>
                                                <textarea
                                                    id="descricao"
                                                    required
                                                    maxLength={1200}
                                                    value={rascunho.descricao}
                                                    onChange={(event) => setRascunho({ ...rascunho, descricao: event.target.value })}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="imagem">Substituir imagem</label>
                                                <input
                                                    id="imagem"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => setImagem(event.target.files?.[0] ?? null)}
                                                />
                                            </div>
                                            <button 
                                                type="submit"
                                                className="br-button primary"
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                type="button"
                                                className="br-button secondary ml-2"
                                                onClick={() => {
                                                    setEditando(false)
                                                }}
                                                >
                                                Cancelar
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <h1>{publicacao.titulo}</h1>
                                            <p>{publicacao.descricao}</p>
                                            <p>
                                                Publicado por {publicacao.autor?.username || publicacao.autor?.nome || "Usuário Comum"}
                                                {publicacao.publicado_em && ` em ${new Date(publicacao.publicado_em).toLocaleString("pt-BR")}`}
                                            </p>
                                            {ehAutor && (
                                                <div style={{textAlign: "center"}}>
                                                    <Botao 
                                                        label="Editar"
                                                        action={iniciarEdicao}
                                                        className="br-button primary m-1"
                                                    />
                                                    <Botao 
                                                        label="Excluir"
                                                        action={excluir}
                                                        className="br-button danger m-1"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    </div>
                )}
                {publicacao &&  
                <>
                <div style={{textAlign: "center"}}>
                    <Botao
                        label="Comentar"
                        action={abrirComentarios}
                        className="br-button warning m-3"
                    />
                </div>
                </>
                }
                {comentarios.length > 0 && (
                    <>
                        <h2>Comentários</h2>
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