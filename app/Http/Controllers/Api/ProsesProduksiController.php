<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProsesProduksiController extends Controller
{
    public function get(
        $productId,
        $batchId
    ) {
        $data = \App\Models\ProsesProduksi::where('id', $batchId)
            ->whereHas('produks', function ($query) use ($productId) {
                $query->where('id', $productId);
            })
            ->orderBy('created_at', 'asc')
            ->get()
            ->groupBy('nama_proses')
            ->map(function ($group) {
                return [
                    'nama_proses' => $group->first()->nama_proses,
                    'data' => $group->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'tipe' => $item->tipe,
                            'jumlah' => $item->jumlah,
                            'ditugaskan' => $item->ditugaskan,
                            'created_at' => $item->created_at,
                        ];
                    })->values()
                ];
            })
            ->values();

        return response()->json([
            'data' => $data,
            'message' => 'Berhasil'
        ]);
    }

    public function store(Request $request) {}
}
