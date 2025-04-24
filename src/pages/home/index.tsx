import Header from "../../components/header"
import "./styles.css"

export default function Home() {
    return (
        <div className="container_home">
            <Header />
            <h1>Produtos</h1>

            <div className="card">
                <h3>Echo Dot (8 geracao)</h3>

                <img src="https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX425_.jpg"/>

                <p>Amazon</p>
                <p>R$ 700,99</p>
            </div>
        </div>
    )
}