import "./styles.css"
import { Link } from "react-router-dom"

interface CardProps {
    id: string;
    nome: string;
    url_imagem: string;
    fornecedor: string;
    preco: string;
}

export default function Card(props: CardProps) {
    return (
        <Link to={`/details/${props.id}`} className="card-container">
            <div >
                <img src={props.url_imagem} alt={props.nome} className="card-image" />
                <h3 className="card-title">{props.nome}</h3>
                <p className="card-brand">{props.fornecedor}</p>
                <p className="card-price">R$ {props.preco}</p>
            </div>
        </Link>
    );
}
