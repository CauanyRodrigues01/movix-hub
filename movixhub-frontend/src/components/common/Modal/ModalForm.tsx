import { type ReactNode } from 'react';
import { Modal } from './Modal';

export interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ModalForm = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    size = 'lg'
}: ModalFormProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle={subtitle}
            size={size}
        >
            {children}
        </Modal>
    );
};