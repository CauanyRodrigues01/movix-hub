import Styles from "./Table.module.css";

export interface TableBadgeProps {
    value: string;
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'custom';
    className?: string;
}

export const TableBadge = ({ value, variant = 'default', className = '' }: TableBadgeProps) => {
    return (
        <span className={`${Styles.badge}  ${className} ${Styles[`badge-${variant}`]}`}>
            {value}
        </span>
    );
};

