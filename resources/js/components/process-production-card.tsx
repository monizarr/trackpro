import { PackageOpen, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';

export default function ProcessProductionCard({ time, data, pekerja }: { time: string, data: any, pekerja: any }) {

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);

        axios.put(`/api/batch-proses-produksi/${data.id}`, {
            waktu: formValues.waktu,
            pekerja_id: formValues.pekerja_id,
            jumlah: formValues.jumlah,
            tipe: formValues.tipe,
        })
            .then(response => {
                console.log('Data updated successfully:', response.data);
                // Optionally, you can add code to update the UI or notify the user
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error updating the data:', error);
                // Optionally, you can add code to notify the user of the error
            });
    }

    const handleDelete = () => {
        axios.delete(`/api/batch-proses-produksi/${data.id}`)
            .then(response => {
                console.log('Data deleted successfully:', response.data);
                // Optionally, you can add code to update the UI or notify the user
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error deleting the data:', error);
                // Optionally, you can add code to notify the user of the error
            });
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className={`pb-2 p-1 rounded-md cursor-pointer ${data?.tipe === 'in' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className='text-xs text-gray-800'>
                            {time}
                        </p>
                        <div className=" mt-2">
                            <Badge variant="secondary">
                                <User className='inline mb-1 mr-1' />
                                {data?.nama_pekerja}
                            </Badge>
                            <Badge variant="secondary" className={`text-white ${data?.tipe === 'in' ? 'bg-green-700' : 'bg-red-700'}`}>
                                <PackageOpen className='inline mb-1 mr-1' />
                                {data?.jumlah} {data?.jabatan_pekerja == 1 ? 'Roll' : 'Pcs'}
                            </Badge>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detail {data?.nama_proses}</DialogTitle>
                        <DialogDescription>
                            Silakan masukkan informasi barang masuk.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdate}>
                        {/* waktu, pekerja_id, jumlah, tipe proses */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Label htmlFor="waktu">Waktu</Label>
                                <Input
                                    id="waktu"
                                    name="waktu"
                                    type="datetime-local"
                                    defaultValue={new Date(time).toISOString().slice(0, 16)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="pekerja_id">Penanggung Jawab</Label>
                                <select id="pekerja_id" name="pekerja_id" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                                    <option value="">Pilih Penanggung Jawab</option>
                                    {pekerja && pekerja.map((item: any) => (
                                        <option key={item.id} value={item.id} selected={data?.pekerja_id == item.id ? true : false}>{item.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="jumlah">Jumlah</Label>
                                <Input id="jumlah" name="jumlah" type="number" defaultValue={data?.jumlah} />
                            </div>
                            <div>
                                <Label htmlFor="tipe">Tipe Proses</Label>
                                <select id="tipe" name="tipe" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                                    <option value="in" selected={data?.tipe === 'in' ? true : false}>Masuk</option>
                                    <option value="out" selected={data?.tipe === 'out' ? true : false}>Keluar</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <Button type="submit" className="w-full">
                                    Simpan
                                </Button>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className='flex justify-between w-full'>
                                <Button variant="ghost" className='text-red-600' onClick={handleDelete}>Hapus</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )
}
