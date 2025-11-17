import { Link } from "react-router-dom";
import Styles from "./Footer.module.css";

function Footer({ isCollapsed } : { isCollapsed: boolean}) {
    return (
        <footer className={`
        
        ${Styles.footer}
        ${isCollapsed ? Styles.collapsedFooter : ""}
        `}>
            <div className={Styles.footerContainer}>
                <div className={Styles.details}>
                    <p>&copy; 2025 MovixHub.</p>
                    <p>Todos os direitos reservados.</p>
                </div>
                <div className={Styles.details}>
                    <p>Feito por <a href="https://www.linkedin.com/in/cauany-rodrigues-78700b193/" target="_blank" rel="noopener noreferrer">Cauany Rodrigues</a></p> 
                    <div className={Styles.circle}></div>
                    <Link to="/ajuda">Documentação</Link>
                </div>

            </div>
        </footer>
    )
}

export default Footer;