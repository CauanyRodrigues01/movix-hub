import type { ChangeEvent } from "react";
import Styles from './Form.module.css';

export interface FormTextareaProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    error?: string;
    rows?: number;
    maxLength?: number;
};

export const FormTextarea = ({
    label,
    id,
    name,
    value,
    onChange,
    required = false,
    disabled = false,
    placeholder,
    error,
    rows = 4,
    maxLength
}: FormTextareaProps) => {
    return (
        <div className={Styles.formGroup}>
            <label htmlFor={id}>
                {label}
                {required && <span className={Styles.required}>*</span>}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                className={`${Styles.input} ${error ? Styles.inputError : ''}`}
            />
            {maxLength && (
                <span className={Styles.charCount}>
                    {value.length} / {maxLength}
                </span>
            )}
            {error && <span className={Styles.errorText}>{error}</span>}
        </div>
    );
};