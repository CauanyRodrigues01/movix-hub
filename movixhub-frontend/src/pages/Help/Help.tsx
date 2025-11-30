import { PageHeader } from '../../components/common/Layout';
import Styles from './Help.module.css';

export const Help = () => {
    return (
        <div className={Styles.helpContainer}>
            <PageHeader 
                title="Ajuda"
                description="Encontre respostas para suas dúvidas e suporte para o uso do MovixHub."
            />
        </div>
    )
};