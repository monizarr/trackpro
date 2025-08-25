import ChevronDown from '@/components/icons/chevron-down';
import ChevronUp from '@/components/icons/chevron-up';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: '/products',
    },
];
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

type Product = {
    id: number;
    nama: string;
    harga: string;
};

const data: Product[] = [
    { id: 1, nama: "Kemeja Pria", harga: "10000" },
    { id: 2, nama: "Gamis", harga: "12000" },
    { id: 3, nama: "Blouse Remaja", harga: "9000" },
    { id: 4, nama: "Blouse Dewasa", harga: "8200" },
    { id: 5, nama: "Gamis", harga: "12000" },
    { id: 6, nama: "Outer Wanita", harga: "9000" },
    { id: 7, nama: "Celana Cargo", harga: "12000" },
    { id: 8, nama: "Celana Denim", harga: "9000" },
    { id: 9, nama: "Celana Denim Casual", harga: "8200" },
    { id: 10, nama: "Celana Jeans", harga: "12000" },
    { id: 11, nama: "Celana Formal", harga: "9000" },
];

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                ID
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
    },
    {
        accessorKey: "nama",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Nama
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
    },
    {
        accessorKey: "harga",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Harga
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
    },
];

export default function Products() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className='p-4'>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari Product..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white dark:bg-zinc-950 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100 dark:bg-zinc-950">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-4 py-2 text-left border-b font-semibold"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-2 border-b">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                        Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Prev
                        </button>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
