import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { PackageOpen, User } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button';

export default function ProcessProductionCard({ id, type, time, pj, item, data }: { id: number, type: 'in' | 'out', time: string, pj: string, item: string, data: any }) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className={`pb-2 p-1 rounded-md ${data.tipe === 'in' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className='text-xs text-gray-800'>
                            {time}
                        </p>
                        <div className=" mt-2">
                            <Badge variant="secondary">
                                <User className='inline mb-1 mr-1' />
                                {data.nama_pekerja}
                            </Badge>
                            <Badge variant="secondary" className={`text-white ${data.tipe === 'in' ? 'bg-green-700' : 'bg-red-700'}`}>
                                <PackageOpen className='inline mb-1 mr-1' />
                                {data.jumlah}
                            </Badge>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{data.nama_pekerja}</DialogTitle>
                        <DialogDescription>
                            Silakan masukkan informasi barang masuk.
                        </DialogDescription>
                    </DialogHeader>
                    <form >
                        {/* waktu, pj, jumlah, tipe proses */}
                        {/* <div className="grid grid-cols-2 gap-4 mb-4">
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
                        </div> */}
                        <Button variant="ghost" className='text-red-600'>Hapus</Button>
                        <DialogFooter className='flex justify-between'>
                            <div>
                                <Button type="submit" id="drawer-submit-btn">Simpan</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )
}
