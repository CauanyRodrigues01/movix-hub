import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Users.module.css';

function Users() {
    return (
        <div className={styles.usersContainer}>
            <PageHeader 
                title="Equipe Interna"
                description="Gerencie os membros da equipe e suas permissões."
                buttonIcon={<i className="bi bi-plus-lg"></i>}
                buttonText="Adicionar Membro"
                onButtonClick={() => alert('Clicou no botão!')}
            />
        </div>
    )
}

export default Users;