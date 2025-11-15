import { NavLink } from "react-router-dom";

import Styles from "./Sidebar.module.css";

function Sidebar() {

  const getNavLinkClass = ({ isActive } : { isActive: boolean }) => {
    return isActive ? `${Styles.link} ${Styles.isActive}` : Styles.link;
  };

  return (

    <aside className={Styles.sidebar}>
      <nav className={Styles.navbar}>
        <NavLink to="/dashboard" className={getNavLinkClass} end>
          <i className="bi bi-speedometer2"></i>
          <span>Dashboard</span></NavLink>
        <NavLink to="/fretes" className={getNavLinkClass}>
          <i className="bi bi-truck"></i>
          <span>Serviços de Fretes</span></NavLink>
        <NavLink to="/promocoes" className={getNavLinkClass}>
          <i className="bi bi-bookmark-star"></i>
          <span>Promoções</span></NavLink>
        <NavLink to="/clientes" className={getNavLinkClass}>
          <i className="bi bi-person"></i>
          <span>Clientes</span></NavLink>
        <NavLink to="/usuarios" className={getNavLinkClass}>
          <i className="bi bi-people"></i>
          <span>Equipe Interna</span>
        </NavLink>
        <NavLink to="/configuracoes" className={getNavLinkClass}>
          <i className="bi bi-gear"></i>
          <span>Configurações</span>
        </NavLink>
        <NavLink to="/ajuda" className={getNavLinkClass}>
          <i className="bi bi-question-circle"></i>
          <span>Ajuda</span>
        </NavLink>
      </nav>
    </aside>

  );
}

export default Sidebar;