import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import ComentarioService from "../../services/ComentarioService";
import { BrComentariosProps } from "../../models/BrComentarios";
import { Comentario } from "../../models/Comentario";

export default function BrComentarios({
    comentarios,
    onComentarioAtualizado,
}: BrComentariosProps) {
    const { user } = useAuth();
    const [comentarioEditando, setComentarioEditando] = useState<number | null>(null);
    const [mensagemEditada, setMensagemEditada] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    function iniciarEdicao(comentario: Comentario) {
        setComentarioEditando(comentario.id);
        setMensagemEditada(comentario.mensagem);
        setErro("");
    }

    async function confirmarEdicao(comentarioId: number) {
        setSalvando(true);
        setErro("");

        try {
            await ComentarioService.update(comentarioId, mensagemEditada);
            onComentarioAtualizado(comentarioId, mensagemEditada);
            setComentarioEditando(null);
        } catch {
            setErro("Não foi possível atualizar o comentário.");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <>
            {comentarios.map((comentario) => {
                const nomeAutor = comentario.autor?.username
                    || comentario.autor?.nome
                    || "Usuário Comum";
                const ehAutor = user?.id !== undefined
                    && comentario.autor?.id !== undefined
                    && String(user.id) === String(comentario.autor.id);
                const estaEditando = comentarioEditando === comentario.id;

                return (
                    <article className="br-card" key={comentario.id}>
                        <div className="card-header d-flex align-items-start justify-content-between">
                            <div className="d-flex">
                                <span className="br-avatar" title={nomeAutor}>
                                    <span className="content bg-blue-vivid-50 text-pure-0">
                                        {nomeAutor.charAt(0).toUpperCase()}
                                    </span>
                                </span>
                                <div className="ml-3">
                                    <div className="text-weight-semi-bold text-up-02">
                                        <p>{nomeAutor}</p>
                                    </div>
                                </div>
                            </div>
                            {ehAutor && !estaEditando && (
                                <button
                                    type="button"
                                    className="br-button secondary circle"
                                    aria-label="Editar comentário"
                                    title="Editar comentário"
                                    onClick={() => iniciarEdicao(comentario)}
                                >
                                    <i className="fas fa-edit" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                        <div className="card-content">
                            {estaEditando ? (
                                <>
                                    <textarea
                                        className="br-textarea"
                                        aria-label="Editar mensagem do comentário"
                                        autoFocus
                                        maxLength={400}
                                        value={mensagemEditada}
                                        onChange={(event) => setMensagemEditada(event.target.value)}
                                        style={{ border: "1px solid #000" }}
                                    />
                                    <button
                                        type="button"
                                        className="br-button secondary mt-2 ml-2"
                                        disabled={salvando}
                                        onClick={() => {
                                            setComentarioEditando(null);
                                            setErro("");
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="br-button primary mt-2"
                                        disabled={salvando || !mensagemEditada.trim()}
                                        onClick={() => confirmarEdicao(comentario.id)}
                                    >
                                        {salvando ? "Salvando..." : "Confirmar"}
                                    </button>
                                    {erro && <p role="alert">{erro}</p>}
                                </>
                            ) : (
                                <p>{comentario.mensagem}</p>
                            )}
                        </div>
                    </article>
                );
            })}
        </>
    );
}
