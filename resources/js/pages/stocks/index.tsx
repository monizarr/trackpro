import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { Bahan } from '@/types/entity';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok',
        href: '/stocks',
    },
];

const columns: ColumnDef<Bahan>[] = [
    {
        header: 'Nama',
        accessorKey: 'nama',
    },
    {
        header: 'Tipe',
        accessorKey: 'tipe',
    },
    {
        header: 'Stok Qty',
        accessorKey: 'stok_qty',
    },
    {
        header: 'Satuan',
        accessorKey: 'satuan',
    },
];

export default function Stocks() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [bahan, setBahan] = useState<Bahan[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('semua');

    useEffect(() => {
        axios.get('/api/material')
            .then((response) => {
                setBahan(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching bahan:', error);
            });
    }, []); // Keep dependency array empty to fetch only on mount


    const filteredData = useMemo(() => {
        if (activeFilter === 'semua') {
            return bahan;
        }
        return bahan.filter(item => item.tipe === activeFilter);
    }, [bahan, activeFilter]);


    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'includesString',
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stok" />
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
                            <Button variant="outline">Input Stok</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = {
                                    nama: formData.get('nama') as string,
                                    tipe: formData.get('tipe') as string,
                                    stok_qty: parseInt(formData.get('stok_qty') as string, 10),
                                    satuan: formData.get('satuan') as string,
                                };
                                console.log(data);
                                axios.post('/api/material', data)
                                    .then(response => {
                                        console.log('Material created successfully:', response.data);
                                        // Optionally, you can add code to update the UI or notify the user
                                        setBahan(prevBahan => [...prevBahan, response.data.data]);
                                    })
                                    .catch(error => {
                                        console.error('There was an error creating the material:', error);
                                        // Optionally, you can add code to notify the user of the error
                                    });
                            }}>
                                <DialogHeader>
                                    <DialogTitle>Input Stok</DialogTitle>
                                    <DialogDescription>
                                        Silakan masukkan informasi stok.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 my-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="nama">Nama</Label>
                                        <Input id="nama" name="nama" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tipe">Tipe</Label>
                                        <select id="tipe" name="tipe" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue="bahan_baku">
                                            <option value="bahan_baku">Bahan Baku</option>
                                            <option value="produk_jadi">Produk Jadi</option>
                                            <option value="produk_gagal">Produk Gagal</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="stok_qty">Stok Qty</Label>
                                        <Input id="stok_qty" name="stok_qty" type="number" defaultValue={0} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="satuan">Satuan</Label>
                                        <select id="satuan" name="satuan" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue="pcs">
                                            <option value="pcs">Pcs</option>
                                            <option value="roll">Roll</option>
                                        </select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className='cursor-pointer'>Simpan</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filter buttons for stock types */}
                <div className="flex gap-2 mb-4">
                    <Button
                        variant={activeFilter === 'semua' ? "default" : "outline"}
                        onClick={() => setActiveFilter('semua')}
                    >
                        Semua
                    </Button>
                    <Button
                        variant={activeFilter === "bahan_baku" ? "default" : "outline"}
                        onClick={() => setActiveFilter("bahan_baku")}
                    >
                        Bahan Baku
                    </Button>
                    <Button
                        variant={activeFilter === "produk_jadi" ? "default" : "outline"}
                        onClick={() => setActiveFilter("produk_jadi")}
                    >
                        Produk Jadi
                    </Button>
                    <Button
                        variant={activeFilter === "produk_gagal" ? "default" : "outline"}
                        onClick={() => setActiveFilter("produk_gagal")}
                    >
                        Produk Gagal
                    </Button>
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
        </AppLayout >
    )
}
