import type { ButtonHTMLAttributes } from 'react';
import Styles from './Button.module.css';


type ButtonProps = {

    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;

} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
    variant = 'primary',
    size = 'medium',
    children,
    className,
    ...rest
    } : ButtonProps)
{

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

}

export default Button;