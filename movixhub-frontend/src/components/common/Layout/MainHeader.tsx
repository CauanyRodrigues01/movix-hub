import Styles from "./Layout.module.css";

export const MainHeader = () => {
    return (
        <header className={Styles.headerContainer}>
            <i className="bi bi-bell"></i>
            <p>Perfil</p>
        </header>
    );
};