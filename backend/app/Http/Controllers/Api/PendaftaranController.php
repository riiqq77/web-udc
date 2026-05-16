<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;

class PendaftaranController extends Controller
{
    public function index(Request $request) {
        $query = Pendaftaran::with('divisi');
        if ($request->status) $query->where('status', $request->status);
        return $query->latest()->paginate($request->per_page ?? 20);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'nama' => 'required|string', 'email' => 'required|email', 'telepon' => 'nullable|string',
            'nim' => 'nullable|string', 'jurusan' => 'nullable|string', 'divisi_id' => 'required|exists:divisi,id',
            'motivasi' => 'nullable|string',
        ]);
        if ($request->hasFile('cv')) $data['cv_path'] = $request->file('cv')->store('pendaftaran/cv', 'public');
        if ($request->hasFile('portfolio')) $data['portfolio_path'] = $request->file('portfolio')->store('pendaftaran/portfolio', 'public');
        return Pendaftaran::create($data);
    }

    public function show(Pendaftaran $pendaftaran) { return $pendaftaran->load('divisi'); }

    public function updateStatus(Request $request, Pendaftaran $pendaftaran) {
        $request->validate(['status' => 'required|in:approved,rejected']);
        $pendaftaran->update(['status' => $request->status]);
        return $pendaftaran;
    }

    public function destroy(Pendaftaran $pendaftaran) { $pendaftaran->delete(); return response()->json(['message' => 'Pendaftaran dihapus']); }
}
