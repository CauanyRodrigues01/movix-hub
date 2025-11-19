import Styles from './ActionsTable.module.css';
import Button from '../Button/Button';


const ActionsTable = () => {

    const onClickEdit = () => {
        alert('Editando item...');
    }

    const onClickDelete = () => {
        alert('Excluindo item...');
    }

    return (
        <div className={Styles.tdActions}>

            <Button
                variant='ghost'
                className={Styles.actionEdit}
                onClick={onClickEdit}
                aria-label={'edit'}
            >
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Button
                variant='ghost'
                className={Styles.actionDelete}
                onClick={onClickDelete}
                aria-label={'delete'}
            >
                <i className="bi bi-trash"></i>
            </Button>

        </div>
    );
};

export default ActionsTable;