<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request) {
        $query = Portfolio::with(['anggota', 'divisi']);
        if ($request->divisi_id) $query->where('divisi_id', $request->divisi_id);
        if ($request->search) $query->where('judul', 'like', "%{$request->search}%");
        if ($request->kategori) $query->where('kategori', $request->kategori);
        return $query->latest()->paginate($request->per_page ?? 12);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'judul' => 'required|string', 'deskripsi' => 'nullable|string', 'kategori' => 'nullable|string',
            'tags' => 'nullable|array', 'tahun' => 'nullable|integer', 'anggota_id' => 'nullable|exists:anggota,id',
            'divisi_id' => 'nullable|exists:divisi,id',
        ]);
        if ($request->hasFile('thumbnail')) $data['thumbnail'] = $request->file('thumbnail')->store('portfolio', 'public');
        return Portfolio::create($data);
    }

    public function show(Portfolio $portfolio) { return $portfolio->load(['anggota', 'divisi']); }

    public function update(Request $request, Portfolio $portfolio) {
        $data = $request->validate([
            'judul' => 'sometimes|string', 'deskripsi' => 'nullable|string', 'kategori' => 'nullable|string',
            'tags' => 'nullable|array', 'tahun' => 'nullable|integer',
        ]);
        if ($request->hasFile('thumbnail')) $data['thumbnail'] = $request->file('thumbnail')->store('portfolio', 'public');
        $portfolio->update($data);
        return $portfolio;
    }

    public function destroy(Portfolio $portfolio) { $portfolio->delete(); return response()->json(['message' => 'Portfolio dihapus']); }
}
