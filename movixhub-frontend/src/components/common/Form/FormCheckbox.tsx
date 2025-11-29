import { type ChangeEvent } from 'react';
import Styles from './Form.module.css';

export interface FormCheckboxProps {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
}

export const FormCheckbox = ({
    label,
    id,
    name,
    checked,
    onChange,
    disabled = false,
    error
}: FormCheckboxProps) => {
    return (
        <div className={Styles.formCheckbox}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={error ? Styles.inputError : ''}
            />
            <label htmlFor={id}>{label}</label>
            {error && <span className={Styles.errorText}>{error}</span>}
        </div>
    );
};