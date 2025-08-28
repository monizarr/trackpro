<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchProduction extends Model
{

    protected $table = 'batch_produksi';

    protected $fillable = [
        'produk_id',
        'kode_batch',
        'tgl_mulai',
        'tgl_selesai',
        'jumlah_target',
        'status',
    ];
}
