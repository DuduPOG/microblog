import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import usuarioService from "../../services/usuarioService";
import { useEffect } from "react";

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
        autor: yup
               .string()
               .required("O autor é necessário"),
        publicado_em: yup
                      .date()
                      .default(new Date())
});


export default function FormPublicacao() {

    async function getAutores() {
        const autores = await usuarioService.getAll();
        console.log(autores);
        return autores;
    }

    useEffect(() => {getAutores()}, [])

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const dataHandler = (data: any) => {
        console.log(data);
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
                        <div className={`br-input mb-3 ${errors.autor !== undefined ? "danger" : ""}`}>
                            <label htmlFor="autor">Autor</label>
                            <br></br>
                            <select
                                id="autor"
                                {...register('autor')}
                                aria-placeholder="Autor"
                            >
                                <option>Dudu</option>
                            </select>

                            {/**
                             * 
                            <input
                                id="autor"
                                type="radio"
                                placeholder="Autor"
                                {...register("autor")}
                                />
                                {
                                errors.autor !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.autor?.message}
                                </span>
                                )}
                                
                                //exe,plo da IA como referência
                                <label htmlFor="author">Selecionar Autor:</label>
                                <select id="author" {...register('authorId')} style={{ width: '100%', padding: '5px' }}>
                                <option value="">-- Escolha um usuário --</option>
                                {mockUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                    {user.name}
                                    </option>
                                ))}
                                </select>
                             */}
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