'use client';

import { toast } from 'sonner';
import { Customer } from '@/app/types/customer';
import { TrashIcon } from '@heroicons/react/24/outline';
import styles from '@/app/components/Tables/DeleteButton.module.css';

interface Props {
    name: string;
    customer: Customer;
    onDelete: (customer: Customer) => Promise<void>;
}

export default function DeleteButton(props: Props): React.JSX.Element {
    async function onClick(e: React.MouseEvent) {
        e.stopPropagation();
        if (window.confirm(`Tem a certeza que deseja eliminar o cliente ${props.name}?`)) {
            try {
                await props.onDelete(props.customer);
                toast.success('Cliente eliminado com sucesso');
            } catch (error) {
                console.error('Error deleting customer:', error);
                toast.error('Ocorreu um erro ao eliminar o cliente');
            }
        }
    }

    return (
        <button onClick={onClick} className={`${styles.iconButton} ${styles.deleteButton}`} aria-label={`Eliminar ${props.name}`} title="Eliminar">
            <TrashIcon className={styles.icon} />
        </button>
    );
}
