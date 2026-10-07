import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CadastroService from "../../services/CadastroService";
import { Link, useNavigate } from "react-router-dom";
import logoPnp from "../../assets/logo-pnp.png";
import "./cadastro.css";
import { FormCadastroSubmit } from "../../models/FormCadastro";

const schema: yup.ObjectSchema<FormCadastroSubmit> = yup.object().shape({
        username: yup.string()
                .required("Username deve ser preenchido"),
        nome: yup.string()
                .required("Nome deve ser preenchido"),
        password: yup.string().required("Informe uma senha."),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password")], "As senhas devem ser iguais!")
            .required("Confirme sua senha.")
});

export default function FormCadastro() : JSX.Element {

    const navigate = useNavigate();
    const [cadastroError, setCadastroError] = useState<string | null>(null);

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const dataHandler = async ({ confirmPassword, ...data }: any) => {
        setCadastroError(null);
        try {
            await CadastroService.cadastrar(data);
            navigate("/login", { replace: true });
        } catch (error: unknown) {
            setCadastroError("Não foi possível realizar o cadastro. Tente novamente.");
        }
    }
    const errorHandler = (errors: any) => {
        console.log(errors);
        console.log("Os campos obrigatórios devem ser preenchidos e corretamente!");
    };

    const campo = (
        id: "username" | "nome" | "password" | "confirmPassword",
        label: string,
        type: string,
        placeholder: string,
    ) => (
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
    );

    return (
        <div className="cadastro-page d-flex justify-content-center align-items-center">
            <section className="cadastro-card d-flex" aria-labelledby="cadastro-titulo">
                <div className="cadastro-brand d-none d-md-flex justify-content-center align-items-center">
                    <img src={logoPnp} alt="Ícone PNP"/>
                </div>
                <div className="cadastro-form d-flex flex-column align-items-center justify-content-center">
                    <div className="cadastro-form-inner">
                        <h1 id="cadastro-titulo" className="cadastro-titulo" style={{textAlign: "center"}}>Cadastre-se</h1>
                        <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                            {cadastroError && <p className="feedback danger" role="alert">{cadastroError}</p>}
                            {campo("username", "Username", "text", "Username")}
                            {campo("nome", "Nome", "text", "Nome")}
                            {campo("password", "Senha", "password", "Senha")}
                            {campo("confirmPassword", "Confirme a senha", "password", "Confirme a senha")}
                            <input 
                                type="submit" 
                                value={isSubmitting ? "Criando..." : "Criar"}
                                className="br-button primary large block cadastro-submit"
                                disabled={isSubmitting}
                            />
                        </form>
                        <Link 
                            to="/login"
                            className="cadastro-login-link d-block text-center mt-3"
                        >
                            Já tenho <strong>conta</strong>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
