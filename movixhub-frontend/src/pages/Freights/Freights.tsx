import Button from '../../components/Button/Button';
import Styles from './Freights.module.css';

function Freights() {

    const handleClick = () => {
        alert('Clicou no botão!');
    };

    return (
        <div className={Styles.freightsContainer}>

            <header className={Styles.freightsHeader}>
                <div className={Styles.freightsHeaderDetails}>
                    <h1>Serviços de Frete</h1>
                    <p>Gerencie todos os serviços de frete da Movix</p>
                </div>
                <Button onClick={handleClick}> <i className="bi bi-plus-lg"></i> Novo Serviço</Button>
            </header>
        </div>
    )
}

export default Freights;