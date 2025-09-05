<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PekerjaModel extends Model
{
    protected $table = 'pekerja';

    protected $fillable = [
        'nama',
        'jabatan',
        'upah',
        'wa'
    ];
}
