import { useEffect, useState } from "react";
import PublicacaoService from "../../services/PublicacaoService";
import imgPadrao from "../../assets/image.png";
import Botao from "../BrBotao";
import { useNavigate } from "react-router-dom";
import { PublicacaoDetalhe } from "../../models/PublicacaoDetalhe";

export default function Publicacoes(){
    
    const [publicacoes, setPublicacoes] = useState<PublicacaoDetalhe[]>([]);

    const navigate = useNavigate();
    
    function handleData() {
        PublicacaoService.getAll()
        .then((res: PublicacaoDetalhe[]) => {
            console.log(res);
            setPublicacoes(res);
        })
        .catch((error: any) => {
            console.error("Não foi possível puxar a publicação", error)
        });
    }

    function detalhar(publicacaoId: number) {
        navigate(`/publicacoes/${publicacaoId}/`);
    }

    useEffect(() => {
        handleData();
    }, []);


    return (
        <>
        <div className="mt-10" style={{textAlign: "end"}}>
            <h1 style={{textAlign: "center"}} >Feed de Publicações</h1>
            <Botao
                label="Adicionar Publicação" 
                action={() => {
                    navigate("/nova-publicacao")}} 
                className="br-button primary m-5"
            />
        </div>
            <div className="row">
            {publicacoes.map((publicacao: PublicacaoDetalhe) => {
                return (
                    <>
                    <div className="col-sm-6 col-md-4 col-lg-3" key={publicacao.id}>
                        <div className="br-card hover" style={{width: "auto", height: "auto"}}>
                            <div className="card-header">
                                <div className="d-flex">
                                    <span className="br-avatar mt-1" title="autor">
                                        <span className="content bg-orange-vivid-30 text-pure-0">
                                            {publicacao.autor?.username[0].toUpperCase()}
                                        </span>
                                    </span>
                                   <div className="ml-3">
                                        <div className="text-weight-semi-bold text-up-02">{publicacao.autor?.username}</div>
                                    </div>
                                    <div className="ml-auto">
                                        <div style={{textAlign: "end"}}>
                                            <Botao 
                                                label=""
                                                action={() => {
                                                    detalhar(publicacao.id)}}
                                                className="br-button primary circle mt-3 mr-3"
                                                icon="fa fa-ellipsis-v"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content d-flex justify-content-center">
                                <img
                                    src={publicacao.imagem || imgPadrao}
                                    alt={publicacao.imagem ? publicacao.titulo : "Publicação sem imagem"}
                                    style={{textAlign: "center", maxHeight: "150px"}}
                                />
                            </div>
                            <div className="card-content justify-content-center">
                                <h2>{publicacao.titulo}</h2>
                                <p>{publicacao.descricao}</p>
                            <div style={{textAlign: "center"}}>
                                <Botao
                                    label="Comentar"
                                    action={() => {
                                        navigate(`/comentarios/${publicacao.id}`)}}
                                    className="br-button warning m-3"
                                />
                            </div>    
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