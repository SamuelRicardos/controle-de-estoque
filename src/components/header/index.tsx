import { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./styles.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <h1 className="header-title">SimpleStoqs</h1>

      <button
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <FaBars size={22} />
      </button>

      <nav className={`header-nav ${menuOpen ? "show" : ""}`}>
        <ul className="header-menu">
          <li>Produtos</li>
          <li>Quem somos</li>
          <li>Sair</li>
        </ul>
      </nav>
    </header>
  );
}
