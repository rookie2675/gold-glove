'use client';

import { useMemo, useState } from 'react';
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

interface Props {
    data: Customer[];
    isLoading?: boolean;
    onEdit: (customer: Customer) => void;
}

export default function CustomersTable(props: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo<ColumnDef<Customer>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Nome',
                cell: (info: CellContext<Customer, any>) => info.getValue() as string,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                cell: (info: CellContext<Customer, any>) => info.getValue() as string,
            },
            {
                accessorKey: 'phone',
                header: 'Telemóvel',
                cell: (info: CellContext<Customer, any>) => (info.getValue() as string) || '-',
            },
            {
                accessorKey: 'dateOfBirth',
                header: 'Data de Nascimento',
                cell: (info: CellContext<Customer, any>) => formatDate(info.getValue() as string),
            },
            {
                accessorKey: 'nif',
                header: 'NIF',
                cell: (info: CellContext<Customer, any>) => info.getValue() as string,
            },
            {
                accessorKey: 'lastPaymentDate',
                header: 'Último Pagamento',
                cell: (info: CellContext<Customer, any>) => {
                    const value = info.getValue() as string | Date | null | undefined;
                    return value ? formatDate(value as string) : '-';
                },
            },
            {
                id: 'actions',
                header: 'Ações',
                cell: (info: CellContext<Customer, any>) => (
                    <button onClick={() => props.onEdit(info.row.original)} className={styles.editButton} aria-label={`Editar ${info.row.original.name}`}>
                        Editar
                    </button>
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
        <div className={styles.container}>
            <div className={styles.pagination}>
                <div className={styles.paginationControls}>
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={styles.paginationButton}>
                        Previous
                    </button>
                    <span>
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
        </div>
    );
}
