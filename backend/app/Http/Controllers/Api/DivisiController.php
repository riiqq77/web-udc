<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Divisi;
use Illuminate\Http\Request;

class DivisiController extends Controller
{
    public function index() {
        return Divisi::withCount('anggota')->get();
    }

    public function store(Request $request) {
        $data = $request->validate(['nama' => 'required|string', 'deskripsi' => 'nullable|string', 'warna' => 'nullable|string|max:7', 'ketua_id' => 'nullable|exists:anggota,id']);
        return Divisi::create($data);
    }

    public function show(Divisi $divisi) {
        return $divisi->load(['anggota', 'ketua']);
    }

    public function update(Request $request, Divisi $divisi) {
        $data = $request->validate(['nama' => 'sometimes|string', 'deskripsi' => 'nullable|string', 'warna' => 'nullable|string|max:7', 'ketua_id' => 'nullable|exists:anggota,id']);
        $divisi->update($data);
        return $divisi;
    }

    public function destroy(Divisi $divisi) {
        $divisi->delete();
        return response()->json(['message' => 'Divisi dihapus']);
    }
}
