import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Settings.module.css';

function Settings() {
    return (
        <div className={styles.settingsContainer}>
            <PageHeader 
                title="Configurações"
                description="Personalize as configurações do sistema e suas preferências."
            />
            <h1></h1>
            <p></p>
        </div>
    )
}

export default Settings;