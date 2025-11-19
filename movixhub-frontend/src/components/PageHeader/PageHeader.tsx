import Button from '../Button/Button';
import Styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    description: string;
    buttonIcon?: React.ReactNode;
    buttonText?: string;
    onButtonClick?: () => void;
}

const PageHeader = ({ title, description, buttonIcon, buttonText, onButtonClick }: PageHeaderProps) => {

    return (
        <header className={Styles.pageHeader}>
            <div className={Styles.pageHeaderDetails}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <Button onClick={onButtonClick}> {buttonIcon} {buttonText}</Button>
        </header>
    )

}

export default PageHeader;