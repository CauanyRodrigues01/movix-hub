import { useCallback, useState } from 'react';
import Styles from './SidebarItem.module.css';
import { NavLink } from 'react-router-dom';

type SidebarItemProps = {
    title: string;
    icon: string;
    to?: string; // Opcional: usado para links simples
    children?: React.ReactNode; // Opcional: usado para submenus
    end?: boolean; // Utilizado para correspondência exata do NavLink
};

// Função para determinar as classes CSS com base no estado ativo e se é um dropdown
const getNavLinkClass = ({ isActive }: { isActive: boolean }, isDropdown: boolean) => {
    let classes = isDropdown ? Styles.dropdownToggle : Styles.navLink;
    if (isActive) {
        classes += ` ${Styles.isActive}`;
    }
    return classes;
};

function SidebarItem({ title, icon, to, children, end }: SidebarItemProps) {

    // Define o estado do menu suspenso (aberto/fechado)
    const [isOpen, setIsOpen] = useState(false);

    // Verifica se o item é um menu suspenso (baseado na presença de filhos)
    const isDropdown = !!children;

    // Manipulador para alternar o estado do menu suspenso
    const handleToggle = useCallback(() => {
        if (isDropdown) {
            setIsOpen(prev => !prev);
        }
    }, [isDropdown]);

    if (to) {
        // Render para uma NavLink simples (no children)
        return (
            <NavLink
                to={to}
                className={state => getNavLinkClass(state, false)}
                end={end}
            >
                <i className={`bi ${icon} ${Styles.icon}`}></i>
                <span className={Styles.title}>{title}</span>
            </NavLink>
        );
    }

    if (isDropdown) {
        // Render para um item de menu suspenso
        return (
            <li className={`${Styles.menuItem} ${isOpen ? Styles.open : ''}`}>
                <button
                    className={Styles.dropdownToggle}
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <i className={`bi ${icon} ${Styles.icon}`}></i>
                    <span className={Styles.title}>{title}</span>
                    <i className={`bi bi-chevron-down ${Styles.arrowIcon} ${isOpen ? Styles.open : ''}`}></i>
                </button>

                {/* Dropdown Menu Container */}
                <div className={Styles.dropdownMenu} style={{ maxHeight: isOpen ? '500px' : '0' }}>
                    {children}
                </div>
            </li>
        );
    };

    // Fallback render (caso nenhum 'to' ou 'children' seja fornecido)
    return <div className={Styles.menuItem}>Item Error: Missing 'to' or 'children'</div>;

}

export default SidebarItem;