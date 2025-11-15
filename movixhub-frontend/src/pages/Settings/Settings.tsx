import styles from './Settings.module.css';

function Settings() {
    return (
        <div className={styles.settingsContainer}>
            <h1>Configurações</h1>
            <p>Personalize as configurações do sistema e preferências do usuário.</p>
        </div>
    )
}

export default Settings;