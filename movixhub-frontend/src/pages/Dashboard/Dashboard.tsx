import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <PageHeader 
                title="Dashboard"
                description="Bem-vindo ao painel de gestão do Movix."
            />
        </div>
    )
}

export default Dashboard;