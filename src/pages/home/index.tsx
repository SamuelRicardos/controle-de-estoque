import {useEffect, useState} from "react"
import Card from "../../components/card"
import Header from "../../components/header"
import "./styles.css"
import axios from "axios";

interface Produto {
    _id:string
    nome: string
    preco: string
    descricao: string
    url_imagem: string
    fornecedor: string
}

export default function Home() {
    
    const [produtos, setProdutos] = useState<Produto[]>([]);

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
                    <button className="add-button">+</button>
                </main>
            </div>
        </div>
    );
}
