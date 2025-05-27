import styles from './ErrorIcon.module.css';

interface ErrorIconProps {
    message: string;
}

export default function ErrorIcon({ message }: ErrorIconProps) {
    return (
        <>
            <div className={styles.errorIcon} />
            <div className={styles.errorTooltip}>{message}</div>
        </>
    );
}
