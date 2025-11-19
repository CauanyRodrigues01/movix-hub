import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Clients.module.css';

function Clients() {

    return (
        <div className={styles.clientsContainer}>
            <PageHeader 
                title="Monitore Clientes Movix"
                description="Gerencie e acompanhe os clientes da Movix."
            />
        </div>
    )

}

export default Clients;