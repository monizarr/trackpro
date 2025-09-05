import ProcessProductionCard from '@/components/process-production-card';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Production } from '@/types/entity';
import { Head, Link } from '@inertiajs/react';
import { SortingState } from "@tanstack/react-table";
import axios from 'axios';
import { PackageOpen, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: '/products',
    },
];

const productId = window.location.pathname.split('/')[2];
const batchId = window.location.pathname.split('/')[4];

export default function ProductionPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [produksi, setProduksi] = useState<any>([]);

    const today = new Date();

    useEffect(() => {
        axios.get(`/api/proses-produksi/${productId}/${batchId}`)
            .then((response) => {
                console.log(`/api/proses-produksi/${productId}/${batchId}`);
                setProduksi(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching produksi:', error);
            });
    }, []);


    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            batch_id: batchId,
            proses_id: formData.get('proses_id'),
            tipe: formData.get('tipe'),
            tgl_mulai: `${(formData.get('tgl_mulai') as string).replace('T', ' ')}:00`,
            tgl_selesai: `${(formData.get('tgl_selesai') as string).replace('T', ' ')}:00`,
            pekerja_id: formData.get('pekerja'),
            jumlah: formData.get('jumlah'),
        };
        console.log("data =>", data);
        axios.post('/api/batch-proses-produksi', data)
            .then((response) => {
                console.log('Success:', response.data);
                // refresh data
                axios.get(`/api/proses-produksi/${productId}/${batchId}`)
                    .then((response) => {
                        console.log(`/api/proses-produksi/${productId}/${batchId}`);
                        setProduksi(response.data.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching produksi:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        e.currentTarget.reset();
        document.getElementById('drawer-close-btn')?.click();
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            {/* <Card className="w-full mb-6 md:w-96 flex-initial h-fit">
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
            </Card> */}
            <div className='p-4 flex flex-col md:flex-row gap-6 w-full'>
                <div className="w-full">
                    <div className="flex justify-between">
                        <Link href={`/products/${productId}`}>{'<<'} Back</Link>
                    </div>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Kegiatan Produksi</CardTitle>
                            <CardDescription>Daftar Kegiatan Produksi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="">
                                <div className="flex gap-4">
                                    {/* input barang */}
                                    <Dialog>
                                        <DialogTrigger className="hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent px-4 py-2 mb-4 cursor-pointer">Masuk</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Barang Masuk</DialogTitle>
                                                <DialogDescription>
                                                    Silakan masukkan informasi barang masuk.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleInputSubmit}>
                                                {/* waktu, pj, jumlah, tipe proses */}
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <Input
                                                        id="tipe"
                                                        name="tipe"
                                                        type="hidden"
                                                        defaultValue={"in"}
                                                        required
                                                    />
                                                    <div>
                                                        <Label htmlFor="tgl_mulai" className="block text-sm font-medium">
                                                            Waktu mulai
                                                        </Label>
                                                        <Input
                                                            id="tgl_mulai"
                                                            name="tgl_mulai"
                                                            type="datetime-local"
                                                            defaultValue={new Date().toISOString().slice(0, 16)}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="tgl_selesai" className="block text-sm font-medium">
                                                            Waktu selesai
                                                        </Label>
                                                        <Input
                                                            id="tgl_selesai"
                                                            name="tgl_selesai"
                                                            type="datetime-local"
                                                            defaultValue={new Date().toISOString().slice(0, 16)}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="proses_id" className="block text-sm font-medium">
                                                            Tipe Proses
                                                        </Label>
                                                        <select
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            id="proses_id"
                                                            name="proses_id"
                                                            required
                                                        >
                                                            <option value="">Pilih Tipe</option>
                                                            <option value="1">Gudang</option>
                                                            <option value="2">Potong</option>
                                                            <option value="3">Jahit</option>
                                                            <option value="4">Lipat</option>
                                                            <option value="5">QC</option>
                                                            <option value="6">Stok</option>

                                                        </select>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="jumlah" className="block text-sm font-medium">
                                                            Jumlah
                                                        </Label>
                                                        <div className="flex">
                                                            <Input
                                                                id="jumlah"
                                                                name="jumlah"
                                                                type="number"
                                                                min="1"
                                                                placeholder="0"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="pekerja" className="block text-sm font-medium">
                                                            Penanggung Jawab
                                                        </Label>
                                                        <select
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            id="pekerja"
                                                            name="pekerja"
                                                            required
                                                        >
                                                            <option value="">Pilih</option>
                                                            <option value="1">Ka. Produksi</option>
                                                            <option value="2">Bondan</option>
                                                            <option value="3">Amin</option>
                                                            <option value="4">Sofyan</option>
                                                            <option value="5">Budi</option>
                                                            <option value="6">Halim</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Button type="submit" className="w-full">
                                                            Simpan
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Dialog untuk barang keluar */}
                                    <Dialog>
                                        <DialogTrigger className="hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent px-4 py-2 mb-4 cursor-pointer">Keluar</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Barang Keluar</DialogTitle>
                                                <DialogDescription>
                                                    Silakan masukkan informasi barang keluar.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleInputSubmit}>
                                                {/* waktu, pj, jumlah, tipe proses */}
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <Input
                                                        id="tipe"
                                                        name="tipe"
                                                        type="hidden"
                                                        defaultValue={"out"}
                                                        required
                                                    />
                                                    <div>
                                                        <Label htmlFor="tgl_mulai" className="block text-sm font-medium">
                                                            Waktu mulai
                                                        </Label>
                                                        <Input
                                                            id="tgl_mulai"
                                                            name="tgl_mulai"
                                                            type="datetime-local"
                                                            defaultValue={new Date().toISOString().slice(0, 16)}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="tgl_selesai" className="block text-sm font-medium">
                                                            Waktu selesai
                                                        </Label>
                                                        <Input
                                                            id="tgl_selesai"
                                                            name="tgl_selesai"
                                                            type="datetime-local"
                                                            defaultValue={new Date().toISOString().slice(0, 16)}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="proses_id" className="block text-sm font-medium">
                                                            Tipe Proses
                                                        </Label>
                                                        <select
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            id="proses_id"
                                                            name="proses_id"
                                                            required
                                                        >
                                                            <option value="">Pilih Tipe</option>
                                                            <option value="1">Gudang</option>
                                                            <option value="2">Potong</option>
                                                            <option value="3">Jahit</option>
                                                            <option value="4">Lipat</option>
                                                            <option value="5">QC</option>
                                                            <option value="6">Stok</option>

                                                        </select>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="jumlah" className="block text-sm font-medium">
                                                            Jumlah
                                                        </Label>
                                                        <div className="flex">
                                                            <Input
                                                                id="jumlah"
                                                                name="jumlah"
                                                                type="number"
                                                                min="1"
                                                                placeholder="0"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="pekerja" className="block text-sm font-medium">
                                                            Penanggung Jawab
                                                        </Label>
                                                        <select
                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                            id="pekerja"
                                                            name="pekerja"
                                                            required
                                                        >
                                                            <option value="">Pilih</option>
                                                            <option value="1">Ka. Produksi</option>
                                                            <option value="2">Bondan</option>
                                                            <option value="3">Amin</option>
                                                            <option value="4">Sofyan</option>
                                                            <option value="5">Budi</option>
                                                            <option value="6">Halim</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Button type="submit" className="w-full">
                                                            Simpan
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                {/* Proses  */}
                                <div className='flex gap-4 overflow-x-auto'>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center w-full">
                                            Gudang
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi?.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi[0].data?.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.nama_pekerja || 'N/A'} item={`${prod.jumlah} Roll`} />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Potong
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi?.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi[1].data?.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.nama_pekerja || 'N/A'} item={`${prod.jumlah} Pcs`} />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Jahit
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi?.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi[2].data?.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.nama_pekerja || 'N/A'} item={`${prod.jumlah} Pcs`} />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Lipat
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi?.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi[3].data?.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.nama_pekerja || 'N/A'} item={`${prod.jumlah} Pcs`} />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            QC
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi?.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi[4].data?.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.nama_pekerja || 'N/A'} item={`${prod.jumlah} Pcs`} />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Stok
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi?.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi[5].data?.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.nama_pekerja || 'N/A'} item={`${prod.jumlah} Pcs`} />
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout >
    )
}
