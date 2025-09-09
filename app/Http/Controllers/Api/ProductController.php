<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BatchProduction;
use App\Models\Produk;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $data = Produk::all();
        return response()->json([
            'data' => $data,
            'message' => 'Berhasil'
        ]);
    }

    public function show($id)
    {
        $data = Produk::find($id);
        if ($data) {
            return response()->json([
                'data' => $data,
                'message' => 'Berhasil'
            ]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'sku' => 'nullable|string|max:100|unique:produks,sku',
            'nama' => 'required|string|max:255',
            'harga' => 'nullable|numeric',
            'status' => 'nullable|string',
            'deskripsi' => 'nullable|string',
        ]);

        $product = Produk::create([
            'sku' => $request->sku,
            'nama' => $request->nama,
            'harga' => $request->harga,
            'status' => $request->status,
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json([
            'data' => $product,
            'message' => 'Produk berhasil dibuat'
        ], 201);
    }
}
