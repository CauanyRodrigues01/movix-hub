import { Link } from "react-router-dom";

import Styles from "./Sidebar.module.css";

function Sidebar() {
    return (
        
      <nav className={Styles.navBar}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/fretes">Fretes</Link>
        <Link to="/promocoes">Promoções</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/configuracoes">Configurações</Link>
        <Link to="/ajuda">Ajuda</Link>
      </nav>
    
    );
}

export default Sidebar;