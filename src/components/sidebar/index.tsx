import "./style.css";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-title">Menu</div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <span className="sidebar-icon">🏠</span> Início
          </li>
          <li>
            <span className="sidebar-icon">📦</span> Produtos
          </li>
          <li>
            <span className="sidebar-icon">⚙️</span> Configurações
          </li>
        </ul>
      </nav>
    </aside>
  );
}
