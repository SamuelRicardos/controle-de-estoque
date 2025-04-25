import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Modal from "react-modal"
import { Produto } from "../home";

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

    async function getDetailsProduct() {
        const response = await axios.get(`https://api-produtos-unyleya.vercel.app/produtos/${params.id}`)

        setProduct(response.data)
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
        } catch(error) {
            alert("Erro ao remover produto: " + error)
        }
    }

    useEffect(() => {
        getDetailsProduct()
    }, [])

    return (
        <div>
            <h1>{product.nome} 
                <button onClick={() => setIsDeleteOpenModal(true)}>Apagar</button>
                <button onClick={() => {setIsOpenModal(true); setNome(product.nome); setDescricao(product.descricao); setFornecedor(product.fornecedor); setImagem(product.url_imagem); setPreco(product.preco) }}>Editar</button></h1>
            <img style={{ width: 300 }} src={product.url_imagem} />
            <p>{product.fornecedor}</p>
            <p>{product.preco}</p>
            <p>{product.descricao}</p>

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

            <Modal className="modal-content" isOpen={isDeleteOpenModal} onRequestClose={() => setIsDeleteOpenModal(false)}>
                <h3>Confirmar exclusão</h3>
                <p>Deseja realmente excluir o item?</p>
                <button onClick={removeProduct}>Sim</button>
                <button onClick={() => setIsDeleteOpenModal(false)}>Não</button>
            </Modal>
        </div>
    );
}