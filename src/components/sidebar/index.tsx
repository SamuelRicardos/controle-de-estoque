import { FaBoxOpen, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import "./style.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <FaBoxOpen className="sidebar-icon" />
            <span>Produtos</span>
          </li>
          <li>
            <FaUsers className="sidebar-icon" />
            <span>Clientes</span>
          </li>
          <li>
            <FaChartBar className="sidebar-icon" />
            <span>Relatórios</span>
          </li>
          <li>
            <FaSignOutAlt className="sidebar-icon" />
            <span>Sair</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
