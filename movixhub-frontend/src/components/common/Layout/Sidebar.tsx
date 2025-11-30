import { useEffect, useState } from "react";
import Styles from "./Layout.module.css";
import { SidebarItem } from "./SidebarItem";

export interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
};

export const Sidebar = ({ onCollapseChange }: SidebarProps) => {

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
  // === Collapsed (Colapsado): É o estado em que a barra lateral está recolhida (estreita), mostrando apenas os ícones para economizar espaço.

  // === Drawer: é a barra lateral que desliza para dentro da tela (250px de largura) quando é aberta, cobrindo o conteúdo principal.
  // No DESKTOP, a navegação é sempre visível e persistente; o Sidebar apenas Colapsa (diminui a largura), mas não é escondido nem se sobrepõe ao conteúdo principal da tela.

  return (

    <>

      {/* BACKDROP: É a sobreposição semitransparente que cobre o conteúdo principal quando o Drawer está aberto, usada para fechar o Drawer com um clique e focar o usuário.*/}
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
};