import { Table } from '@tanstack/react-table';
import styles from './PaginationControls.module.css';

interface Props {
    table: Table<any>;
}

export default function PageSizeSelector({ table }: Props) {
    return (
        <div className={styles.pageSize}>
            <span>Show:</span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
                className={styles.pageSizeSelect}
                aria-label="Items per page"
            >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                ))}
            </select>
        </div>
    );
}
