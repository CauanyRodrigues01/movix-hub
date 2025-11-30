import { PageHeader } from '../../components/common/Layout';
import Styles from './Settings.module.css';

export const Settings = () => {
    return (
        <div className={Styles.settingsContainer}>
            <PageHeader 
                title="Configurações"
                description="Personalize as configurações do sistema e suas preferências."
            />
            <h1></h1>
            <p></p>
        </div>
    )
};