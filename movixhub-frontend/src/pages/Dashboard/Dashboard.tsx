import { PageHeader } from '../../components/common/Layout';
import Styles from './Dashboard.module.css';

export const Dashboard = () => {
    return (
        <div className={Styles.dashboardContainer}>
            <PageHeader 
                title="Dashboard"
                description="Bem-vindo ao painel de gestão do Movix."
            />
        </div>
    )
};