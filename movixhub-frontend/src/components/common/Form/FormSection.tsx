import { type ReactNode } from 'react';
import Styles from './Form.module.css';

export interface FormSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

export const FormSection = ({ title, description, children }: FormSectionProps) => {
    return (
        <div className={Styles.formSection}>
            {(title || description) && (
                <div className={Styles.sectionHeader}>
                    {title && <h3 className={Styles.sectionTitle}>{title}</h3>}
                    {description && <p className={Styles.sectionDescription}>{description}</p>}
                </div>
            )}
            <div className={Styles.sectionContent}>
                {children}
            </div>
        </div>
    );
};