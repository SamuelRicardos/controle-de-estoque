import Card from "../../components/card"
import Header from "../../components/header"
import "./styles.css"

const products = [
    {
        id: "12",
        name: "Echo dots1",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg",
        price: 799,
        brand: "Amazon"
    },
    {
        id: "13",
        name: "Echo dots2",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg",
        price: 799,
        brand: "Amazon"
    },
    {
        id: "14",
        name: "Echo dots3",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg",
        price: 799,
        brand: "Amazon"
    },
    {
        id: "15",
        name: "Echo dots4",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg",
        price: 799,
        brand: "Amazon"
    },
]

export default function Home() {
    return (
        <div className="container_home">
            <Header />
            <h1>Produtos</h1>
            <div className="list_cards">
                {products.map((product) => (
                    <Card key={product.id} brand={product.brand} img={product.img} name={product.name} price={product.price} />
                ))}
            </div>
                <button className="float_button">+</button>
        </div>
    )
}