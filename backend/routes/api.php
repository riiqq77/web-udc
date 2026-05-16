<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController, DashboardController, DivisiController, AnggotaController,
    PortfolioController, BeritaController, PrestasiController,
    PendaftaranController, PesanKontakController
};

// Public Routes
Route::post('/login', [AuthController::class, 'login']);
Route::get('/divisi', [DivisiController::class, 'index']);
Route::get('/divisi/{divisi}', [DivisiController::class, 'show']);
Route::get('/anggota', [AnggotaController::class, 'index']);
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/portfolio/{portfolio}', [PortfolioController::class, 'show']);
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{slug}', [BeritaController::class, 'show']);
Route::get('/prestasi', [PrestasiController::class, 'index']);
Route::post('/pendaftaran', [PendaftaranController::class, 'store']);
Route::post('/pesan', [PesanKontakController::class, 'store']);

// Protected Routes (Admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    Route::apiResource('divisi', DivisiController::class)->except(['index', 'show']);
    Route::apiResource('anggota', AnggotaController::class)->except(['index']);
    Route::apiResource('portfolio', PortfolioController::class)->except(['index', 'show']);
    Route::apiResource('berita', BeritaController::class)->except(['index', 'show']);
    Route::apiResource('prestasi', PrestasiController::class)->except(['index']);

    Route::get('/pendaftaran', [PendaftaranController::class, 'index']);
    Route::get('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'show']);
    Route::patch('/pendaftaran/{pendaftaran}/status', [PendaftaranController::class, 'updateStatus']);
    Route::delete('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'destroy']);

    Route::get('/pesan-kontak', [PesanKontakController::class, 'index']);
    Route::patch('/pesan-kontak/{pesanKontak}/read', [PesanKontakController::class, 'markAsRead']);
    Route::delete('/pesan-kontak/{pesanKontak}', [PesanKontakController::class, 'destroy']);
});
