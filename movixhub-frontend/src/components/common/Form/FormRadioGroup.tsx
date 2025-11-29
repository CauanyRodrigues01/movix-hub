import { type ChangeEvent } from 'react';
import Styles from './Form.module.css';

export interface FormRadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface FormRadioGroupProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    options: FormRadioOption[];
    required?: boolean;
    disabled?: boolean;
    error?: string;
}

export const FormRadioGroup = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    disabled = false,
    error
}: FormRadioGroupProps) => {
    return (
        <div className={Styles.formGroup}>
            <label>
                {label}
                {required && <span className={Styles.required}>*</span>}
            </label>
            <div className={Styles.radioGroup}>
                {options.map(option => (
                    <div key={option.value} className={Styles.radioOption}>
                        <input
                            type="radio"
                            id={`${name}-${option.value}`}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            disabled={disabled || option.disabled}
                            required={required}
                        />
                        <label htmlFor={`${name}-${option.value}`}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {error && <span className={Styles.errorText}>{error}</span>}
        </div>
    );
};