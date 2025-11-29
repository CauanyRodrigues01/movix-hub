import type { ChangeEvent } from "react";
import Styles from './Form.module.css';

export interface FormSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
};

export interface FormSelectProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: FormSelectOption[];
    required?: boolean;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
};

export const FormSelect = ({
    label,
    id,
    name,
    value,
    onChange,
    options,
    required,
    disabled,
    error,
    placeholder,
}: FormSelectProps) => {
    return (
        <div className={Styles.formGroup}>
            <label htmlFor={id}>
                {label}
                {required && <span className={Styles.required}>*</span>}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`${Styles.input} ${error ? Styles.inputError : ''}`}
            >
                {placeholder && (
                    <option value='' disabled>
                        {placeholder}
                    </option>
                )}

                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={Styles.error}>{error}</span>}
        </div>
    );
};