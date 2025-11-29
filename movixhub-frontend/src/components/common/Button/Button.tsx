import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Styles from './Button.module.css';

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ variant = 'primary', size = 'medium', children, className, ...rest } : ButtonProps) => {

    const buttonClasses = [
        Styles.button,
        Styles[variant],
        Styles[size],
        className
    ].join(' ');

    return (
        <button className={buttonClasses} {...rest}>
            {children}
        </button>
    )

};