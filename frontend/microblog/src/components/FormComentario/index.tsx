import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import usuarioService from "../../services/usuarioService";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import comentarioService from "../../services/comentarioService";

const schema = yup.object().shape({
        mensagem: yup
                .string()
                .required("A mensagem é necessária")
                .max(400, 'A mensagem não pode ter mais de 400 caracteres'),
});


export default function FormComentario(props: IComentarioProps) {


    const { publicacao } = props;
    const { user } = useAuth();
    const id = user?.id;
    
    useEffect(() => {
        if (id === undefined) return;

        usuarioService.getId(id)
            .then((usuario) => console.log(usuario))
            .catch((error) => console.error("Não foi possível buscar o usuário logado.", error));
    }, [id]);

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const dataHandler = async (data: { mensagem: string}) => {
        const bd = await comentarioService.create(publicacao, data);
        console.log(bd);
    }
    const errorHandler = (errors: any) => {
        console.log(errors);
        console.log("Os campos obrigatórios devem ser preenchidos e corretamente!");
    };

    return (
        <>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="grid col-10">
                    <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                        <div className={`br-input mb-3 ${errors.mensagem !== undefined ? "danger" : ""}`}>
                            <input 
                                id="mensagem"
                                type="text"
                                placeholder="Insira um comentário"
                                {...register("mensagem")}
                                />
                                {
                                errors.mensagem !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.mensagem?.message}
                                </span>
                                )}
                                
                        </div>
                        <input type="submit" value="Comentar" className="br-button primary block warning"/>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}