import "./styles.css"

interface CardProps {
    name: string;
    img: string;
    brand: string;
    price: number;
}

export default function Card({ name, img, brand, price }: CardProps) {
    return (
        <div className="card-container">
            <img src={img} alt={name} className="card-image"/>
            <h3 className="card-title">{name}</h3>
            <p className="card-brand">{brand}</p>
            <p className="card-price">R$ {price}</p>
        </div>
    );
}
