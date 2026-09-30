import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import usuarioService from "../../services/usuarioService";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import publicacaoService from "../../services/publicacaoService";

const schema = yup.object().shape({
        titulo: yup
                .string()
                .required("O Título é necessário")
                .max(200, 'O Título não pode ter mais de 200 caracteres'),
        imagem: yup
                .mixed()
                .test('fileType', 'Apenas arquivos de imagem são permitidos', (arq) => {
                    if(!arq || !(arq instanceof FileList) || arq.length === 0) {
                        return false;
                    }
                    const file = arq[0];
                    return file.type.startsWith('image/');
                }),
        descricao: yup
                   .string()
                   .required("A descrição é necessária")
                   .max(1200, "A descrição não pode ter mais de 1200 caracteres"),
        publicado_em: yup
                      .date()
                      .default(new Date())
});


export default function FormPublicacao() {

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

    const dataHandler = async (data: any) => {
        const bd = await publicacaoService.create(data);
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
                        <div className={`br-input mb-3 ${errors.titulo !== undefined ? "danger" : ""}`}>
                            <input 
                                id="titulo"
                                type="text"
                                placeholder="Título"
                                {...register("titulo")}
                                />
                                {
                                errors.titulo !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.titulo?.message}
                                </span>
                                )}
                                
                        </div>
                        <div className={`mb-3 ${errors.imagem !== undefined ? "danger" : ""}`}>
                            <label>Imagem</label>
                            <br></br>
                            <input 
                                id="imagem"
                                type="file"
                                accept="image/*"
                                placeholder="Imagem"
                                {...register("imagem")}
                                />
                                {
                                errors.imagem !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.imagem?.message}
                                </span>
                                )}
                                
                        </div>
                        <div className={`br-input mb-3 ${errors.descricao !== undefined ? "danger" : ""}`}>
                            <input
                                id="descricao"
                                type="text"
                                placeholder="Descrição"
                                {...register("descricao")}
                                />
                                {
                                errors.descricao !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.descricao?.message}
                                </span>
                                )}
                        </div>
                        <div className={`br-input mb-3`}>
                            <input
                                id="publicado_em"
                                type="date"
                                placeholder="Data de Publicação"
                                {...register("publicado_em")}
                                />
                                {
                                errors.publicado_em !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.publicado_em?.message}
                                </span>
                                )}
                        </div>
                        <input type="submit" value="Publicar" className="br-button primary block warning"/>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}