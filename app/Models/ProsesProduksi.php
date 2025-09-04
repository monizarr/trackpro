<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProsesProduksi extends Model
{
    protected $table = 'proses_produksi';

    protected $fillable = [
        'nama_proses',
        'tipe',
        'jumlah',
        'ditugaskan',
        'jumlah'
    ];

    public function produks()
    {
        return $this->belongsTo(Produk::class, 'id');
    }
}
