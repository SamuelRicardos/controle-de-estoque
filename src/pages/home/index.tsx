import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Card from "../../components/card"
import Header from "../../components/header"
import Modal from "react-modal"
import "./styles.css"
import axios from "axios";
import Sidebar from "../../components/sidebar";

export interface Produto {
    _id: string
    nome: string
    preco: string
    descricao: string
    url_imagem: string
    fornecedor: string
}

Modal.setAppElement('#root');

export default function Home() {

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [descricao, setDescricao] = useState("")
    const [imagem, setImagem] = useState("")
    const [isLoading, setIsLoading] = useState(true);


    async function getProducts() {
        setIsLoading(true);
        try {
            const response = await axios.get("https://api-produtos-unyleya.vercel.app/produtos");
            setProdutos(response.data);
        } catch (error) {
            alert("Erro ao buscar produtos => " + error);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!fornecedor) {
            alert("Por favor, selecione um fornecedor.");
            return;
        }

        try {
            await axios.post("https://api-produtos-unyleya.vercel.app/produtos",
                {
                    "nome": nome,
                    "preco": preco,
                    "fornecedor": fornecedor,
                    "url_imagem": imagem,
                    "descricao": descricao
                }
            );
            getProducts();
            setIsOpenModal(false)
            limparEstados()
            alert("Produto cadastrado com sucesso")
        } catch (error) {
            alert("Houve um erro ao cadastrar o produto" + error);
        }

    }

    function limparEstados() {
        setNome("")
        setDescricao("")
        setFornecedor("")
        setImagem("")
        setPreco("")
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="home-container">
                <main>
                    <h2 className="title">Produtos em Estoque</h2>
                    <div className="cards-grid">
                        {isLoading ? (
                            Array(7).fill(0).map((_, i) => (
                                <div key={i} className="card">
                                    <Skeleton height={200} />
                                    <h3><Skeleton width={200} /></h3>
                                    <p><Skeleton width={200} /></p>
                                </div>
                            ))
                        ) : (
                            produtos.map(product => (
                                <Card
                                    key={product._id}
                                    id={product._id}
                                    fornecedor={product.fornecedor}
                                    url_imagem={product.url_imagem}
                                    nome={product.nome}
                                    preco={product.preco}
                                />
                            ))
                        )}
                    </div>
                    <button className="add-button" onClick={() => setIsOpenModal(true)}>+</button>

                    <Modal
                        isOpen={isOpenModal}
                        onRequestClose={() => setIsOpenModal(false)}
                        className="modal-content"
                        overlayClassName="modal-overlay"
                    >
                        <h1>Cadastrar produto</h1>
                        <form className="modal-form" onSubmit={saveProduct}>
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
                                <button type="submit" className="btn-confirm">Cadastrar</button>
                            </div>
                        </form>
                    </Modal>
                </main>
            </div>
        </div>
    );
}
