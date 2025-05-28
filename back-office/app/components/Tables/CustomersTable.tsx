'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    ColumnDef,
    SortingState,
    flexRender,
    CellContext,
} from '@tanstack/react-table';
import styles from '@/app/components/Tables/CustomersTable.module.css';
import { Customer } from '@/app/types/customer';
import { formatDate } from '@/app/utils/date';
import DeleteButton from './DeleteButton';

interface Props {
    data: Customer[];
    isLoading?: boolean;
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => Promise<void>;
    onAddNew: () => void;
}

export default function CustomersTable(props: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo<ColumnDef<Customer>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'NOME',
                cell: (info: CellContext<Customer, any>) => info.getValue() as string,
            },
            {
                accessorKey: 'email',
                header: 'EMAIL',
                cell: (info: CellContext<Customer, any>) => info.getValue() as string,
            },
            {
                accessorKey: 'phone',
                header: 'TELEMOVEL',
                cell: (info: CellContext<Customer, any>) => (info.getValue() as string) || '-',
            },
            {
                accessorKey: 'dateOfBirth',
                header: 'DATA DE NASCIMENTO',
                cell: (info: CellContext<Customer, any>) => formatDate(info.getValue() as string),
            },
            {
                accessorKey: 'nif',
                header: 'NIF',
                cell: (info: CellContext<Customer, any>) => info.getValue() as string,
            },
            {
                accessorKey: 'lastPaymentDate',
                header: 'ÚLTIMO PAGAMENTO',
                cell: (info: CellContext<Customer, any>) => {
                    const value = info.getValue() as string | Date | null | undefined;
                    return value ? formatDate(value as string) : '-';
                },
            },
            {
                id: 'actions',
                header: 'AÇÕES',
                cell: (info: CellContext<Customer, any>) => (
                    <div className={styles.actions}>
                        <button onClick={() => props.onEdit(info.row.original)} className={styles.iconButton} aria-label={`Editar ${info.row.original.name}`}>
                            <PencilIcon className={styles.icon} />
                        </button>
                        <DeleteButton name={info.row.original.name} customer={info.row.original} onDelete={props.onDelete} />
                    </div>
                ),
            },
        ],
        [props.onEdit]
    );

    const table = useReactTable({
        data: props.data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: process.env.NODE_ENV === 'development',
    });

    if (props.isLoading) {
        return <div className={styles.loading}>Loading customers...</div>;
    }

    if (props.data.length === 0) {
        return <div className={styles.noData}>No customers found.</div>;
    }

    return (
        <>
            <div className={styles.pagination}>
                <div className={styles.paginationControls}>
                    <button onClick={props.onAddNew} className={`${styles.headerButton} ${styles.addButton}`}>
                        + NOVO CLIENTE
                    </button>
                </div>
                <div className={styles.paginationControls}>
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={styles.paginationButton}>
                        Anterior
                    </button>
                    <span className={styles.pageInfo}>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>
                    </span>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={styles.paginationButton}>
                        Next
                    </button>
                </div>
                <div className={styles.pageSize}>
                    <span>Show:</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className={styles.pageSizeSelect}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const sortDirection = header.column.getIsSorted();
                                    return (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className={`${styles.th} ${
                                                header.column.getCanSort() ? styles.sortable : ''
                                            } ${sortDirection ? styles.sorted : ''}`}
                                        >
                                            <div className={styles.headerContent}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {sortDirection && <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className={styles.tr}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={styles.td}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
