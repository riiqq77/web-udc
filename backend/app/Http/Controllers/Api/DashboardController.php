<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{Anggota, Portfolio, Berita, Prestasi, Pendaftaran, PesanKontak, Divisi};

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_anggota' => Anggota::count(),
            'total_portfolio' => Portfolio::count(),
            'total_berita' => Berita::count(),
            'total_prestasi' => Prestasi::count(),
            'total_pendaftaran_pending' => Pendaftaran::where('status', 'pending')->count(),
            'total_pesan_unread' => PesanKontak::where('is_read', false)->count(),
            'divisi_stats' => Divisi::withCount('anggota')->get(['id', 'nama', 'warna']),
        ]);
    }
}
