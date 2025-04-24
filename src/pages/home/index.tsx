import Card from "../../components/card"
import Header from "../../components/header"
import "./styles.css"

const products = [
    { id: "12", name: "Echo Dot 1", img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg", price: 799, brand: "Amazon" },
    { id: "13", name: "Echo Dot 2", img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg", price: 799, brand: "Amazon" },
    { id: "14", name: "Echo Dot 3", img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg", price: 799, brand: "Amazon" },
    { id: "15", name: "Echo Dot 4", img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg", price: 799, brand: "Amazon" },
];

export default function Home() {
    return (
        <div>
            <Header />
            <div className="home-container">
                <main>
                    <h2 className="title">Produtos em Estoque</h2>
                    <div className="cards-grid">
                        {products.map(product => (
                            <Card key={product.id} {...product} />
                        ))}
                    </div>
                    <button className="add-button">+</button>
                </main>
            </div>
        </div>
    );
}
