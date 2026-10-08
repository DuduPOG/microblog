import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComentarioService from "../../services/ComentarioService";
import Botao from "../BrBotao";
import { ComentarioSubmitProps, ComentarioSubmit } from "../../models/Comentario";

/**
 * Renderiza um formulário para criar comentário em uma publicação.
 * Valida a mensagem para exigir conteúdo com até 400 caracteres e limpa o campo
 * após a criação e a execução do callback informado.
 *
 * @author
 *  @DuduPOG
 *
 * @param {ComentarioSubmitProps} props Propriedades do formulário de comentário.
 * @param {number | string} props.publicacao Identificador da publicação que receberá o comentário.
 * @param {() => void | Promise<void>} props.onComentarioCriado Callback executado após a criação.
 *
 * @returns {JSX.Element} Elemento JSX do formulário de comentário.
 *
 * @example
 * ```tsx
 * <FormComentario
 *   publicacao={publicacaoId}
 *   onComentarioCriado={recarregarComentarios}
 * />
 * ```
 *
 */

const schema : yup.ObjectSchema<ComentarioSubmit> = yup.object().shape({
        mensagem: yup
                .string()
                .required("A mensagem é necessária")
                .max(400, "A mensagem não pode ter mais de 400 caracteres")
});

const resolver = yupResolver(schema);

function FormComentario(props: ComentarioSubmitProps) : JSX.Element {

    const { publicacao } = props;

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm({
        resolver
    });

    const dataHandler = useCallback(async (data: ComentarioSubmit) : Promise<void> => {
        const bd = await ComentarioService.create(Number(publicacao), data);
        await props.onComentarioCriado();
        console.log(bd);
        reset();
    }, [publicacao, props.onComentarioCriado, reset]);
    const errorHandler = useCallback((errors: any) : void => {
        console.log(errors);
        console.log("Os campos obrigatórios devem ser preenchidos e corretamente!");
    }, []);
    const limparFormulario = useCallback(() : void => {
        reset();
    }, [reset]);

    return (
        <>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="grid col-10">
                    <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                        <div className={`br-textarea mb-3 ${errors.mensagem !== undefined ? "danger" : ""}`}>
                            <label htmlFor="mensagem">Comentário</label>
                            <textarea 
                                id="mensagem"
                                aria-controls="limitmax"
                                maxLength={400}
                                placeholder="Insira um comentário"
                                {...register("mensagem")}
                                />
                                <div className="text-base mt-1">
                                    <span
                                        className="limit"
                                        aria-live="polite"
                                    >
                                        Limite máximo de <strong>400</strong> caracteres
                                    </span>
                                    <span
                                        className="current"
                                        aria-live="polite"
                                        role="status"
                                        id="limitmax"
                                    >
                                    </span>
                                </div>
                                {
                                errors.mensagem !== undefined && 
                                (<span 
                                    className="feedback danger"
                                    role="alert"
                                    id="danger"
                                >
                                    <i 
                                        className="fa fa-times-circle"
                                        aria-hidden="true"
                                    >
                                    </i>
                                    {errors.mensagem?.message}
                                </span>
                                )}
                                
                        </div>
                        <div style={{textAlign: "end"}}>
                            <Botao
                                label="Limpar"
                                action={limparFormulario}
                                className="br-button secondary m-1"
                            />
                            <input
                                type="submit"
                                value="Comentar"
                                className="br-button primary warning"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default memo(FormComentario);