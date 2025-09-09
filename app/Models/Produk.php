<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Produk extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'produks';

    protected $fillable = [
        'nama',
        'deskripsi',
        'harga',
        'gambar',
        'kategori',
        'sku',
        'status',
        'material_id',
    ];

    // one to many ke material
    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id', 'id');
    }
}
