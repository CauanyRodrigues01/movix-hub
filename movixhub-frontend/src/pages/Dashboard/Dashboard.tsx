import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <h1>Dashboard</h1>
            <p>Bem-vindo ao painel de gestão do Movix.</p>
        </div>
    )
}

export default Dashboard;