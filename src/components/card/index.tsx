import "./styles.css"

interface CardProps {
    name: string;
    img: string;
    brand: string;
    price: number;
}

export default function Card(props: CardProps) {
    return (
        <div className="card">
        <h3>{props.name}</h3>

        <img src={props.img} />

        <p>{props.brand}</p>
        <p>R$ {props.price}</p>
    </div>
    );
}