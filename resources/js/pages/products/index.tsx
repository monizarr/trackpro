import ChevronDown from '@/components/icons/chevron-down';
import ChevronUp from '@/components/icons/chevron-up';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/entity';
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
import axios from 'axios';
import { ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "sku",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                SKU
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
        cell: ({ row }) => (
            <div
                className="text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 p-1 rounded"
                onClick={() => {
                    navigator.clipboard.writeText(row.original.sku)
                        .then(() => {
                            // Optional: Add visual feedback
                            const el = document.activeElement as HTMLElement;
                            if (el) el.blur();
                        })
                        .catch(err => console.error('Failed to copy text: ', err));
                }}
                title="Klik untuk menyalin SKU"
            >
                {row.original.sku}
            </div>
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
        cell: ({ row }) => (
            <div className="flex items-center">
                {/* <img src="https://picsum.photos/300/200" alt={row.original.nama} className="w-20 h-20 object-cover rounded mr-2" /> */}
                <a
                    className="px-2 py-1 border dark:border-zinc-700 rounded text-left hover:bg-gray-100 dark:hover:bg-zinc-800"
                    href={`products/${row.original.id}`}
                >
                    {row.original.nama}
                </a>
            </div>
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
    {
        accessorKey: "status",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Status
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
    },
];

export default function ProductsPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [produk, setProduk] = useState<Product[]>([]);
    const today = new Date();

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProduk(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching produk:', error);
            });
    }, []);

    const table = useReactTable({
        data: produk,
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
                <div className="flex gap-4 mb-4">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Cari Product..."
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="w-full px-3 py-1.5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Buat Produk</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = {
                                    sku: formData.get('sku') as string,
                                    nama: formData.get('nama') as string,
                                    harga: formData.get('harga') as string,
                                    deskripsi: formData.get('deskripsi') as string,
                                    bahan: formData.get('bahan') as string,
                                    status: formData.get('status') as string,
                                };
                                console.log(data);
                                axios.post('/api/product', data)
                                    .then(response => {
                                        console.log('Product created successfully:', response.data);
                                        // Optionally, you can add code to update the UI or notify the user
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        console.error('There was an error creating the product:', error);
                                        // Optionally, you can add code to notify the user of the error
                                    });
                            }}>
                                <DialogHeader>
                                    <DialogTitle>Buat Produk</DialogTitle>
                                    <DialogDescription>
                                        Silakan masukkan informasi produk.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 my-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sku">SKU</Label>
                                        <Input id="sku" name="sku" defaultValue="SKU123" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="nama">Nama</Label>
                                        <Input id="nama" name="nama" defaultValue="Produk A" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="harga">Harga</Label>
                                        <Input id="harga" name="harga" type="number" defaultValue="10000" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="deskripsi">Deskripsi</Label>
                                        <Input id="deskripsi" name="deskripsi" defaultValue="Deskripsi produk A" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="bahan">Bahan</Label>
                                        <Input id="bahan" name="bahan" defaultValue="Bahan produk A" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue="active">
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        {/* <Button variant="outline"></Button> */}
                                    </DialogClose>
                                    <Button type="submit" className='cursor-pointer'>Simpan</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
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
