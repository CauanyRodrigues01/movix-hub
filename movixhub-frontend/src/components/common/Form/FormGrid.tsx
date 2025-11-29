import { type ReactNode } from 'react';
import Styles from './Form.module.css';

export interface FormGridProps {
    children: ReactNode;
    columns?: 1 | 2 | 3 | 4;
}

export const FormGrid = ({ children, columns = 2 }: FormGridProps) => {
    return (
        <div className={`${Styles.formGrid} ${Styles[`grid${columns}`]}`}>
            {children}
        </div>
    );
};