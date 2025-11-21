import { useEffect, useState } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import Styles from "./Sidebar.module.css";

type SidebarProps = {
  onCollapseChange?: (collapsed: boolean) => void;
}

function Sidebar({ onCollapseChange }: SidebarProps) {

  // Função para definir o estado inicial baseado no tamanho da tela
  const getInitialCollapsedState = () => {
    // Retorna FALSE (NÃO colapsado = ABERTO) se for Desktop (>= 768px).
    // Retorna TRUE (colapsado = SÓ ÍCONES) se for Mobile (< 768px).
    return window.innerWidth < 768;
  };

  // Inicializa o estado com a função dinâmica
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState);

  // Informa o layout sempre que colapsar/descolapsar
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange])

  const sidebarClasses = `
    ${Styles.sidebar}
    ${isCollapsed ? Styles.collapsed : ""}
    ${window.innerWidth < 768 && !isCollapsed ? Styles.drawerOpen : ""}
  `;
  // Adiciona drawerOpen só em mobile (abaixo de 768px) e quando NÃO está colapsado (ou seja, quando está aberto)
  // NOTA: Em mobile, quando 'isCollapsed' é 'true', a barra tem 60px e fica visível (mobile: só ícones)
  // Quando 'isCollapsed' é 'false', a barra tem 250px e fica visível (mobile: menu aberto/drawer)
  // A lógica de esconder (left: -250px) deve ficar no CSS base, e ser cancelada pelo 'drawerOpen'.

  return (

    <>

      {/* BACKDROP do Drawer: só aparece em mobile E quando a barra NÃO está colapsada (aberta) */}
      {window.innerWidth < 768 && !isCollapsed && (
        <div className={Styles.backdrop} onClick={() => setIsCollapsed(true)} />
      )}

      <aside className={sidebarClasses}>

        {/* Botão para abrir/fechar o Sidebar (em mobile) ou colapsar/descolapsar (em desktop) */}
        <button
          className={Styles.toggleButton}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <i className="bi bi-list"></i>
        </button>

        <nav className={Styles.navbar}>

          <SidebarItem to="/dashboard" title="Dashboard" icon="bi-speedometer2" end={true} />
          <SidebarItem to="/fretes" title="Serviços de Fretes" icon="bi-truck" />
          <SidebarItem to="/promocoes" title="Promoções" icon="bi-bookmark-star" />
          <SidebarItem to="/motoristas" title="Motoristas" icon="bi-person-vcard" />
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