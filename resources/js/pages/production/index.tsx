import ChevronDown from '@/components/icons/chevron-down';
import ChevronUp from '@/components/icons/chevron-up';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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


export default function ProductionPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [produk, setProduk] = useState<Product[]>([]);
    const today = new Date();

    useEffect(() => {
        axios.get('/api/production/1')
            .then((response) => {
                setProduk(response.data.data);
                console.log("produk =>", response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching produk:', error);
            });
    }, []);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className='p-4'>
                <div className='p-4 flex flex-col md:flex-row gap-6 w-full'>
                    <Card className="w-full mb-6 md:w-96 flex-initial h-fit">
                        <CardHeader>
                            <CardTitle>{produk?.nama}</CardTitle>
                            <CardDescription>
                                {produk.deskripsi}
                            </CardDescription>
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
                    <Drawer>
                        <DrawerTrigger className="hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent px-4 py-2 mb-4 cursor-pointer">
                            Tambah Produksi
                        </DrawerTrigger>
                        <DrawerContent>
                            <form
                                className='px-4'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // const formData = new FormData(e.currentTarget);
                                    // const data = {
                                    //     produk_id: produk.id,
                                    //     tgl_mulai: `${(formData.get('tanggal_mulai') as string).replace('T', ' ')}:00`,
                                    //     jumlah_target: parseInt(formData.get('jumlah_target') as string),
                                    //     status: 'draft',
                                    // };
                                    // console.log("data =>", data);
                                    // handleSubmit(data as BatchProduction);
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
                </div>
            </div>
        </AppLayout>
    )
}
