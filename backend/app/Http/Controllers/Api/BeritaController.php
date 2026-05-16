<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request) {
        $query = Berita::with('user');
        if ($request->kategori) $query->where('kategori', $request->kategori);
        if ($request->status) $query->where('status', $request->status);
        if ($request->search) $query->where('judul', 'like', "%{$request->search}%");
        return $query->latest()->paginate($request->per_page ?? 10);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'judul' => 'required|string', 'konten' => 'required|string',
            'kategori' => 'in:Berita,Kegiatan,Kompetisi,Rekrutmen', 'status' => 'in:draft,published',
        ]);
        $data['slug'] = Str::slug($data['judul']) . '-' . Str::random(5);
        $data['user_id'] = $request->user()->id;
        if ($data['status'] === 'published') $data['published_at'] = now();
        if ($request->hasFile('banner')) $data['banner'] = $request->file('banner')->store('berita', 'public');
        return Berita::create($data);
    }

    public function show($slug) { return Berita::where('slug', $slug)->with('user')->firstOrFail(); }

    public function update(Request $request, Berita $beritum) {
        $data = $request->validate([
            'judul' => 'sometimes|string', 'konten' => 'nullable|string',
            'kategori' => 'in:Berita,Kegiatan,Kompetisi,Rekrutmen', 'status' => 'in:draft,published',
        ]);
        if ($request->hasFile('banner')) $data['banner'] = $request->file('banner')->store('berita', 'public');
        if (isset($data['status']) && $data['status'] === 'published' && !$beritum->published_at) $data['published_at'] = now();
        $beritum->update($data);
        return $beritum;
    }

    public function destroy(Berita $beritum) { $beritum->delete(); return response()->json(['message' => 'Berita dihapus']); }
}
