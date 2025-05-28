'use client';

import { Customer } from '@/app/types/customer';
import { PencilIcon } from '@heroicons/react/24/outline';
import styles from '@/app/components/Tables/EditButton.module.css';

interface Props {
    name: string;
    customer: Customer;
    onEdit: (customer: Customer) => void;
}

export default function EditButton(props: Props) {
    return (
        <button onClick={() => props.onEdit(props.customer)} className={styles.button} aria-label={`Editar ${props.name}`}>
            <PencilIcon className={styles.icon} />
        </button>
    );
}
