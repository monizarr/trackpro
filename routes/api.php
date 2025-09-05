<?php

use App\Http\Controllers\Api\ProsesProduksiController;
use App\Http\Controllers\Api\BatchProsesProduksiController;
use App\Http\Controllers\BatchProductionController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);

Route::get('/batch-production/{productId}', [BatchProductionController::class, 'getBatchProductions']);
Route::post('/batch-production', [BatchProductionController::class, 'storeBatchProduction']);

Route::get('/production/{productId}/{batchId}', [BatchProductionController::class, 'getProductions']);

Route::get('/proses-produksi/{productId}/{batchId}', [ProsesProduksiController::class, 'get']);
Route::post('/batch-proses-produksi', [BatchProsesProduksiController::class, 'store']);
