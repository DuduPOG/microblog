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

export default function Publicacoes(){
    
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
        <div className="row">
        <h1>Feed de Publicações</h1>
        <Botao label="Adicionar Publicação" action={() => navigate('/nova-publicacao')} className="br-button primary mb-3" />
        </div>
            <div className="row">
            {publicacoes.map((publicacao: PublicacaoDetalhe) => {
                return (
                    <>
                    <div className="col-sm-6 col-md-4 col-lg-3" key={publicacao.id}>
                        <div className="br-card hover" style={{width: "300px", height: "300px"}}>
                            <div className="card-content d-flex justify-content-center">
                                <img
                                    src={publicacao.imagem || imgPadrao}
                                    alt={publicacao.imagem ? publicacao.titulo : "Publicação sem imagem"}
                                    style={{width: "auto", maxWidth: "200px", height: "100px", maxHeight: "150px"}}
                                />
                             <div className="ml-auto">
                                <Botao 
                                    label=""
                                    action={() => detalhar(publicacao.id)}
                                    className="br-button primary circle"
                                    icon="fa fa-ellipsis-v"
                                />
                            </div>
                            </div>
                            <div className="card-content row justify-content-center">
                                <h2>{publicacao.titulo}</h2>
                                <p>{publicacao.descricao}</p>
                            <Botao
                                label="Comentar"
                                action={() => navigate(`/comentarios/${publicacao.id}`)}
                                className="br-button warning mb-3" />
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