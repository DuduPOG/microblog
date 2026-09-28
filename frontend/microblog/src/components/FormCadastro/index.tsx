import BotaoVoltar from "../Botao-Voltar"
import Header from "../Header"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cadastroService from "../../services/cadastroService";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
        username: yup.string()
                .required("Você precisa colocar um username válido para entrar no sistema!"),
        nome: yup.string()
                .required("Você precisa colocar um username válido para entrar no sistema!"),
        password: yup.string().required("Você precisa da senha para entrar no sistema!"),
});

export default function FormCadastro() : any {

    const navigate = useNavigate();

    function cadastrar(data: any) {
        cadastroService.cadastrar(data);
        navigate('/login');
    }

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const dataHandler = (data: any) => {
        console.log(data);
        cadastrar(data);
    }
    const errorHandler = (errors: any) => {
        console.log(errors);
        console.log("Os campos obrigatórios devem ser preenchidos e corretamente!");
    };

    return (
        <>
        <Header/>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="grid col-10">
                    <h1>Cadastro</h1>
                    <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                        <div className={`br-input mb-3 ${errors.username !== undefined ? "danger" : ""}`}>
                            <input 
                                id="username"
                                type="text"
                                placeholder="Username"
                                {...register("username")}
                                />
                                {
                                errors.username !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.username?.message}
                                </span>
                                )}
                                
                        </div>
                        <div className={`br-input mb-3 ${errors.nome !== undefined ? "danger" : ""}`}>
                            <input 
                                id="nome"
                                type="text"
                                placeholder="Nome"
                                {...register("nome")}
                                />
                                {
                                errors.nome !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.nome?.message}
                                </span>
                                )}
                                
                        </div>
                        <div className={`br-input mb-3 ${errors.password !== undefined ? "danger" : ""}`}>
                            <input
                                id="password"
                                type="password"
                                placeholder="Senha"
                                {...register("password")}
                                />
                                {
                                errors.password !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.password?.message}
                                </span>
                                )}
                        </div>
                        <input type="submit" value="Cadastrar" className="br-button primary block warning"/>
                    </form>
                </div>
            </div>
        </div>
        <BotaoVoltar/>
        </>
    )
}
