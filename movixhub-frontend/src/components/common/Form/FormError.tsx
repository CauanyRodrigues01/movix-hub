import Styles from './Form.module.css';

export interface FormErrorProps {
    message: string | null;
    onClose?: () => void;
}

export const FormError = ({ message, onClose }: FormErrorProps) => {
    if (!message) return null;
    
    return (
        <div className={Styles.errorBox}>
            <span>{message}</span>
            {onClose && (
                <button 
                    type="button" 
                    onClick={onClose}
                    className={Styles.errorClose}
                    aria-label="Fechar mensagem de erro"
                >
                    ×
                </button>
            )}
        </div>
    );
};
