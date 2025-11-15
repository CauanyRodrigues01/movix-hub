import Styles from "./Header.module.css";

function Header() {
    return (
        <header className={Styles.headerContainer}>
            <p>Notificações</p>
            <p>Perfil</p>
        </header>
    );
};

export default Header;