import BotaoVoltar from "../../components/Botao-Voltar";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import CharactersService from "../../services/CharactersService";

interface IPersonagem {
    image: string;
    name: string;
}

export default function Home() {

    const [personagens, setPersonagens] = useState<any[]>([]);

    const disney: any = "https://upload.wikimedia.org/wikipedia/commons/6/64/Disney%2B_2024.svg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original";

    function handleData() {
        /*axiosInstance
        .get(`/characters`)
        .then((res) => {
            console.log(res.data);
        });
        */
       CharactersService.listarPersonagens()
       .then((res) => {
        const { data } = res;
            console.log(data);
            setPersonagens(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {handleData()}, []);

    // Conversão de tipo diferenciado
    // let algumValor: any = "isso aqui é uma string";
    // let comprimentoString: number = (algumValor as string).length;

    return ( 
        <>
            <Header/>
            <h1>Home</h1>
            <BotaoVoltar/>
            <br></br>
            <div className="row">
            {personagens.map((personagem: any) => {
                return (
                    <>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="br-card h-fixed w-fixed hover">
                            <div className="card-content d-flex justify-content-center">
                                {personagem.imageUrl === undefined && (
                                    <img src={disney} style={{width: "auto", height: "100px"}} className="" />
                                )}
                                    <img src={personagem.imageUrl} style={{width: "auto", height: "100px"}} className="" />
                            </div>
                            <div className="card-content row justify-content-center">
                                <p>{personagem.name}</p>
                            </div>
                        </div>
                    </div>
                    </>
                    );
                })}
            </div>
        </>
    );
}