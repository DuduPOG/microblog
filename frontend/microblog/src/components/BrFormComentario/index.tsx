import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UsuarioService from "../../services/UsuarioService";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import ComentarioService from "../../services/ComentarioService";
import Botao from "../BrBotao";
import { ComentarioSubmitProps, ComentarioSubmit } from "../../models/Comentario";

const schema : yup.ObjectSchema<ComentarioSubmit> = yup.object().shape({
        mensagem: yup
                .string()
                .required("A mensagem é necessária")
                .max(400, "A mensagem não pode ter mais de 400 caracteres")
});


export default function FormComentario(props: ComentarioSubmitProps) : JSX.Element {

    const { publicacao } = props;
    const { user } = useAuth();
    const id : number | undefined = user?.id;
    
    useEffect(() => {
        if (id === undefined) return;

        UsuarioService.getId(id)
            .then((usuario) => {
                console.log(usuario)
            })
            .catch((error) => {
                console.error("Não foi possível buscar o usuário logado.", error)
            });
    }, [id]);

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    async function dataHandler(data: ComentarioSubmit) : Promise<void> {
        const bd = await ComentarioService.create(Number(publicacao), data);
        await props.onComentarioCriado();
        console.log(bd);
        reset();
    }
    function errorHandler(errors: any) : void {
        console.log(errors);
        console.log("Os campos obrigatórios devem ser preenchidos e corretamente!");
    };



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
                                action={() => {reset()}}
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