<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BatchProses;
use Illuminate\Http\Request;

class BatchProsesProduksiController extends Controller
{
    public function store()
    {
        // get request
        $data = request()->json()->all();
        $data = [
            'batch_id' => $data['batch_id'],
            'proses_id' => $data['proses_id'],
            'pekerja_id' => $data['pekerja_id'],
            'tgl_mulai' => $data['tgl_mulai'],
            'tgl_selesai' => $data['tgl_selesai'] ?? null,
            'tipe' => $data['tipe'],
            'jumlah' => $data['jumlah'] ?? null,
        ];

        $val = request()->validate([
            'batch_id' => 'required|exists:batch_produksi,id',
            'proses_id' => 'required|exists:proses_produksi,id',
            'pekerja_id' => 'required|exists:pekerja,id',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'nullable|date|after_or_equal:tgl_mulai',
            'tipe' => 'required|in:in,out',
            'jumlah' => 'required|integer|min:0',
        ]);
        if (!$val) {
            return response()->json(['error' => 'Validation failed'], 400);
        }
        $batch = BatchProses::create($data);
        return response()->json(['data' => $batch], 201);
    }
}
