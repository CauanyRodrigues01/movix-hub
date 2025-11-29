import { Button } from '../Button';
import Styles from './Form.module.css';

export interface FormActionsProps {
    onCancel?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

export const FormActions = ({
    onCancel,
    submitLabel = 'Salvar',
    cancelLabel = 'Cancelar',
    isLoading = false,
    disabled = false
}: FormActionsProps) => {
    return (
        <div className={Styles.formActions}>
            { /* Se onCancel foi passado como prop, mostra o botão. */ }
            {onCancel && (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isLoading || disabled}
                >
                    {cancelLabel}
                </Button>
            )}
            <Button
                type="submit"
                variant="primary"
                disabled={isLoading || disabled}
            >
                {isLoading ? 'Salvando...' : submitLabel}
            </Button>
        </div>
    );
};