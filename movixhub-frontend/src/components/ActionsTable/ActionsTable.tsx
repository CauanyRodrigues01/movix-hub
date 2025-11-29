import Styles from './ActionsTable.module.css';
import { Button } from '../common/Button/Button';

interface ActionsTableProps {
    itemId: string | number;
}

const ActionsTable = ({ itemId }: ActionsTableProps) => {

    const onClickEdit = () => {
        alert('Editando item... ' + itemId);
    }

    const onClickDelete = () => {
        alert('Excluindo item... ' + itemId);
    }

    const onClickSee = () => {
        alert('Ver mais do item... ' + itemId);
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
                className={Styles.actionSee}
                onClick={onClickSee}
                aria-label={'ver mais'}
            >
                <i className="bi bi-eye"></i>
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