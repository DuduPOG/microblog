import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import logoPnp from "../../assets/logo-pnp.png";
import "./login.css"
import { LoginSubmit } from "../../models/Login";

/**
 * Renderiza o formulário de autenticação e solicita o login pelo contexto de autenticação.
 * Username e senha são obrigatórios; após o login, o usuário é encaminhado ao feed.
 *
 * @author
 *  @DuduPOG
 *
 * @param {void} props Este componente não recebe propriedades; username e senha são informados pelo usuário no formulário.
 *
 * @returns {JSX.Element} Elemento JSX do formulário de login e seus estados de validação.
 *
 * @example
 * ```tsx
 * <BrFormLogin />
 * ```
 *
 */

const schema : yup.ObjectSchema<LoginSubmit>= yup.object().shape({
        username: yup.string()
                .required("Você precisa colocar um username válido para entrar no sistema!"),
        password: yup.string().required("Você precisa da senha para entrar no sistema!")
});

const resolver = yupResolver(schema);

export default function BrFormLogin() : JSX.Element {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver
    });

    const dataHandler = useCallback(async (data: LoginSubmit) : Promise<void> => {
        setLoginError(null);
        try {
            await login(data);
            navigate("/publicacoes", { replace: true });
        } catch {
            setLoginError("Não foi possível entrar. Verifique seu usuário e senha.");
        }
    }, [login, navigate]);

    const campo = useCallback((
        id: "username" | "password",
        label: string,
        type: string,
        placeholder: string,
    ) : JSX.Element => (
        <div className={`br-input large mb-3 ${errors[id] !== undefined ? "danger" : ""}`}>
            <label 
                htmlFor={id}
                className="cadastro-sr-only"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id)}
                />
                {
                errors[id] !== undefined &&
                (<span 
                    className="feedback danger"
                    role="alert"
                    id={`${id}-erro`}
                >
                    <i 
                        className="fa fa-times-circle"
                        aria-hidden="true"
                    >
                    </i>
                    {errors[id]?.message}
                </span>
                )}
        </div>
    ), [errors, register]);

    return (
        <>
        <div className="login-page d-flex justify-content-center align-items-center">
            <section className="login-card d-flex" aria-labelledby="login-titulo">
                <div className="login-brand d-none d-md-flex justify-content-center align-items-center">
                    <img src={logoPnp} alt="Ícone PNP"/>
                </div>
                <div className="login-form d-flex flex-column align-items-center justify-content-center">
                    <div className="login-form-inner">
                        <h1 id="login-titulo" className="login-titulo" style={{textAlign: "center"}}>Login</h1>
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
                        <Link 
                            to="/cadastro"
                            className="cadastro-login-link d-block text-center mt-3"
                        >
                            Não tenho <strong>conta</strong>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}
