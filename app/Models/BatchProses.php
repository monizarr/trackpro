<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchProses extends Model
{
    protected $table = 'batch_proses';

    protected $fillable = [
        'batch_id',
        'produk_id',
        'proses_id',
        'pekerja_id',
        'tipe',
        'tgl_mulai',
        'tgl_selesai',
        'status',
        'jumlah',
    ];

    public function batchProduksi()
    {
        return $this->belongsTo(BatchProduction::class, 'batch_id', 'id');
    }

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'produk_id', 'id');
    }
}
