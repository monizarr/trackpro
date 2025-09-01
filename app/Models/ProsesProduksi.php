<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProsesProduksi extends Model
{
    protected $table = 'proses_produksi';

    protected $fillable = [
        'nama_proses',
        'urutan',
    ];
}
