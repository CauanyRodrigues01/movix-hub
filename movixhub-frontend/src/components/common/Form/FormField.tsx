import type { ChangeEvent } from "react";
import Styles from './Form.module.css';

export interface FormFieldProps {
    label: string;
    id: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'date' | 'tel' | 'number' | 'url';
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    error?: string;
    min?: string | number;
    max?: string | number;
    step?: string | number;
};

export const FormField = ({
    label,
    id,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    disabled = false,
    placeholder,
    error,
    min,
    max,
    step
}: FormFieldProps) => {
    return (
        <div className={Styles.formGroup}>
            <label htmlFor={id}>
                {label}
                {required && <span className={Styles.required}>*</span>}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className={`${Styles.input} ${error ? Styles.inputError : ''}`}
            />
            {error && <span className={Styles.errorText}>{error}</span>}
        </div>
    );
};