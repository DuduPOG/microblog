import BotaoVoltar from "../../components/Botao-Voltar"
import Header from "../../components/Header"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
        nome: yup.string().min(3, "O nome deve conter pelo menos 3 caracteres").required("Nome é um campo obrigatório"),
        email: yup.string().max(30, "O email deve conter no máximo 30 caracteres").email().required("Email é um campo obrigatório"),
        telefone: yup.string().max(11, "O telefone deve conter no máximo 11 caracteres"),
        idade: yup.number().positive("A idade precisa ser um número positivo").required("Idade é um campo obrigatório")
});

export default function Formulario() : any {

    const {
        handleSubmit,
        register,
        reset,
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
        <h1>Formulário works!</h1>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <form onSubmit={handleSubmit(dataHandler, errorHandler)}>
                        <div className={`br-input ${errors.nome !== undefined ? "danger" : ""}`}>
                            <label htmlFor="input-default">Nome</label>
                            <input 
                                id="nome"
                                type="text"
                                placeholder="Insira seu nome"
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
                        <div className={`br-input ${errors.email !== undefined ? "danger" : ""}`}>
                            <label htmlFor="input-default">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Insira seu email"
                                {...register("email")}
                                />
                                {
                                errors.email !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.email?.message}
                                </span>
                                )}
                        </div>
                        <div className={`br-input ${errors.telefone !== undefined ? "danger" : ""}`}>
                            <label htmlFor="input-default">Telefone</label>
                            <input
                                id="telefone"
                                type="tel"
                                placeholder="(XX) XXXXX-XXXX"
                                {...register("telefone")}
                                />
                                {
                                errors.telefone !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.telefone?.message}
                                </span>
                                )}
                        </div>
                        <div className={`br-input ${errors.idade !== undefined ? "danger" : ""}`}>
                            <label htmlFor="input-default">Idade</label>
                            <input
                                id="idade"
                                type="number"
                                placeholder="Insira sua idade"
                                {...register("idade")}
                                />
                                {
                                errors.idade !== undefined && 
                                (<span className="feedback danger" role="alert" id="danger">
                                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                                    {errors.idade?.message}
                                </span>
                                )}
                        </div>
                        <input type="submit" value="Enviar" className="br-button primary"/>
                        <input type="button" value="Limpar" className="br-button secundary" onClick={() => {reset()}}/>
                    </form>
                </div>
            </div>
        </div>
        <BotaoVoltar/>
        </>
    )
}
