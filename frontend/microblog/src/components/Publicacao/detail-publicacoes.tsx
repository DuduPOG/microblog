import { useEffect, useState } from "react";
import publicacaoService from "../../services/publicacaoService";
import imgPadrao from "../../assets/image.png";

interface PublicacaoDetalhe {
    id: number;
    titulo: string;
    descricao: string;
    imagem?: string | null;
    autor?: { nome?: string; username?: string } | null;
}

export default function Publicacao(){
    const [publicacao, setPublicacao] = useState<PublicacaoDetalhe | null>(null);
    
    function handleData() {
        publicacaoService.getId(1)
        .then((res: PublicacaoDetalhe) => {
            console.log(res);
            setPublicacao(res);
        })
        .catch((error: any) => {
            console.error("Não foi possível puxar a publicação", error)
        })
    }

    useEffect(() => {handleData()}, []);

    return (
        <>
        <h1>Detalhamento</h1>
            <div className="row">
            {publicacao && (
                <div className="col-sm-6 col-md-4 col-lg-3" key={publicacao.id}>
                    <div className="br-card h-fixed w-fixed hover">
                        <div className="card-content d-flex justify-content-center">
                            <img
                                src={publicacao.imagem || imgPadrao}
                                alt={publicacao.imagem ? publicacao.titulo : "Publicação sem imagem"}
                                style={{width: "auto", height: "100px"}}
                            />
                        </div>
                        <div className="card-content row justify-content-center">
                            <h2>{publicacao.titulo}</h2>
                            <p>{publicacao.descricao}</p>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    )
}