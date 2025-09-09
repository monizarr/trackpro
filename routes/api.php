<?php

use App\Http\Controllers\Api\ProsesProduksiController;
use App\Http\Controllers\Api\BatchProsesProduksiController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\PekerjaController;
use App\Http\Controllers\BatchProductionController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/material', [MaterialController::class, 'index']);
Route::get('/material-bb', [MaterialController::class, 'bahanBaku']);
Route::get('/material/{id}', [MaterialController::class, 'show']);
Route::post('/material', [MaterialController::class, 'store']);
Route::put('/material/{id}', [MaterialController::class, 'update']);
Route::delete('/material/{id}', [MaterialController::class, 'destroy']);

Route::get('/pekerja', [PekerjaController::class, 'index']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::post('/product', [ProductController::class, 'store']);
Route::put('/product/{id}', [ProductController::class, 'update']);

Route::get('/batch-production/{productId}', [BatchProductionController::class, 'getBatchProductions']);
Route::post('/batch-production', [BatchProductionController::class, 'storeBatchProduction']);

Route::get('/production/{productId}/{batchId}', [BatchProductionController::class, 'getProductions']);

Route::get('/proses-produksi-list', [ProsesProduksiController::class, 'index']);
Route::get('/proses-produksi/{productId}/{batchId}', [ProsesProduksiController::class, 'get']);

Route::post('/batch-proses-produksi', [BatchProsesProduksiController::class, 'store']);
Route::put('/batch-proses-produksi/{id}', [BatchProsesProduksiController::class, 'update']);
Route::delete('/batch-proses-produksi/{id}', [BatchProsesProduksiController::class, 'destroy']);
