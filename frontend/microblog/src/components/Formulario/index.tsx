import BotaoVoltar from "../Botao-Voltar"
import Header from "../Header"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const schema = yup.object().shape({
        username: yup.string()
                .required("Você precisa colocar um username válido para entrar no sistema!"),
        password: yup.string().required("Você precisa da senha para entrar no sistema!"),
});

export default function Formulario() : any {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const dataHandler = async (data: { username: string; password: string }) => {
        setLoginError(null);
        try {
            await login(data);
            navigate('/publicacoes', { replace: true });
        } catch {
            setLoginError('Não foi possível entrar. Verifique seu usuário e senha.');
        }
    };

    return (
        <>
        <Header/>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="grid col-10">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(dataHandler)}>
                        {loginError && <p className="feedback danger" role="alert">{loginError}</p>}
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
                        <input type="submit" value={isSubmitting ? "Entrando..." : "Entrar"} className="br-button primary block warning" disabled={isSubmitting}/>
                    </form>
                </div>
            </div>
        </div>
        <BotaoVoltar/>
        </>
    )
}
