<?php

namespace Database\Seeders;

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
                'nama_proses' => 'Potong',
                'urutan' => 1,
            ],
            [
                'nama_proses' => 'Jahit',
                'urutan' => 2,
            ],
            [
                'nama_proses' => 'Lipat',
                'urutan' => 3,
            ],
            [
                'nama_proses' => 'QC',
                'urutan' => 4,
            ],
            [
                'nama_proses' => 'Selesai',
                'urutan' => 5,
            ],
        ]);
    }
}
