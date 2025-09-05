<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Material
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('tipe', ['bahan_baku', 'produk_jadi', 'produk_gagal']);
            $table->integer('stok_qty')->default(0);
            $table->string('satuan')->nullable();
            $table->timestamps();
        });

        // Produk
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('nama');
            $table->string('gambar')->nullable();
            $table->integer('harga');
            $table->text('deskripsi')->nullable();
            $table->string('bahan')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });

        // ProdukBahan (relasi M:N antara Produk dan Material)
        Schema::create('produk_bahan', function (Blueprint $table) {
            $table->foreignId('produk_id')->constrained('produks')->onDelete('cascade');
            $table->foreignId('material_id')->constrained('materials')->onDelete('cascade');
            $table->integer('qty');
            $table->primary(['produk_id', 'material_id']);
        });

        // BatchProduksi
        Schema::create('batch_produksi', function (Blueprint $table) {
            $table->id();
            $table->string('kode_batch');
            $table->foreignId('produk_id')->constrained('produks')->onDelete('cascade');
            $table->string('tgl_mulai')->nullable();
            $table->string('tgl_selesai')->nullable();
            $table->integer('jumlah_target');
            $table->string('status')->default('draft'); // draft, in_progress, selesai
            $table->timestamps();
        });

        // BatchBahan
        // Schema::create('batch_bahan', function (Blueprint $table) {
        //     $table->foreignId('batch_id')->constrained('batch_produksi')->onDelete('cascade');
        //     $table->foreignId('material_id')->constrained('materials')->onDelete('cascade');
        //     $table->integer('qty_pakai');
        //     $table->primary(['batch_id', 'material_id']);
        // });

        // ProsesProduksi
        Schema::create('proses_produksi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_proses');
            $table->string('deskripsi')->nullable();
        });

        // Pekerja
        Schema::create('pekerja', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('jabatan');
            $table->decimal('upah', 12, 2)->default(0);
            $table->string('wa')->nullable();
            $table->timestamps();
        });

        // BatchProses
        Schema::create('batch_proses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_id')->constrained('batch_produksi')->onDelete('cascade');
            $table->foreignId('proses_id')->constrained('proses_produksi')->onDelete('cascade');
            $table->foreignId('pekerja_id')->constrained('pekerja')->onDelete('cascade');
            $table->dateTime('tgl_mulai')->nullable();
            $table->dateTime('tgl_selesai')->nullable();
            $table->string('tipe');
            $table->integer('jumlah')->default(0);
            $table->string('status')->default('in_progress'); // in_progress, done, failed
            $table->timestamps();
        });

        // Pembayaran
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pekerja_id')->constrained('pekerja')->onDelete('cascade');
            $table->string('periode'); // misal: 2025-08
            $table->integer('jumlah_unit')->default(0);
            $table->decimal('total_upah', 15, 2)->default(0);
            $table->timestamps();
        });

        // Seeder
        Artisan::call('db:seed', [
            '--class' => 'DatabaseSeeder',
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
        Schema::dropIfExists('batch_proses');
        Schema::dropIfExists('pekerja');
        Schema::dropIfExists('proses_produksi');
        Schema::dropIfExists('batch_bahan');
        Schema::dropIfExists('batch_produksi');
        Schema::dropIfExists('produk_bahans');
        Schema::dropIfExists('produks');
        Schema::dropIfExists('materials');
    }
};
