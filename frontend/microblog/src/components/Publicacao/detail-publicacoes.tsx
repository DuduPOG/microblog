import { useEffect, useState } from "react";
import publicacaoService from "../../services/publicacaoService";
import imgPadrao from "../../assets/image.png";
import Botao from "../Botao";
import { useNavigate } from "react-router-dom";

interface PublicacaoDetalhe {
    id: number;
    titulo: string;
    descricao: string;
    imagem?: string | null;
    autor?: { nome?: string; username?: string } | null;
}

export default function Publicacao(){
    
    const [publicacoes, setPublicacoes] = useState<PublicacaoDetalhe[]>([]);

    const navigate = useNavigate();
    
    function handleData() {
        publicacaoService.getAll()
        .then((res: PublicacaoDetalhe[]) => {
            console.log(res);
            setPublicacoes(res);
        })
        .catch((error: any) => {
            console.error("Não foi possível puxar a publicação", error)
        })
    }

    function detalhar(publicacaoId: number) {
        navigate(`/publicacoes/${publicacaoId}/`);
    }

    useEffect(() => {handleData()}, []);


    return (
        <>
        <h1>Publicações</h1>
            <div className="row">
            {publicacoes.map((publicacao: PublicacaoDetalhe) => {
                return (
                    <>
                    <div className="col-sm-6 col-md-4 col-lg-3" key={publicacao.id}>
                        <div className="br-card h-fixed w-fixed hover">
                            <div className="card-content d-flex justify-content-center">
                                <img
                                    src={publicacao.imagem || imgPadrao}
                                    alt={publicacao.imagem ? publicacao.titulo : "Publicação sem imagem"}
                                    style={{width: "auto", height: "auto"}}
                                />
                             <div className="ml-auto">
                                <Botao label="Detalhar" action={() => detalhar(publicacao.id)} className="br-button primary circle" />
                            </div>
                            </div>
                            <div className="card-content row justify-content-center">
                                <h2>{publicacao.titulo}</h2>
                                <p>{publicacao.descricao}</p>
                            </div>
                            
                            </div>
                        </div>
                    </>
                );
            })}
            </div>
        </>
    )
}