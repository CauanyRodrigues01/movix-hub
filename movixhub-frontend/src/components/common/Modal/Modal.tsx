import { useEffect, type MouseEvent, type ReactNode } from 'react';
import Styles from './Modal.module.css';
import { Button } from '../Button';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    footer?: ReactNode;
    closeOnOverlayClick?: boolean; // Se true, fecha o modal ao clicar fora dele
    closeOnEscape?: boolean; // Se true, fecha o modal ao pressionar ESC
};

export const Modal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    size = 'md',
    footer,
    closeOnOverlayClick = true,
    closeOnEscape = true
}: ModalProps) => {

    // Fechar com ESC
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key == 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);


    // Prevenir scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={Styles.overlay} onClick={handleOverlayClick}>
            <div className={`${Styles.modal} ${Styles[size]}`}>
                {/* Header */}
                <div className={Styles.header}>
                    <div>
                        <h2 className={Styles.title}>{title}</h2>
                        {subtitle && <p className={Styles.subtitle}>{subtitle}</p>}
                    </div>
                    <Button
                        type="button"
                        onClick={onClose}
                        className={Styles.closeButton}
                        aria-label="Fechar modal"
                    >
                        <i className="bi bi-x"></i>
                    </Button>
                </div>

                {/* Body */}
                <div className={Styles.body}>
                    {children}
                </div>

                {/* Footer (opcional) */}
                {footer && (
                    <div className={Styles.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};