import "./styles.css"

export default function Header() {
    return (
        <header className="header-container">
            <h1 className="header-title">UnyProducts</h1>
            <nav>
                <ul className="header-menu">
                    <li>Produtos</li>
                    <li>Quem somos</li>
                    <li>Sair</li>
                </ul>
            </nav>
        </header>
    );
}
