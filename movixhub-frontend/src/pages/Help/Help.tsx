import PageHeader from '../../components/PageHeader/PageHeader';
import Styles from './Help.module.css';

function Help() {
    return (
        <div className={Styles.helpContainer}>
            <PageHeader 
                title="Ajuda"
                description="Encontre respostas para suas dúvidas e suporte para o uso do MovixHub."
            />
        </div>
    )
}

export default Help;