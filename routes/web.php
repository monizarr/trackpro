<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('stocks', function () {
        return Inertia::render('stocks/index');
    })->name('stocks');
    Route::prefix('products')->group(function () {
        Route::get('/', function () {
            return Inertia::render('products/index');
        })->name('products.index');
        Route::get('/{id}', function () {
            return Inertia::render('products/show');
        })->name('products.show');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
