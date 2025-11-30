import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Modal } from './Modal';
import Styles from './Modal.module.css';

export interface ModalDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg';
    onEdit?: () => void;
    editLabel?: string;
}

export const ModalDetails = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    size = 'md',
    onEdit,
    editLabel = 'Editar'
}: ModalDetailsProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle={subtitle}
            size={size}
            footer={
                <>
                    {onEdit && (
                        <Button type="button" variant="primary" onClick={onEdit}>
                            {editLabel}
                        </Button>
                    )}
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Fechar
                    </Button>
                </>
            }
        >
            {/* Wrapper com estilo de detalhes */}
            <div className={Styles.details}>
                {children}
            </div>
        </Modal>
    );
};