import type { FormEvent, ReactNode } from "react";
import Styles from './Form.module.css';

export interface FormContainerProps {
    children: ReactNode;
    onSubmit: (e: FormEvent) => void;
    className?: string;
}

export const FormContainer = ({ children, onSubmit, className = '' }: FormContainerProps) => {
    return (
        <form onSubmit={onSubmit} className={`${Styles.form} ${className}`}>
            {children}
        </form>
    );
};