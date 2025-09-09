<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BatchProduction;
use App\Models\Material;
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

    public function update(Request $request, $id)
    {
        $product = Produk::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Produk tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'sku' => 'nullable|string|max:100|unique:produks,sku,' . $product->id,
            'nama' => 'nullable|string|max:255',
            'harga' => 'nullable|numeric',
            'bahan' => 'nullable|string',
            'status' => 'nullable|string',
            'deskripsi' => 'nullable|string',
        ]);

        // if bahan exist
        if ($request->has('bahan') && $request->bahan !== null) {
            $material = Material::find($request->bahan);
            if (!$material) {
                return response()->json([
                    'message' => 'Material tidak ditemukan'
                ], 404);
            }
        }

        $product->update([
            'sku' => $request->sku,
            'nama' => $request->nama,
            'harga' => $request->harga,
            'material_id' => $material->id,
            'status' => $request->status,
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json([
            'data' => $product,
            'message' => 'Produk berhasil diperbarui'
        ]);
    }
}
