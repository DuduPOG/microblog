import Header from "../../components/Header";
import BotaoVoltar from "../../components/Botao-Voltar";

function Sobre() {
    return (
    <>
    <Header/>
    <div className="container">
        <h1>Sobre nós!</h1>
        <div className="row">
            <div className="col-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.     
            </p>
            </div>
        </div>
    </div>
    <BotaoVoltar/>
    </>
    )
}

export default Sobre;