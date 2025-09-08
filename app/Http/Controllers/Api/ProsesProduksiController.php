<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BatchProses;
use App\Models\ProsesProduksi;
use Illuminate\Http\Request;

class ProsesProduksiController extends Controller
{

    public function index()
    {
        $data = ProsesProduksi::all();
        return response()->json([
            'data' => $data,
            'message' => 'Berhasil'
        ]);
    }

    public function get($productId, $batchId)
    {
        $data = BatchProses::where('batch_id', $batchId)
            // ->whereHas('batchProduksi', function ($query) use ($productId) {
            //     $query->where('id', $productId);
            // })
            ->orderBy('proses_id', 'asc')
            ->join('pekerja', 'pekerja.id', '=', 'batch_proses.pekerja_id')
            ->select('batch_proses.*', 'pekerja.nama', 'pekerja.jabatan')
            ->get()
            ->groupBy('proses_id')
            ->map(function ($group) {
                return [
                    'proses_id' => $group->first()->proses_id,
                    'data' => $group->sortBy('created_at')->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'pekerja_id' => $item->pekerja_id,
                            'nama_pekerja' => $item->nama,
                            'jabatan_pekerja' => $item->jabatan,
                            'tgl_mulai' => $item->tgl_mulai,
                            'tgl_selesai' => $item->tgl_selesai,
                            'status' => $item->status,
                            'tipe' => $item->tipe,
                            'jumlah' => $item->jumlah,
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
