import { FaBars } from "react-icons/fa";
import "./style.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="header-container">
      <h1 className="header-title">SimpleStoqs</h1>

      <button
        className="menu-icon"
        onClick={onToggleSidebar}
        aria-label="Abrir menu"
      >
        <FaBars size={22} />
      </button>
    </header>
  );
}
