<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PesanKontak;
use Illuminate\Http\Request;

class PesanKontakController extends Controller
{
    public function index() { return PesanKontak::latest()->get(); }

    public function store(Request $request) {
        $data = $request->validate(['nama' => 'required|string', 'email' => 'required|email', 'subjek' => 'required|string', 'pesan' => 'required|string']);
        return PesanKontak::create($data);
    }

    public function markAsRead(PesanKontak $pesanKontak) {
        $pesanKontak->update(['is_read' => true]);
        return $pesanKontak;
    }

    public function destroy(PesanKontak $pesanKontak) { $pesanKontak->delete(); return response()->json(['message' => 'Pesan dihapus']); }
}
