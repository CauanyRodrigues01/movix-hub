import Styles from "./Table.module.css";
import { TableBadge } from './TableBadge';

export interface TableArrayRendererProps {
    items: string[];
    variant?: 'default' | 'info' | 'custom';
    className?: string;
    maxVisible?: number;
}

export const TableArrayRenderer = ({ 
    items, 
    variant = 'default',
    className = '',
    maxVisible 
}: TableArrayRendererProps) => {
    if (!items || items.length === 0) {
        return null;
    }

    const visibleItems = maxVisible ? items.slice(0, maxVisible) : items;
    const hiddenCount = maxVisible && items.length > maxVisible ? items.length - maxVisible : 0;

    return (
        <div className={Styles.arrayContainer}>
            {visibleItems.map((item, index) => (
                <TableBadge
                    key={`${item}-${index}`}
                    value={item}
                    variant={variant}
                    className={className}
                />
            ))}
            {hiddenCount > 0 && (
                <TableBadge
                    value={`+${hiddenCount}`}
                    variant="info"
                />
            )}
        </div>
    );
};