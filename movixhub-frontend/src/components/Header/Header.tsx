import Styles from "./Header.module.css";

function Header() {
    return (
        <header className={Styles.headerContainer}>
            <i className="bi bi-bell"></i>
            <p>Perfil</p>
        </header>
    );
};

export default Header;