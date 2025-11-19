import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Help.module.css';

function Help() {
    return (
        <div className={styles.helpContainer}>
            <PageHeader 
                title="Ajuda"
                description="Encontre respostas para suas dúvidas e suporte para o uso do MovixHub."
            />
        </div>
    )
}

export default Help;