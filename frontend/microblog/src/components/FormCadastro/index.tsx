import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cadastroService from "../../services/cadastroService";
import { useNavigate } from "react-router-dom";
import BotaoLogin from "../Botao-Login";

const schema = yup.object().shape({
        username: yup.string()
                .required("Username deve ser preenchido"),
        nome: yup.string()
                .required("Nome deve ser preenchido"),
        password: yup.string().required('Informe uma senha.'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'As senhas devem ser iguais!')
            .required('Confirme sua senha.'),
});

export default function FormCadastro() : any {

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
            await cadastroService.cadastrar(data);
            navigate('/login', { replace: true });
        } catch (error: unknown) {
            setCadastroError("Não foi possível realizar o cadastro. Tente novamente.");
        }
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
                    <h1>Cadastro</h1>
                    <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                        {cadastroError && <p className="feedback danger" role="alert">{cadastroError}</p>}
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
                        <div className={`br-input mb-3 ${errors.confirmPassword !== undefined ? "danger" : ""}`}>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirmar Senha"
                                {...register("confirmPassword")}
                                />
                                {
                                errors.confirmPassword !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.confirmPassword?.message}
                                </span>
                                )}
                        </div>
                        <input type="submit" value={isSubmitting ? "Cadastrando..." : "Cadastrar"} className="br-button primary block warning" disabled={isSubmitting}/>
                    </form>
                </div>
            </div>
        </div>
        <BotaoLogin/>
        </>
    )
}
