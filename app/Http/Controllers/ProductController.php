<?php

namespace App\Http\Controllers;

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
}
