import { Button } from '../Button';
import { Modal } from './Modal';
import Styles from './Modal.module.css';

export interface ModalConfirmProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string; // Mensagem exibida no corpo do modal
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning'; // Define o estilo do botão de confirmação
    isLoading?: boolean; // Indica se a ação de confirmação está em andamento
}

export const ModalConfirm = ({
    isOpen,
    onConfirm,
    onCancel,
    title,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    variant = 'danger',
    isLoading = false
}: ModalConfirmProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            title={title}
            size="sm"
            closeOnOverlayClick={!isLoading}
            footer={
                <>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={Styles[`button${variant}`]}
                    >
                        {isLoading ? 'Processando...' : confirmLabel}
                    </Button>
                </>
            }
        >
            <p className={Styles.message}>{message}</p>
        </Modal>
    );
};