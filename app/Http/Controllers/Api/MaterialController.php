<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{

    public function index()
    {
        $materials = Material::all();
        return response()->json([
            'data' => $materials,
            'message' => 'Berhasil'
        ]);
    }

    public function bahanBaku()
    {
        $materials = Material::where('tipe', 'bahan_baku')->get();
        return response()->json([
            'data' => $materials,
            'message' => 'Berhasil'
        ]);
    }

    public function show($id)
    {
        $material = Material::find($id);
        if ($material) {
            return response()->json([
                'data' => $material,
                'message' => 'Berhasil'
            ]);
        } else {
            return response()->json([
                'message' => 'Material tidak ditemukan'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $material = Material::create($request->all());
        return response()->json([
            'data' => $material,
            'message' => 'Material created successfully'
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json([
                'message' => 'Material not found'
            ], 404);
        }

        $material->update($request->all());
        return response()->json([
            'data' => $material,
            'message' => 'Material updated successfully'
        ]);
    }

    public function destroy(string $id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json([
                'message' => 'Material not found'
            ], 404);
        }

        $material->delete();
        return response()->json([
            'message' => 'Material deleted successfully'
        ]);
    }
}
