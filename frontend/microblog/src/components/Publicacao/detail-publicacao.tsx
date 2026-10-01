import { useEffect, useState } from "react";
import publicacaoService from "../../services/publicacaoService";
import imgPadrao from "../../assets/image.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import Botao from "../Botao";
import Header from "../Header";
import FormComentario from "../FormComentario";
import comentarioService from "../../services/comentarioService";

interface PublicacaoDetalhe {
    id: number;
    titulo: string;
    descricao: string;
    imagem?: string | null;
    publicado_em?: string;
    autor?: { id?: number | string; nome?: string; username?: string } | null;
}

interface ComentarioDetalhe {
    id: number;
    autor?: { id?: number | string; nome?: string; username?: string } | null;
    mensagem: string;
    publicado_em: string;
}


export default function PublicacaoDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [publicacao, setPublicacao] = useState<PublicacaoDetalhe | null>(null);
    const [comentarios, setComentarios] = useState<ComentarioDetalhe[]>([]);
    const [rascunho, setRascunho] = useState({ titulo: "", descricao: "" });
    const [imagem, setImagem] = useState<File | null>(null);
    const [editando, setEditando] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!id) return;

        setCarregando(true);
        publicacaoService.getId(id)
        .then((res: PublicacaoDetalhe) => {
            setPublicacao(res);
            setRascunho({ titulo: res.titulo, descricao: res.descricao });
        })
        .catch(() => setErro("Não foi possível carregar esta publicação."))
        .finally(() => setCarregando(false));
        comentarioService.publicacao(id)
        .then((res: any) => {
            setComentarios(res);
            console.log(res);
        });
    }, [id]);

    const ehAutor = publicacao?.autor?.id !== undefined &&
        Number(publicacao.autor.id) === Number(user?.id);

    async function salvarEdicao(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!id) return;

        const dados = new FormData();
        dados.append("titulo", rascunho.titulo);
        dados.append("descricao", rascunho.descricao);
        if (imagem) dados.append("imagem", imagem);

        try {
            const atualizada = await publicacaoService.update(Number(id), dados);
            setPublicacao(atualizada);
            setRascunho({ titulo: atualizada.titulo, descricao: atualizada.descricao });
            setImagem(null);
            setEditando(false);
            setErro("");
        } catch {
            setErro("Não foi possível salvar as alterações.");
        }
    }

    async function excluir() {
        if (!id || !window.confirm("Deseja realmente excluir esta publicação?")) return;

        try {
            await publicacaoService.destroy(Number(id));
            navigate("/publicacoes");
        } catch {
            setErro("Não foi possível excluir esta publicação.");
        }
    }

    return (
        <>
            <Header />
            <div className="container mb-4">
                <Botao label="Voltar às publicações" action={() => navigate('/publicacoes')} className="br-button secondary mb-3" />
                <h1>Detalhamento</h1>
                {!carregando && publicacao && (
                    <div className="row justify-content-center">
                        <article className="col-12 col-lg-9">
                            <div className="br-card">
                                <div className="card-content">
                                    <img
                                        src={publicacao.imagem || imgPadrao}
                                        alt={publicacao.imagem ? publicacao.titulo : "Publicação sem imagem"}
                                        style={{ width: "100%", maxHeight: "480px", objectFit: "contain" }}
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
                                            <button type="submit" className="br-button primary">Salvar</button>
                                            <button type="button" className="br-button secondary ml-2" onClick={() => setEditando(false)}>
                                                Cancelar
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <h1>{publicacao.titulo}</h1>
                                            <p>{publicacao.descricao}</p>
                                            <p>
                                                Publicado por {publicacao.autor?.nome || publicacao.autor?.username || "Usuário"}
                                                {publicacao.publicado_em && ` em ${new Date(publicacao.publicado_em).toLocaleString("pt-BR")}`}
                                            </p>
                                            {ehAutor && (
                                                <div className="d-flex flex-wrap gap-2">
                                                    <Botao label="Editar" action={() => setEditando(true)} className="br-button primary" />
                                                    <Botao label="Excluir" action={excluir} className="br-button danger" />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    </div>
                )}
                <FormComentario publicacao={id} />
                {comentarios && (
                    <>
                    <h2>Comentários</h2>
                    {comentarios.map((comentario: ComentarioDetalhe) => {
                        return (
                            <>
                            <div className="br-card" key={comentario.id}>
                                <div className="card-header">
                                    <div className="d-flex">
                                        <span className="br-avatar" title={comentario.autor?.username}>
                                            <span className="content bg-blue-vivid-50 text-pure-0">
                                            {comentario.autor?.username[0].toUpperCase()}
                                            </span>
                                        </span>
                                        <div className="ml-3">
                                            <div className="text-weight-semi-bold text-up-02">
                                            <p>{comentario.autor?.username || comentario.autor?.nome || "Usuário Comum"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p>{comentario.mensagem}</p>
                                </div>
                            </div>
                            </>
                        )
                    })}
                    </>
                )}
            </div>
        </>
    );
}