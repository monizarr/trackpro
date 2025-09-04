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
    const [produksi, setProduksi] = useState<Production>({
        id: Number(batchId),
        produk_id: Number(productId),
        nama_proses: 'gudang',
        tipe: 'input',
        jumlah: 0,
        ditugaskan: null,
        data: [],
    });

    const today = new Date();

    useEffect(() => {
        axios.get(`/api/proses-produksi/${produksi.produk_id}/${produksi.id}`)
            .then((response) => {
                setProduksi(response.data.data);
                console.log("produksi =>", response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching produksi:', error);
            });
    }, []);


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
                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Barang Masuk</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Input Barang</DialogTitle>
                                        <DialogDescription>
                                            Masukkan informasi barang masuk.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="waktu">Waktu</Label>
                                            <Input
                                                id="waktu"
                                                name="waktu"
                                                type="datetime-local"
                                                defaultValue={new Date().toISOString().slice(0, 16)}
                                                required
                                            />
                                        </div>
                                        {/* input jumlah */}
                                        <div className="grid gap-3">
                                            <Label htmlFor="jumlah">Jumlah</Label>
                                            <div className="flex">
                                                <Input
                                                    id="jumlah"
                                                    name="jumlah"
                                                    type="number"
                                                    min="1"
                                                    placeholder="0"
                                                    required
                                                />
                                                <select
                                                    className="ml-2 border rounded px-2 py-2 text-sm"
                                                    id="satuan"
                                                    name="satuan"
                                                >
                                                    <option value="pcs">Pcs</option>
                                                    <option value="roll">Roll</option>
                                                    <option value="lusin">Lusin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="tipe_proses">Tipe Proses</Label>
                                            <select
                                                className="w-full border rounded px-3 py-2 text-sm"
                                                id="tipe_proses"
                                                name="tipe_proses"
                                                required
                                            >
                                                <option value="">Pilih Tipe</option>
                                                <option value="potong">Potong</option>
                                                <option value="jahit">Jahit</option>
                                                <option value="lipat">Lipat</option>
                                                <option value="qc">QC</option>
                                                <option value="stok">Stok</option>

                                            </select>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="pj">Penanggung Jawab</Label>
                                            <select
                                                className="w-full border rounded px-3 py-2 text-sm"
                                                id="pj"
                                                name="pj"
                                                required
                                            >
                                                <option value="">Pilih</option>
                                                <option value="Ka. Produksi">Ka. Produksi</option>
                                                <option value="Bondan">Bondan</option>
                                                <option value="Amin">Amin</option>
                                                <option value="Sofyan">Sofyan</option>
                                                <option value="Budi">Budi</option>
                                                <option value="Halim">Halim</option>
                                            </select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>
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
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Kegiatan Produksi</CardTitle>
                            <CardDescription>Daftar Kegiatan Produksi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="">
                                <Dialog>
                                    <DialogTrigger className="hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent px-4 py-2 mb-4 cursor-pointer">Masuk</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Barang Masuk</DialogTitle>
                                            <DialogDescription>
                                                Silakan masukkan informasi barang masuk.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form>
                                            {/* waktu, pj, jumlah, tipe proses */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor="waktu" className="block text-sm font-medium">
                                                        Waktu
                                                    </Label>
                                                    <Input
                                                        id="waktu"
                                                        name="waktu"
                                                        type="datetime-local"
                                                        defaultValue={new Date().toISOString().slice(0, 16)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="tipe_proses" className="block text-sm font-medium">
                                                        Tipe Proses
                                                    </Label>
                                                    <select
                                                        className="w-full border rounded px-3 py-2 text-sm"
                                                        id="tipe_proses"
                                                        name="tipe_proses"
                                                        required
                                                    >
                                                        <option value="">Pilih Tipe</option>
                                                        <option value="gudang">Gudang</option>
                                                        <option value="potong">Potong</option>
                                                        <option value="jahit">Jahit</option>
                                                        <option value="lipat">Lipat</option>
                                                        <option value="qc">QC</option>
                                                        <option value="stok">Stok</option>

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
                                                    <Label htmlFor="pj" className="block text-sm font-medium">
                                                        Penanggung Jawab
                                                    </Label>
                                                    <select
                                                        className="w-full border rounded px-3 py-2 text-sm"
                                                        id="pj"
                                                        name="pj"
                                                        required
                                                    >
                                                        <option value="">Pilih</option>
                                                        <option value="Ka. Produksi">Ka. Produksi</option>
                                                        <option value="Bondan">Bondan</option>
                                                        <option value="Amin">Amin</option>
                                                        <option value="Sofyan">Sofyan</option>
                                                        <option value="Budi">Budi</option>
                                                        <option value="Halim">Halim</option>
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
                                <Dialog>
                                    <DialogTrigger className="hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-input bg-background shadow-xs hover:bg-accent px-4 py-2 mb-4 cursor-pointer">Keluar</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Barang Keluar</DialogTitle>
                                            <DialogDescription>
                                                Silakan masukkan informasi barang Keluar.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form>
                                            {/* waktu, pj, jumlah, tipe proses */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor="waktu" className="block text-sm font-medium">
                                                        Waktu
                                                    </Label>
                                                    <Input
                                                        id="waktu"
                                                        name="waktu"
                                                        type="datetime-local"
                                                        defaultValue={new Date().toISOString().slice(0, 16)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="pj" className="block text-sm font-medium">
                                                        Penanggung Jawab
                                                    </Label>
                                                    <select
                                                        className="w-full border rounded px-3 py-2 text-sm"
                                                        id="pj"
                                                        name="pj"
                                                        required
                                                    >
                                                        <option value="">Pilih</option>
                                                        <option value="Ka. Produksi">Ka. Produksi</option>
                                                        <option value="Bondan">Bondan</option>
                                                        <option value="Amin">Amin</option>
                                                        <option value="Sofyan">Sofyan</option>
                                                        <option value="Budi">Budi</option>
                                                        <option value="Halim">Halim</option>
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
                                                        <select
                                                            className="ml-2 border rounded px-2 py-2 text-sm"
                                                            id="satuan"
                                                            name="satuan"
                                                        >
                                                            <option value="pcs">Pcs</option>
                                                            <option value="roll">Roll</option>
                                                            <option value="lusin">Lusin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="tipe_proses" className="block text-sm font-medium">
                                                        Tipe Proses
                                                    </Label>
                                                    <select
                                                        className="w-full border rounded px-3 py-2 text-sm"
                                                        id="tipe_proses"
                                                        name="tipe_proses"
                                                        required
                                                    >
                                                        <option value="">Pilih Tipe</option>
                                                        <option value="potong">Potong</option>
                                                        <option value="jahit">Jahit</option>
                                                        <option value="lipat">Lipat</option>
                                                        <option value="qc">QC</option>
                                                        <option value="stok">Stok</option>

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
                                <div className='flex gap-4 overflow-x-auto'>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center w-full">
                                            Gudang
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            <div className='pb-2 bg-red-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Sabtu, <br /> 02-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' />
                                                        Ka. Produksi
                                                    </Badge>
                                                    <Badge variant="secondary" className='bg-red-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        4 Roll
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className='pb-2 bg-red-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Minggu, <br /> 03-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' /> Ka. Produksi</Badge>
                                                    <Badge variant="secondary" className='bg-red-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        1 Roll
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Potong
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            {
                                                produksi.data.length === 0 ? (
                                                    <div className='text-center text-sm text-gray-500'>
                                                        Tidak ada data
                                                    </div>
                                                ) : (
                                                    produksi.data.map((prod: any) => (
                                                        <ProcessProductionCard key={prod.id} type={prod.tipe} time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })} pj={prod.ditugaskan || 'N/A'} item={`${prod.jumlah} Pcs`} />
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
                                            <ProcessProductionCard type="input" time='Sabtu, 02-09-2025' pj='Sofyan' item='100 Pcs' />
                                            <ProcessProductionCard type="input" time='Sabtu, 02-09-2025' pj='Budi' item='100 Pcs' />
                                            <ProcessProductionCard type="input" time='Sabtu, 02-09-2025' pj='Halim' item='200 Pcs' />
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Lipat
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            <div className='pb-2 bg-green-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Sabtu, <br /> 02-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' /> Ka. Produksi</Badge>
                                                    <Badge variant="secondary" className='bg-green-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        400 Pcs
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className='pb-2 bg-red-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Minggu, <br /> 03-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' /> Ka. Produksi</Badge>
                                                    <Badge variant="secondary" className='bg-red-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        100 Pcs
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            QC
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            <div className='pb-2 bg-green-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Sabtu, <br /> 02-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' /> Ka. Produksi</Badge>
                                                    <Badge variant="secondary" className='bg-green-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        400 Pcs
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className='pb-2 bg-red-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Minggu, <br /> 03-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' /> Ka. Produksi</Badge>
                                                    <Badge variant="secondary" className='bg-red-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        100 Pcs
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='min-w-[180px]'>
                                        <div className="bg-primary text-white px-3 py-2 rounded text-center">
                                            Stok
                                        </div>
                                        <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                            <div className='pb-2 bg-green-50 p-1 rounded-md'>
                                                <p className='text-xs text-gray-800'>
                                                    Sabtu, <br /> 02-09-2025
                                                </p>
                                                <div className=" mt-2">
                                                    <Badge variant="secondary">
                                                        <User className='inline mb-1 mr-1' /> Ka. Produksi</Badge>
                                                    <Badge variant="secondary" className='bg-green-700 text-white'>
                                                        <PackageOpen className='inline mb-1 mr-1' />
                                                        400 Pcs
                                                    </Badge>
                                                </div>
                                            </div>
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
