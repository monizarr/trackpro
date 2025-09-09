import ChevronDown from '@/components/icons/chevron-down';
import ChevronUp from '@/components/icons/chevron-up';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { BatchProduction, Product } from '@/types/entity';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/_card"

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
import { ChevronsUpDown, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Select } from '@/components/ui/select';
import { formatWaktu } from '@/lib/utils';

const columns: ColumnDef<BatchProduction>[] = [
    {
        accessorKey: "kode_batch",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Kode Batch
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                {/* <img src="https://picsum.photos/300/200" alt={row.original.nama} className="w-20 h-20 object-cover rounded mr-2" /> */}
                <a
                    className="px-2 py-1 border dark:border-zinc-700 rounded text-left hover:bg-gray-100 dark:hover:bg-zinc-800"
                    href={`${row.original.produk_id}/production/${row.original.id}`}
                >
                    {row.original.kode_batch}
                </a>
            </div>
        ),
    },
    {
        accessorKey: "tgl_mulai",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Tanggal Dibuat
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                {formatWaktu(new Date(row.original.tgl_mulai))}
            </div>
        ),
    },
    {
        accessorKey: "tgl_selesai",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Tanggal Selesai
                {column.getIsSorted() === "asc" ? <ChevronUp /> : column.getIsSorted() === "desc" ? <ChevronDown /> : <ChevronsUpDown />}
            </button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                {row.original.tgl_selesai ? formatWaktu(new Date(row.original.tgl_selesai)) : '-'}
            </div>
        ),
    },
    {
        accessorKey: "jumlah_target",
        header: ({ column }) => (
            <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-semibold flex items-center gap-1 cursor-pointer"
            >
                Target (PCS)
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

export default function ProductPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [produk, setProduk] = useState<Product>({} as Product);
    const [produksi, setProduksi] = useState<BatchProduction[]>([]);
    const [today, setToday] = useState<Date>(new Date());

    useEffect(() => {
        const id = window.location.pathname.split('/').pop()
        axios.get(`/api/product/${id}`)
            .then((response) => {
                setProduk(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching produk:', error);
            });

        // Fetch batch production data
        axios.get(`/api/batch-production/${id}`)
            .then((response) => {
                setProduksi(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching batch production:', error);
            });
    }, []);

    // handle submit
    const handleSubmit = (data: BatchProduction) => {
        axios.post('/api/batch-production', data)
            .then((response) => {
                console.log('Batch production created:', response.data.data);
                // Refresh the batch production list
                setProduksi((prev) => [response.data.data, ...prev]);
            })
            .catch((error) => {
                console.error('Error creating batch production:', error);
            });
    };

    const table = useReactTable({
        data: produksi,
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
            <div className='p-4 flex flex-col md:flex-row gap-6 w-full'>
                <Card className="w-full mb-6 md:w-96 flex-initial h-fit">
                    <CardHeader>
                        <div className="flex">
                            <div>
                                <CardTitle>{produk?.nama}</CardTitle>
                                <CardDescription>
                                    {produk.deskripsi}
                                </CardDescription>
                            </div>
                            <Edit className='ml-auto mt-1 cursor-pointer hover:text-accent-foreground' />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {produk.gambar && (
                            <div className="mb-4">
                                <img
                                    src={produk.gambar}
                                    alt={produk.nama}
                                    className="w-full max-w-md h-auto rounded-lg shadow-md"
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Harga</Label>
                                <div className="text-xl font-bold">
                                    {typeof produk.harga === 'number'
                                        ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(produk.harga)
                                        : produk.harga}
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Status</Label>
                                <div className={`text-sm ml-2 font-medium rounded-full px-3 py-1 inline-block ${produk.status === 'active' ? 'bg-green-100 text-green-800' :
                                    produk.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {produk.status}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <div className="text-sm text-gray-500">
                            SKU: {produk.sku}
                        </div>
                    </CardFooter>
                </Card>
                <div className="w-full">
                    <Drawer>
                        <DrawerTrigger className="hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent px-4 py-2 mb-4 cursor-pointer">
                            Tambah Produksi
                        </DrawerTrigger>
                        <DrawerContent>
                            <form
                                className='px-4'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const data = {
                                        produk_id: produk.id,
                                        tgl_mulai: `${(formData.get('tanggal_mulai') as string).replace('T', ' ')}:00`,
                                        jumlah_target: parseInt(formData.get('jumlah_target') as string),
                                        status: 'draft',
                                    };
                                    console.log("data =>", data);
                                    handleSubmit(data as BatchProduction);
                                    e.currentTarget.reset();
                                    document.getElementById('drawer-close-btn')?.click();
                                }}
                            >
                                <DrawerHeader>
                                    <DrawerTitle>Buat Produksi</DrawerTitle>
                                    <DrawerDescription>Buat Produksi Baru</DrawerDescription>
                                </DrawerHeader>

                                <div className="mb-4 flex gap-6">
                                    <div className='w-full'>
                                        <Label htmlFor="tanggal_mulai" className="block text-sm font-medium">
                                            Tanggal Mulai
                                        </Label>
                                        <Input
                                            id="tanggal_mulai"
                                            name="tanggal_mulai"
                                            type="datetime-local"
                                            defaultValue={(() => {
                                                const wibTime = new Date(today.getTime() + (7 * 60 * 60 * 1000));
                                                return wibTime.toISOString().slice(0, 16);
                                            })()}
                                            required
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <Label htmlFor="jumlah_target" className="block text-sm font-medium">
                                            Jumlah Target (PCS)
                                        </Label>
                                        <Input
                                            id="jumlah_target"
                                            name="jumlah_target"
                                            type="number"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <div className="flex gap-6">
                                        <DrawerClose id="drawer-close-btn" className='flex-1'>
                                            <Button type="button" variant="outline" className='w-full'>Cancel</Button>
                                        </DrawerClose>
                                        <Button type="submit" className='flex-1'>Buat</Button>
                                    </div>
                                </DrawerFooter>
                            </form>
                        </DrawerContent>
                    </Drawer>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Cari Produksi..."
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
            </div>
        </AppLayout >
    )
}
