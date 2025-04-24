import "./styles.css"

interface CardProps {
    nome: string;
    url_imagem: string;
    fornecedor: string;
    preco: string;
}

export default function Card({ nome, url_imagem, fornecedor, preco }: CardProps) {
    return (
        <div className="card-container">
            <img src={url_imagem} alt={nome} className="card-image"/>
            <h3 className="card-title">{nome}</h3>
            <p className="card-brand">{fornecedor}</p>
            <p className="card-price">R$ {preco}</p>
        </div>
    );
}
