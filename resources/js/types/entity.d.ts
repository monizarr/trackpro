export type Product = {
    id: number;
    sku: string;
    nama: string;
    gambar: string;
    harga: string;
    deskripsi: string;
    bahan: string;
    status: string;
};

export type BatchProduction = {
    id: number;
    kode_batch: string;
    produk_id: number;
    tgl_mulai: string;
    tgl_selesai: string;
    jumlah_target: number;
    status: string;
    nama_produk: string;
};
