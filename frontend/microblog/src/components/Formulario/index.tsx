import BotaoVoltar from "../Botao-Voltar"
import Header from "../Header"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import loginService from "../../services/loginService";
import { data } from "react-router-dom";

const schema = yup.object().shape({
        username: yup.string()
                .required("Você precisa colocar um username válido para entrar no sistema!"),
                senha: yup.string().required("Você precisa da senha para entrar no sistema!"),
});

export default function Formulario() : any {

    function Login(data: any) {
        loginService.logar(data);
    }

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const dataHandler = (data: any) => console.log(data);
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
                    <h1>Login</h1>
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
                        <div className={`br-input mb-3 ${errors.senha !== undefined ? "danger" : ""}`}>
                            <input
                                id="senha"
                                type="senha"
                                placeholder="Senha"
                                {...register("senha")}
                                />
                                {
                                errors.senha !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.senha?.message}
                                </span>
                                )}
                        </div>
                        <input type="submit" value="Entrar" onClick={Login(data)} className="br-button primary block warning"/>
                    </form>
                </div>
            </div>
        </div>
        <BotaoVoltar/>
        </>
    )
}
