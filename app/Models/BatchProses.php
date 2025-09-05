<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchProses extends Model
{
    protected $table = 'batch_proses';

    protected $fillable = [
        'batch_id',
        'proses_id',
        'pekerja_id',
        'tipe',
        'tgl_mulai',
        'tgl_selesai',
        'status',
        'jumlah',
    ];

    public function produks()
    {
        return $this->belongsTo(BatchProduction::class, 'batch_id', 'id');
    }
}
