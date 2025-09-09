<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $table = 'materials';

    protected $fillable = [
        'nama',
        'tipe',
        'stok_qty',
        'satuan',
    ];
}
