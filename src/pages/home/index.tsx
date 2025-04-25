import { useEffect, useState } from "react"
import Card from "../../components/card"
import Header from "../../components/header"
import Modal from "react-modal"
import "./styles.css"
import axios from "axios";

interface Produto {
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

    async function getProducts() {
        try {
            const response = await axios.get("https://api-produtos-unyleya.vercel.app/produtos");

            setProdutos(response.data)
        } catch (error) {
            alert("Erro ao buscar produtos => " + error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>
            <Header />
            <div className="home-container">
                <main>
                    <h2 className="title">Produtos em Estoque</h2>
                    <div className="cards-grid">
                        {produtos.map(product => (
                            <Card key={product._id} fornecedor={product.fornecedor} url_imagem={product.url_imagem} nome={product.nome} preco={product.preco} />
                        ))}
                    </div>
                    <button className="add-button" onClick={() => setIsOpenModal(true)}>+</button>

                    <Modal
                        isOpen={isOpenModal}
                        onRequestClose={() => setIsOpenModal(false)}
                        className="modal-content"
                        overlayClassName="modal-overlay"
                    >
                        <h1>Cadastrar produto</h1>
                        <form className="modal-form">
                            <input placeholder="Nome do produto" value={nome} onChange={(event) => setNome(event.target.value)} />
                            <input placeholder="Preço" value={preco} onChange={(event) => setPreco(event.target.value)} />
                            <select value={fornecedor} onChange={(event) => setFornecedor(event.target.value)}>
                                <option value="Fornecedor 1">Fornecedor 1</option>
                                <option value="Fornecedor 2">Fornecedor 2</option>
                            </select>
                            <input placeholder="URL da imagem" value={imagem} onChange={(event) => setImagem(event.target.value)} />
                            <input placeholder="Descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)} />

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
