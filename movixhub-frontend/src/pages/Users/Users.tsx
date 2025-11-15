import styles from './Users.module.css';

function Users() {
    return (
        <div className={styles.usersContainer}>
            <h1>Equipe Interna</h1>
            <p>Gerencie os membros da equipe e suas permissões.</p>
        </div>
    )
}

export default Users;