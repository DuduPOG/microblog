import { memo, useCallback, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import ComentarioService from "../../services/ComentarioService";
import { BrComentarioProps, Comentario } from "../../models/Comentario";

interface ComentarioItemProps {
    comentario: Comentario;
    ehAutor: boolean;
    onComentarioAtualizado: (comentarioId: number, mensagem: string) => void;
}

const ComentarioItem = memo(function ComentarioItem({
    comentario,
    ehAutor,
    onComentarioAtualizado
}: ComentarioItemProps): JSX.Element {
    const [editando, setEditando] = useState(false);
    const [mensagemEditada, setMensagemEditada] = useState(comentario.mensagem);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    const nomeAutor = comentario.autor?.username
        || comentario.autor?.nome
        || "Usuário Comum";

    function iniciarEdicao(): void {
        setMensagemEditada(comentario.mensagem);
        setErro("");
        setEditando(true);
    }

    const confirmarEdicao = useCallback(async (): Promise<void> => {
        setSalvando(true);
        setErro("");

        try {
            await ComentarioService.update(comentario.id, mensagemEditada);
            onComentarioAtualizado(comentario.id, mensagemEditada);
            setEditando(false);
        } catch {
            setErro("Não foi possível atualizar o comentário.");
        } finally {
            setSalvando(false);
        }
    }, [comentario.id, mensagemEditada, onComentarioAtualizado]);

    return (
        <article className="br-card">
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
                {ehAutor && !editando && (
                    <button
                        type="button"
                        className="br-button secondary circle"
                        aria-label="Editar comentário"
                        title="Editar comentário"
                        onClick={iniciarEdicao}
                    >
                        <i className="fas fa-edit" aria-hidden="true" />
                    </button>
                )}
            </div>
            <div className="card-content">
                {editando ? (
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
                                setEditando(false);
                                setErro("");
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="br-button primary mt-2"
                            disabled={salvando || !mensagemEditada.trim()}
                            onClick={confirmarEdicao}
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
});

/**
 * Exibe a lista de comentários e permite que cada autor edite seu próprio comentário.
 *
 * @param {BrComentarioProps} props Comentários a exibir e callback para sincronizar uma edição.
 * @param {Comentario[]} props.comentarios Lista de comentários.
 * @param {(comentarioId: number, mensagem: string) => void} props.onComentarioAtualizado
 * Callback chamado quando um comentário for atualizado.
 * @returns {JSX.Element} Lista dos comentários.
 *
 * @example
 * ```tsx
 * <BrComentarios comentarios={comentarios} onComentarioAtualizado={atualizarComentario} />
 * ```
 *
 * @author @DuduPOG
 */
function BrComentarios({ comentarios, onComentarioAtualizado }: BrComentarioProps): JSX.Element {
    const { user } = useAuth();

    return (
        <>
            {comentarios.map((comentario) => {
                const ehAutor = user?.id !== undefined
                    && comentario.autor?.id !== undefined
                    && Number(user.id) === Number(comentario.autor.id);

                return (
                    <ComentarioItem
                        key={comentario.id}
                        comentario={comentario}
                        ehAutor={ehAutor}
                        onComentarioAtualizado={onComentarioAtualizado}
                    />
                );
            })}
        </>
    );
}

export default memo(BrComentarios);
