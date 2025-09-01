<?php

namespace App\Http\Controllers;

use App\Models\BatchProduction;
use Illuminate\Http\Request;

class BatchProductionController extends Controller
{
    public function getBatchProductions($productId)
    {
        $productions = BatchProduction::where('produk_id', $productId)
            ->select('batch_produksi.*')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $productions,
            'message' => 'Berhasil'
        ]);
    }

    public function storeBatchProduction(Request $request)
    {
        $data = $request->validate([
            'produk_id' => 'required|exists:produks,id',
            'tgl_mulai' => 'required|date_format:Y-m-d H:i:s',
            'tgl_selesai' => 'date_format:Y-m-d H:i:s|nullable',
            'jumlah_target' => 'required|integer|min:1',
            'status' => 'in:draft,in_progress,selesai|nullable',
        ]);

        $last = BatchProduction::orderBy('id', 'desc')->first();
        $lastNumber = $last ? intval(substr($last->kode_batch, 6)) : 0;
        $nextNumber = $lastNumber + 1;
        $data['kode_batch'] = 'BATCH-' . str_pad($nextNumber, 5, '0', STR_PAD_LEFT);

        $batchProduction = BatchProduction::create($data);

        return response()->json([
            'data' => $batchProduction,
            'message' => 'Berhasil'
        ]);
    }

    public function getProductions($productId, $batchId)
    {
        $productions = BatchProduction::where('produk_id', $productId)
            ->where('batch_id', $batchId)
            ->get();

        return response()->json([
            'data' => $productions,
            'message' => 'Berhasil'
        ]);
    }
}
