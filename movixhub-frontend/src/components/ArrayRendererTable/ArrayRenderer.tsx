import BadgeTable from '../BadgeTable/BadgeTable';
import Styles from './ArrayRenderer.module.css';

interface ArrayRendererTableProps {
    items: string[];
    categoryClass: string;
}

const ArrayRendererTable = ({ items, categoryClass } : ArrayRendererTableProps) => {

    if (!items || items.length === 0 ) {
        return null;
    }

    return (
        <div className={Styles.arrayContainer}>
            {items.map(item => (
                <BadgeTable
                    key={item}
                    value={item}
                    colorClass={categoryClass}
                />
            ))}
        </div>
    );
};

export default ArrayRendererTable;