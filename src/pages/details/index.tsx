import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { FaArrowRightToBracket  } from "react-icons/fa6";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from "react-modal"
import { Produto } from "../home";
import "./styles.css"

Modal.setAppElement('#root');

export default function Details() {

    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Produto>({} as Produto);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isDeleteOpenModal, setIsDeleteOpenModal] = useState(false)
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [descricao, setDescricao] = useState("")
    const [imagem, setImagem] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    async function getDetailsProduct() {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api-produtos-unyleya.vercel.app/produtos/${params.id}`);
            setProduct(response.data);
        } catch (error) {
            alert("Erro ao buscar produto: " + error);
        } finally {
            setIsLoading(false);
        }
    }

    async function editProduct(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            await axios.put(`https://api-produtos-unyleya.vercel.app/produtos/${params.id}`, {
                "nome": nome,
                "preco": preco,
                "fornecedor": fornecedor,
                "url_imagem": imagem,
                "descricao": descricao
            })

            setIsOpenModal(false)
            getDetailsProduct();
            alert("Produto editado com sucesso")
        } catch (error) {
            alert("Erro ao editar produto => " + error);
        }
    }

    async function removeProduct() {
        try {
            await axios.delete(`https://api-produtos-unyleya.vercel.app/produtos/${params.id}`)
            setIsDeleteOpenModal(false)
            navigate("/")
        } catch (error) {
            alert("Erro ao remover produto: " + error)
        }
    }

    useEffect(() => {
        getDetailsProduct()
    }, [])

    return (
        <div className="container_geral">
            <div className="container_produto">
                <div className="header-produto">
                            <div className="voltar-container">
                                <Link to="/" className="btn-voltar">
                                <FaArrowRightToBracket  />
                                </Link>
                            </div>
                    <div className="topo-botoes">
                        <div className="botoes-acao">
                            <button className="icon-button icon-button-delete" onClick={() => setIsDeleteOpenModal(true)}>
                                <FaTrash size={18} />
                            </button>
                            <button
                                className="icon-button icon-button-edit"
                                onClick={() => {
                                    setIsOpenModal(true);
                                    setNome(product.nome);
                                    setDescricao(product.descricao);
                                    setFornecedor(product.fornecedor);
                                    setImagem(product.url_imagem);
                                    setPreco(product.preco);
                                }}
                            >
                                <FaEdit size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="produto-detalhes">
                        <Skeleton height={300} width={300} />
                        <div className="produto-info">
                            <p><strong>Nome:</strong> <Skeleton width={180} /></p>
                            <p><strong>Fornecedor:</strong> <Skeleton width={150} /></p>
                            <p><strong>Valor:</strong> <Skeleton width={100} /></p>
                            <p><strong>Descrição:</strong> <Skeleton count={3} /></p>
                        </div>
                    </div>
                ) : (
                    <div className="produto-detalhes">
                        <img className="produto-imagem" src={product.url_imagem} alt={product.nome} />
                        <div className="produto-info">
                            <p><strong>Nome:</strong> {product.nome}</p>
                            <p><strong>Fornecedor:</strong> {product.fornecedor}</p>
                            <p><strong>Valor:</strong> R$ {product.preco}</p>
                            <p><strong>Descrição:</strong> {product.descricao}</p>
                        </div>
                    </div>
                )}

                <Modal
                    isOpen={isOpenModal}
                    onRequestClose={() => setIsOpenModal(false)}
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h1>Editar produto</h1>
                    <form className="modal-form" onSubmit={editProduct}>
                        <input type="text" placeholder="Nome do produto" value={nome} onChange={(event) => setNome(event.target.value)} />
                        <input type="text" placeholder="Preço" value={preco} onChange={(event) => setPreco(event.target.value)} />
                        <select value={fornecedor} onChange={(event) => setFornecedor(event.target.value)}>
                            <option value="" disabled hidden>Selecione o fornecedor</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Fornecedor 2">Fornecedor 2</option>
                        </select>
                        <input type="text" placeholder="URL da imagem" value={imagem} onChange={(event) => setImagem(event.target.value)} />
                        <input type="text" placeholder="Descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)} />

                        <div className="modal-buttons">
                            <button type="button" onClick={() => setIsOpenModal(false)} className="btn-cancel">Cancelar</button>
                            <button type="submit" className="btn-confirm">Alterar</button>
                        </div>
                    </form>
                </Modal>

                <Modal className="modal-content" overlayClassName="modal-overlay" isOpen={isDeleteOpenModal} onRequestClose={() => setIsDeleteOpenModal(false)}>
                    <h3>Confirmar exclusão</h3>
                    <p>Deseja realmente excluir o item?</p>
                    <div className="modal-buttons">
                        <button className="btn-cancel" onClick={() => setIsDeleteOpenModal(false)}>Não</button>
                        <button className="btn-confirm" onClick={removeProduct}>Sim</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}