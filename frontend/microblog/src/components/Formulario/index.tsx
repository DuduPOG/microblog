import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import BotaoCadastro from "../Botao-Cadastro";
import logoPnp from "../../assets/logo-pnp.png";
import "./login.css"


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

        const campo: any = (
        id: "username" | "password",
        label: string,
        type: string,
        placeholder: string,
    ) => (
        <div className={`br-input large mb-3 ${errors[id] !== undefined ? "danger" : ""}`}>
            <label htmlFor={id} className="cadastro-sr-only">{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id)}
                />
                {
                errors[id] !== undefined &&
                (<span className="feedback danger" role="alert" id={`${id}-erro`}>
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {errors[id]?.message}
                </span>
                )}
        </div>
    );

    return (
        <>
        <div className="login-page d-flex justify-content-center align-items-center">
            <section className="login-card d-flex" aria-labelledby="login-titulo">
                <div className="login-brand d-none d-md-flex justify-content-center align-items-center">
                    <img src={logoPnp} alt="Ícone PNP" />
                </div>
                <div className="login-form d-flex flex-column align-items-center justify-content-center">
                    <div className="login-form-inner">
                        <h1 id="login-titulo" className="login-titulo">Login</h1>
                        <form onSubmit={handleSubmit(dataHandler)}>
                            {loginError && <p className="feedback danger" role="alert">{loginError}</p>}
                            {campo("username", "username", "text", "Username")}
                            {campo("password", "password", "password", "Senha")}
                            <input 
                                type="submit" 
                                value={"Entrar"} 
                                className="br-button primary large block login-submit" 
                                />
                        </form>
                        <Link to='/cadastro' className="cadastro-login-link d-block text-center mt-3">
                            Não tenho <strong>conta</strong>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}
