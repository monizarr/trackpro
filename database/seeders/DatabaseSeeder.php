<?php

namespace Database\Seeders;

use App\Models\Produk;
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
                'gambar' => "",
                'sku' => 'TEST-PRODUCT-001',
                'status' => 'active',
                'created_at' => now()
            ],
            [
                'nama' => 'Test Product 2',
                'deskripsi' => 'This is a test product 2.',
                'harga' => 80000,
                'gambar' => "",
                'sku' => 'TEST-PRODUCT-002',
                'status' => 'active',
                'created_at' => now()
            ],
            [
                'nama' => 'Test Product 3',
                'deskripsi' => 'This is a test product 3.',
                'harga' => 70000,
                'gambar' => "",
                'sku' => 'TEST-PRODUCT-003',
                'status' => 'active',
                'created_at' => now()
            ]
        ]);
    }
}
