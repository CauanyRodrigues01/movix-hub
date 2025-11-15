import { useEffect, useState } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import Styles from "./Sidebar.module.css";

type SidebarProps = {
  onCollapseChange?: (collapsed: boolean) => void;
}

function Sidebar({ onCollapseChange } : SidebarProps) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Informa o layout sempre que colapsar/descolapsar
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange])

  // Fechar Drawer ao aumentar a tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClasses = `
  
    ${Styles.sidebar}
    ${isCollapsed ? Styles.collapsed : ""}
    ${isDrawerOpen ? Styles.drawerOpen : Styles.drawerClosed}

  `;

  return (

    <>

      {/* BACKDROP do Drawer */}
      {isDrawerOpen && (
        <div className={Styles.backdrop} onClick={() => setIsDrawerOpen(false)} />
      )}

      <aside className={sidebarClasses}>

        {/* Botão para abrir/fechar o Drawer em telas pequenas */}
        <button
          className={Styles.toggleButton}
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsDrawerOpen(!isDrawerOpen);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
        >
          <i className="bi bi-list"></i>
        </button>

        <nav className={Styles.navbar}>

          <SidebarItem to="/dashboard" title="Dashboard" icon="bi-speedometer2" end={true} />
          <SidebarItem to="/fretes" title="Serviços de Fretes" icon="bi-truck" />
          <SidebarItem to="/promocoes" title="Promoções" icon="bi-bookmark-star" />
          <SidebarItem to="/clientes" title="Clientes" icon="bi-person" />
          <SidebarItem to="/usuarios" title="Equipe Interna" icon="bi-people" />
          <SidebarItem to="/configuracoes" title="Configurações" icon="bi-gear" />
          <SidebarItem to="/ajuda" title="Ajuda" icon="bi-question-circle" />
        </nav>

        {/* Exemplo de Dropdown, se necessário: */}
        {/* <SidebarItem title="Relatórios" icon="bi-bar-chart-line">
          <NavLink to="/relatorios/vendas" className={Styles.subLink}>Vendas</NavLink>
          <NavLink to="/relatorios/clientes" className={Styles.subLink}>Clientes</NavLink>
        </SidebarItem> */}

      </aside>

    </>

  );
}

export default Sidebar;