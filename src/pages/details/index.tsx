import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Produto } from "../home";

export default function Details() {

    const params = useParams();

    const [product, setProduct] = useState<Produto>({} as Produto);

    async function getDetailsProduct() {
        const response = await axios.get(`https://api-produtos-unyleya.vercel.app/produtos/${params.id}`)

        setProduct(response.data)
    }

    useEffect(() =>{
        getDetailsProduct()
    }, [])

    return (
        <div>
            <h1>{product.nome} <button>Apagar</button><button>Editar</button></h1>
            <img src={product.url_imagem} />
            <p>{product.fornecedor}</p>
            <p>{product.preco}</p>
            <p>{product.descricao}</p>
        </div>
    );
}