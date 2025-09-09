<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BatchProses;
use App\Models\Material;
use App\Models\Produk;
use Illuminate\Bus\Batch;
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
            'produk_id' => $data['produk_id'] ?? null,
            'tgl_mulai' => $data['tgl_mulai'],
            'tgl_selesai' => $data['tgl_selesai'] ?? null,
            'tipe' => $data['tipe'],
            'jumlah' => $data['jumlah'] ?? null,
        ];
        $val = request()->validate([
            'batch_id' => 'required|exists:batch_produksi,id',
            'proses_id' => 'required|exists:proses_produksi,id',
            'pekerja_id' => 'required|exists:pekerja,id',
            'produk_id' => 'required',
            'tgl_mulai' => 'nullable|date',
            'tgl_selesai' => 'nullable|date|after_or_equal:tgl_mulai',
            'tipe' => 'required|in:in,out',
            'jumlah' => 'required|integer|min:0',
        ]);

        if (!$val) {
            return response()->json(['error' => 'Validation failed'], 400);
        }

        if ($data['proses_id'] == 1 && $data['tipe'] == 'out') {
            //mengurangi stok material
            $produkId = $data['produk_id'];
            $materialId = Produk::where('id', $produkId)->first()->material_id;
            $jumlahPakai = $data['jumlah'];
            $material = Material::find($materialId);
            // decrement stok_qty
            $material->decrement('stok_qty', $jumlahPakai);
            $material->save();
        }

        $batch = BatchProses::create($data);
        return response()->json(['data' => $batch], 201);
    }

    public function update($id)
    {
        $data = request()->json()->all();
        $data = [
            'pekerja_id' => $data['pekerja_id'],
            // 'tgl_mulai' => $data['tgl_mulai'],
            // 'tgl_selesai' => $data['tgl_selesai'] ?? null,
            'tipe' => $data['tipe'],
            'jumlah' => $data['jumlah'] ?? null,
        ];

        $val = request()->validate([
            'pekerja_id' => 'required|exists:pekerja,id',
            // 'tgl_mulai' => 'nullable|date',
            // 'tgl_selesai' => 'nullable|date|after_or_equal:tgl_mulai',
            'tipe' => 'required|in:in,out',
            'jumlah' => 'required|integer|min:0',
        ]);
        if (!$val) {
            return response()->json(['error' => 'Validation failed'], 400);
        }
        $batch = BatchProses::find($id);
        if (!$batch) {
            return response()->json(['error' => 'Data not found'], 404);
        }
        $batch->update($data);
        return response()->json(['data' => $batch], 200);
    }

    public function destroy($id)
    {
        $batch = BatchProses::find($id);
        if (!$batch) {
            return response()->json(['error' => 'Data not found'], 404);
        }
        $batch->delete();
        return response()->json(['message' => 'Data deleted'], 200);
    }
}
