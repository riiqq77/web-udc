<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use Illuminate\Http\Request;

class PrestasiController extends Controller
{
    public function index() { return Prestasi::latest('tahun')->get(); }

    public function store(Request $request) {
        $data = $request->validate(['nama_lomba' => 'required|string', 'tingkat' => 'required|string', 'juara' => 'required|string', 'tahun' => 'required|integer', 'deskripsi' => 'nullable|string']);
        if ($request->hasFile('dokumentasi')) $data['dokumentasi'] = $request->file('dokumentasi')->store('prestasi', 'public');
        return Prestasi::create($data);
    }

    public function show(Prestasi $prestasi) { return $prestasi; }

    public function update(Request $request, Prestasi $prestasi) {
        $data = $request->validate(['nama_lomba' => 'sometimes|string', 'tingkat' => 'sometimes|string', 'juara' => 'sometimes|string', 'tahun' => 'sometimes|integer', 'deskripsi' => 'nullable|string']);
        $prestasi->update($data);
        return $prestasi;
    }

    public function destroy(Prestasi $prestasi) { $prestasi->delete(); return response()->json(['message' => 'Prestasi dihapus']); }
}
