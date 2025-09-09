export type Product = {
    id: number;
    sku: string;
    nama: string;
    gambar: string;
    harga: string;
    deskripsi: string;
    material_id: number | null;
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

export type Production = {
    id: number;
    produk_id: number;
    nama_proses: string;
    tipe: string;
    jumlah: number;
    ditugaskan: string | null;
    data?: [];
};

export type Bahan = {
    id: number;
    nama: string;
    tipe: string;
    stok_qty: number;
    satuan: string;
};
