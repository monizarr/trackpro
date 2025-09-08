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
            ->join('proses_produksi', 'proses_produksi.id', '=', 'batch_proses.proses_id')
            ->select('batch_proses.*', 'pekerja.nama', 'pekerja.jabatan', 'proses_produksi.nama_proses as nama_proses')
            ->get()
            ->groupBy('proses_id')
            ->map(function ($group) {
                return [
                    'proses_id' => $group->first()->proses_id,
                    'data' => $group->sortBy('created_at')->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'batch_id' => $item->batch_id,
                            'nama_proses' => $item->nama_proses,
                            'proses_id' => $item->proses_id,
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
