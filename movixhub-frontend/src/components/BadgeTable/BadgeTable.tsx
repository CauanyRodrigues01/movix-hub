import Styles from './BadgeTable.module.css';

interface BadgeTableProps {
    value: string;
    colorClass: string;
}

const BadgeTable = ({ value, colorClass } : BadgeTableProps) => {

    return (
        <span className={`
            ${Styles.badge} 
            ${colorClass || Styles.defaultBadge}
        `}>
            {value}
        </span>
    )

}

export default BadgeTable;

