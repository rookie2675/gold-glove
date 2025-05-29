import styles from './AddButton.module.css';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Props {
    onAddNew: () => void;
}

export default function AddButton(props: Props) {
    return (
        <button onClick={props.onAddNew} className={styles.addButton} aria-label="Adicionar novo cliente">
            <PlusIcon className="w-4 h-4" />
        </button>
    );
}
