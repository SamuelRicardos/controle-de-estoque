import "./style.css";
import { FaHome, FaBoxOpen, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside className={`sidebar ${isOpen ? "show" : ""}`}>
          <nav className="sidebar-nav">
            <ul>
              <li><FaHome className="sidebar-icon" /><span>Home</span></li>
              <li><FaBoxOpen className="sidebar-icon" /><span>Produtos</span></li>
              <li><FaUsers className="sidebar-icon" /><span>Clientes</span></li>
              <li><FaChartBar className="sidebar-icon" /><span>Relatórios</span></li>
              <li><FaSignOutAlt className="sidebar-icon" /><span>Sair</span></li>
            </ul>
          </nav>
        </aside>
      )
}
