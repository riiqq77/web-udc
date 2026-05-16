<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use Illuminate\Http\Request;

class AnggotaController extends Controller
{
    public function index(Request $request) {
        $query = Anggota::with('divisi');
        if ($request->divisi_id) $query->where('divisi_id', $request->divisi_id);
        if ($request->search) $query->where('nama_lengkap', 'like', "%{$request->search}%");
        if ($request->status) $query->where('status', $request->status);
        return $query->paginate($request->per_page ?? 20);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'nama_lengkap' => 'required|string', 'divisi_id' => 'nullable|exists:divisi,id',
            'jabatan' => 'nullable|string', 'status' => 'in:aktif,nonaktif', 'angkatan' => 'nullable|integer',
            'instagram' => 'nullable|string', 'linkedin' => 'nullable|string', 'github' => 'nullable|string',
        ]);
        if ($request->hasFile('foto')) $data['foto'] = $request->file('foto')->store('anggota', 'public');
        return Anggota::create($data);
    }

    public function show(Anggota $anggotum) {
        return $anggotum->load(['divisi', 'portfolio']);
    }

    public function update(Request $request, Anggota $anggotum) {
        $data = $request->validate([
            'nama_lengkap' => 'sometimes|string', 'divisi_id' => 'nullable|exists:divisi,id',
            'jabatan' => 'nullable|string', 'status' => 'in:aktif,nonaktif', 'angkatan' => 'nullable|integer',
        ]);
        if ($request->hasFile('foto')) $data['foto'] = $request->file('foto')->store('anggota', 'public');
        $anggotum->update($data);
        return $anggotum;
    }

    public function destroy(Anggota $anggotum) {
        $anggotum->delete();
        return response()->json(['message' => 'Anggota dihapus']);
    }
}
