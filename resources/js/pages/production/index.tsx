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
import { Select } from '@radix-ui/react-select';
import { SortingState } from "@tanstack/react-table";
import axios from 'axios';
import { PackageOpen, PlusCircle, User } from 'lucide-react';
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
    const [pekerja, setPekerja] = useState<any>([]);
    const [proses, setProses] = useState<any>([]);

    useEffect(() => {
        axios.get(`/api/proses-produksi/${productId}/${batchId}`)
            .then((response) => {
                setProduksi(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching produksi:', error);
            });

        axios.get('/api/pekerja')
            .then((response) => {
                setPekerja(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching pekerja:', error);
            });

        axios.get('/api/proses-produksi-list')
            .then((response) => {
                setProses(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching proses:', error);
            });
    }, []);

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formDataEntries = Object.fromEntries(formData.entries());
        const data: Record<string, any> = {
            batch_id: batchId,
            proses_id: formDataEntries.proses_id,
            tipe: formDataEntries.tipe,
            pekerja_id: formDataEntries.pekerja,
            jumlah: formDataEntries.jumlah,
            tgl_mulai: null,
            tgl_selesai: null,
        };

        // Format the datetime from the waktu field
        const formattedDateTime = `${(formDataEntries.waktu as string).replace('T', ' ')}:00`;

        // Set tgl_mulai or tgl_selesai based on the type
        if (formDataEntries.tipe === 'in') {
            data.tgl_mulai = formattedDateTime;
        } else if (formDataEntries.tipe === 'out') {
            data.tgl_selesai = formattedDateTime;
        }

        console.log("data =>", data);
        axios.post('/api/batch-proses-produksi', data)
            .then((response) => {
                console.log('Success:', response.data);
                // refresh data
                axios.get(`/api/proses-produksi/${productId}/${batchId}`)
                    .then((response) => {
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
                                <div className='flex gap-4 overflow-x-auto'>
                                    {
                                        proses.map((proses: { id: number, nama_proses: string }) => (
                                            <div key={proses.id} className='min-w-[180px]'>
                                                <div className="flex justify-between bg-primary text-white px-3 py-2 rounded text-center w-full">
                                                    {proses.nama_proses}

                                                    <Dialog>
                                                        <DialogTrigger className='cursor-pointer'><PlusCircle /></DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Data {proses.nama_proses}</DialogTitle>
                                                                <DialogDescription>
                                                                    Silakan masukkan informasi {proses.nama_proses}.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <form onSubmit={handleInputSubmit}>
                                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                                    <div>
                                                                        <Label htmlFor="tipe" className="block text-sm font-medium">
                                                                            Tipe
                                                                        </Label>
                                                                        <select
                                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                                            id="tipe"
                                                                            name="tipe"
                                                                            required
                                                                        >
                                                                            <option value="in">Masuk</option>
                                                                            <option value="out">Keluar</option>
                                                                        </select>
                                                                    </div>
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
                                                                        <Label htmlFor="proses_id" className="block text-sm font-medium">
                                                                            Nama Proses
                                                                        </Label>
                                                                        <select
                                                                            className="w-full border rounded px-3 py-2 text-sm"
                                                                            id="proses_id"
                                                                            name="proses_id"
                                                                            required
                                                                        >
                                                                            <option value={proses.id}>{proses.nama_proses} </option>
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
                                                                            {
                                                                                pekerja.map((p: any) => (
                                                                                    <option key={p.id} value={p.id}>{p.nama}</option>
                                                                                ))
                                                                            }
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
                                                <div className="border w-full p-2 min-h-[20vh] flex flex-col divide-y gap-2">
                                                    {
                                                        produksi?.length === 0 ? (
                                                            <div className='text-center text-sm text-gray-500'>
                                                                Tidak ada data
                                                            </div>
                                                        ) : (
                                                            produksi[proses.id - 1]?.data?.map((prod: any) => (
                                                                <ProcessProductionCard
                                                                    key={prod.id}
                                                                    time={new Date(prod.created_at).toLocaleDateString('id-ID', {
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                    })}
                                                                    data={prod}
                                                                    pekerja={pekerja}
                                                                />
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout >
    )
}
