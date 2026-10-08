import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PublicacaoService from "../../services/PublicacaoService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PublicacaoSubmit } from "../../models/Publicacao";

/**
 * Renderiza o formulário de criação de publicação.
 * Exige título (até 200 caracteres) e descrição (até 1200 caracteres), permite
 * anexar opcionalmente um arquivo de imagem e redireciona ao feed após criar a publicação.
 *
 * @author
 *  @DuduPOG
 *
 * @param {void} props Este componente não recebe propriedades; título, descrição e imagem são informados pelo usuário no formulário.
 *
 * @returns {JSX.Element} Elemento JSX do formulário de publicação e seus estados de validação.
 *
 * @example
 * ```tsx
 * <FormPublicacao />
 * ```
 *
 */

const schema : yup.ObjectSchema<PublicacaoSubmit>= yup.object().shape({
        titulo: yup
                .string()
                .required("O Título é necessário")
                .max(200, "O Título não pode ter mais de 200 caracteres"),
        imagem: yup
                .mixed<FileList>()
                .test("fileType", "Apenas arquivos de imagem são permitidos", (arq) => {
                    if(arq === null || arq?.length === 0) {
                        return true;
                    }
                    const file = arq?.item(0);
                    return file !== null && file?.type.startsWith("image/");
                }),
        descricao: yup
                   .string()
                   .required("A descrição é necessária")
                   .max(1200, "A descrição não pode ter mais de 1200 caracteres")
});

const resolver = yupResolver(schema);

export default function FormPublicacao() : JSX.Element {

    const navigate : NavigateFunction = useNavigate();

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm({
        resolver
    });

    const dataHandler = useCallback(async (data: PublicacaoSubmit) : Promise<void> => {
        const bd = await PublicacaoService.create(data);
        console.log(bd);
        navigate("/publicacoes");
    }, [navigate]);

    const errorHandler = useCallback((errors: any) : void => {
        console.log(errors);
        console.log("Os campos obrigatórios devem ser preenchidos e corretamente!");
    }, []);

    return (
        <>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="grid col-10">
                    <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                        <div className={`br-input mb-3 ${errors.titulo !== undefined ? "danger" : ""}`}>
                            <input 
                                id="titulo"
                                type="text"
                                placeholder="Título"
                                {...register("titulo")}
                            />
                            {
                            errors.titulo !== undefined && 
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
                                {errors.titulo?.message}
                            </span>
                            )}
                                
                        </div>
                        <div className="br-upload mb-3" data-danger="data-danger">
                            <label className="upload-label" htmlFor="imagem">
                                <span>Imagem</span>
                            </label>
                            <input 
                                id="imagem"
                                className="upload-input"
                                type="file"
                                aria-label="Enviar Imagem"
                                {...register("imagem")}
                                />
                            <div className="upload-list"></div>
                                {
                                errors.imagem !== undefined && 
                                (<span 
                                    className="feedback danger mt-1"
                                    role="alert"
                                    id="danger"
                                >
                                    <i 
                                        className="fa fa-times-circle"
                                        aria-hidden="true"
                                    >
                                    </i>
                                    {errors.imagem?.message}
                                </span>
                                )}
                                
                        </div>
                        <div className={`br-textarea mb-3 ${errors.descricao !== undefined ? "danger" : ""}`}>
                            <label htmlFor="descricao" >Descrição</label>
                            <textarea
                                id="descricao"
                                aria-controls="limitmax"
                                placeholder="Insira uma descrição"
                                maxLength={1200}
                                {...register("descricao")}
                                />
                                <div className="text-base mt-1">
                                    <span className="limit" aria-live="polite">
                                        Limite máximo de <strong>1200</strong> caracteres
                                    </span>
                                    <span className="current" aria-live="polite" role="status" id="limitmax"></span>
                                </div>
                                {
                                errors.descricao !== undefined && 
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
                                    {errors.descricao?.message}
                                </span>
                                )}
                        </div>
                        <div style={{textAlign: "end"}}>
                            <input 
                                type="button"
                                onClick={() => {
                                    reset()
                                }}
                                value="Limpar"
                                className="br-button secondary"
                            />
                            <input 
                                type="submit"
                                value="Publicar"
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