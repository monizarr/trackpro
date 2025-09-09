<?php

namespace Database\Seeders;

use App\Models\BatchProduction;
use App\Models\BatchProses;
use App\Models\PekerjaModel;
use App\Models\Produk;
use App\Models\ProsesProduksi;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'role' => '3',
        // ]);

        Produk::insert([
            [
                'nama' => 'Test Product',
                'deskripsi' => 'This is a test product.',
                'harga' => 90000,
                'gambar' => "https://i.pinimg.com/236x/e1/08/2e/e1082e43c31769cca1575187860d599b.jpg",
                'sku' => 'TEST-PRODUCT-001',
                'status' => 'active',
                'created_at' => now()
            ],
            [
                'nama' => 'Test Product 2',
                'deskripsi' => 'This is a test product 2.',
                'harga' => 80000,
                'gambar' => "https://i.pinimg.com/736x/6a/72/ce/6a72cef6f2992ef1fb60c5045c218f5d.jpg",
                'sku' => 'TEST-PRODUCT-002',
                'status' => 'active',
                'created_at' => now()
            ],
            [
                'nama' => 'Test Product 3',
                'deskripsi' => 'This is a test product 3.',
                'harga' => 70000,
                'gambar' => "https://i.pinimg.com/236x/2c/34/96/2c3496da3310c58e9ac8ed17201618c3.jpg",
                'sku' => 'TEST-PRODUCT-003',
                'status' => 'active',
                'created_at' => now()
            ]
        ]);

        ProsesProduksi::insert([
            [
                'nama_proses' => 'Gudang',
                'deskripsi' => 'Proses penyimpanan bahan baku.',
            ],
            [
                'nama_proses' => 'Potong',
                'deskripsi' => 'Proses pemotongan bahan baku.',
            ],
            [
                'nama_proses' => 'Jahit',
                'deskripsi' => 'Proses penjahitan bahan baku.',
            ],
            [
                'nama_proses' => 'Lipat',
                'deskripsi' => 'Proses pelipatan bahan baku.',
            ],
            [
                'nama_proses' => 'QC',
                'deskripsi' => 'Proses pengendalian kualitas bahan baku.',
            ],
            [
                'nama_proses' => 'Stok',
                'deskripsi' => 'Proses pengendalian stok bahan baku.',
            ],
        ]);

        PekerjaModel::insert([
            [
                'nama' => 'John Doe',
                'jabatan' => 1,
                'upah' => 100000,
                'wa' => '081234567890'
            ],
            [
                'nama' => 'Budi Santoso',
                'jabatan' => 2,
                'upah' => 100000,
                'wa' => '081234567895'
            ],
            [
                'nama' => 'Jane Smith',
                'jabatan' => 3,
                'upah' => 150000,
                'wa' => '081234567891'
            ],
            [
                'nama' => 'Bob Johnson',
                'jabatan' => 3,
                'upah' => 200000,
                'wa' => '081234567892'
            ],
            [
                'nama' => 'Alice Williams',
                'jabatan' => 4,
                'upah' => 120000,
                'wa' => '081234567893'
            ],
            [
                'nama' => 'Charlie Brown',
                'jabatan' => 5,
                'upah' => 90000,
                'wa' => '081234567894'
            ],
        ]);

        BatchProduction::insert([
            [
                'kode_batch' => 'GAMIS-001',
                'produk_id' => 1,
                'tgl_mulai' => now(),
                'tgl_selesai' => null,
                'jumlah_target' => 100,
                'status' => 'in_progress',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        BatchProses::insert([
            [
                'batch_id' => 1,
                'produk_id' => 1,
                'proses_id' => 1,
                'pekerja_id' => 1,
                'tgl_mulai' => now(),
                'tgl_selesai' => now()->addHours(2),
                'status' => 'done',
                'tipe' => 'out',
                'jumlah' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'batch_id' => 1,
                'produk_id' => 1,
                'proses_id' => 2,
                'pekerja_id' => 2,
                'tgl_mulai' => now()->addHours(2),
                'tgl_selesai' => now()->addHours(4),
                'status' => 'done',
                'tipe' => 'in',
                'jumlah' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'batch_id' => 1,
                'produk_id' => 1,
                'proses_id' => 3,
                'pekerja_id' => 3,
                'tgl_mulai' => now()->addHours(4),
                'tgl_selesai' => now()->addHours(6),
                'status' => 'in_progress',
                'tipe' => 'in',
                'jumlah' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'batch_id' => 1,
                'produk_id' => 1,
                'proses_id' => 4,
                'pekerja_id' => 4,
                'tgl_mulai' => null,
                'tgl_selesai' => null,
                'status' => 'in_progress',
                'tipe' => 'in',
                'jumlah' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
