import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Promotions.module.css';

function Promotions() {

    return (
        <div className={styles.promotionsContainer}>
            <PageHeader
                title="Acompanhar Promoções"
                description="Gerencie e acompanhe as promoções ativas e futuras."
                buttonIcon={<i className="bi bi-plus-lg"></i>}
                buttonText="Nova Promoção"
                onButtonClick={() => alert('Clicou no botão!')}
            />
        </div>
    )
}

export default Promotions;