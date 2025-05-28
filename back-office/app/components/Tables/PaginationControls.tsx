import { Table } from '@tanstack/react-table';
import styles from './PaginationControls.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
    table: Table<any>;
}

export default function PaginationControls({ table }: Props) {
    return (
        <div className={styles.container}>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={styles.paginationButton} aria-label="Previous page">
                <ChevronLeftIcon className={styles.paginationIcon} />
            </button>
            <div className={styles.numbers}>
                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => table.setPageIndex(pageNumber - 1)}
                        className={`${styles.pageNumber} ${table.getState().pagination.pageIndex + 1 === pageNumber ? styles.activePage : ''}`}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={table.getState().pagination.pageIndex + 1 === pageNumber ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={styles.paginationButton} aria-label="Next page">
                <ChevronRightIcon className={styles.paginationIcon} />
            </button>
        </div>
    );
}
