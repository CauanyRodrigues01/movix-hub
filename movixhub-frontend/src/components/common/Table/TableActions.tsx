import type { ReactNode } from "react";
import { Button } from "../Button";
import Styles from "./Table.module.css";

export interface TableActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    customActions?: ReactNode;
}

export const TableActions = ({
    onView,
    onEdit,
    onDelete,
    customActions
}: TableActionsProps) => {
    return (
        <div className={Styles.tdActions}>
            {onView && (
                <Button
                    variant="ghost"
                    size="small"
                    className={Styles.actionView}
                    onClick={onView}
                    aria-label="Visualizar"
                >
                    <i className="bi bi-eye"></i>
                </Button>
            )}
            
            {onEdit && (
                <Button
                    variant="ghost"
                    size="small"
                    className={Styles.actionEdit}
                    onClick={onEdit}
                    aria-label="Editar"
                >
                    <i className="bi bi-pencil-square"></i>
                </Button>
            )}
            
            {onDelete && (
                <Button
                    variant="ghost"
                    size="small"
                    className={Styles.actionDelete}
                    onClick={onDelete}
                    aria-label="Deletar"
                >
                    <i className="bi bi-trash"></i>
                </Button>
            )}
            
            {customActions}
        </div>
    );
};