<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{User, Divisi, Anggota, Portfolio, Berita, Prestasi, PesanKontak};
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin Users
        $admin = User::create(['name' => 'Admin UDC', 'email' => 'admin@udc.ac.id', 'password' => 'password', 'role' => 'super_admin']);
        User::create(['name' => 'Ketua UDC', 'email' => 'ketua@udc.ac.id', 'password' => 'password', 'role' => 'ketua']);

        // Create Divisions
        $divisions = [
            ['nama' => 'Training & Competition', 'deskripsi' => 'Divisi pelatihan skill digital dan persiapan kompetisi.', 'warna' => '#700143'],
            ['nama' => 'HRD', 'deskripsi' => 'Human Resource Development - rekrutmen dan pengembangan anggota.', 'warna' => '#8B1A5A'],
            ['nama' => 'Digital & Social Media', 'deskripsi' => 'Manajemen platform digital dan media sosial.', 'warna' => '#A03370'],
            ['nama' => 'Creative & Design', 'deskripsi' => 'Desain visual dan branding organisasi.', 'warna' => '#CFD78C'],
            ['nama' => 'Artificial Intelligence', 'deskripsi' => 'Eksplorasi dan implementasi teknologi AI.', 'warna' => '#B5BD6A'],
            ['nama' => 'Media Production', 'deskripsi' => 'Produksi foto, video, dan multimedia.', 'warna' => '#97A048'],
        ];
        foreach ($divisions as $d) Divisi::create($d);

        // Create Members
        $names = ['Budi Santoso', 'Rina Wati', 'Doni Setiawan', 'Maya Putri', 'Andi Wijaya', 'Lestari Dewi', 'Fajar Ramadhan', 'Nadia Safitri', 'Hendra K.', 'Putri Amelia', 'Yoga Pratama', 'Citra Lestari'];
        foreach ($names as $i => $name) {
            Anggota::create([
                'nama_lengkap' => $name, 'divisi_id' => ($i % 6) + 1,
                'jabatan' => $i % 2 === 0 ? 'Ketua Divisi' : 'Anggota',
                'status' => 'aktif', 'angkatan' => $i < 6 ? 2023 : 2024,
            ]);
        }

        // Create Portfolio
        $portfolios = [
            ['judul' => 'UDC Brand Identity Redesign', 'kategori' => 'Design', 'tags' => ['Branding', 'Visual'], 'tahun' => 2025, 'anggota_id' => 7, 'divisi_id' => 4],
            ['judul' => 'Smart Campus App', 'kategori' => 'Development', 'tags' => ['Mobile', 'React Native'], 'tahun' => 2025, 'anggota_id' => 1, 'divisi_id' => 1],
            ['judul' => 'AI Chatbot Untirta', 'kategori' => 'AI', 'tags' => ['NLP', 'Python'], 'tahun' => 2024, 'anggota_id' => 9, 'divisi_id' => 5],
            ['judul' => 'UDC Documentary Film', 'kategori' => 'Video', 'tags' => ['Documentary'], 'tahun' => 2024, 'anggota_id' => 11, 'divisi_id' => 6],
        ];
        foreach ($portfolios as $p) {
            $p['deskripsi'] = 'Karya portfolio dari anggota UDC.';
            Portfolio::create($p);
        }

        // Create News
        $newsItems = [
            ['judul' => 'UDC Meraih Juara 1 Hackathon Nasional 2025', 'kategori' => 'Kompetisi', 'status' => 'published', 'konten' => '<p>Tim UDC berhasil meraih juara pertama dalam Hackathon Nasional 2025.</p>'],
            ['judul' => 'Workshop UI/UX Design', 'kategori' => 'Kegiatan', 'status' => 'published', 'konten' => '<p>Workshop intensif UI/UX Design selama 2 hari.</p>'],
            ['judul' => 'Open Recruitment UDC 2025/2026', 'kategori' => 'Rekrutmen', 'status' => 'published', 'konten' => '<p>UDC membuka rekrutmen anggota baru.</p>'],
        ];
        foreach ($newsItems as $n) {
            $n['slug'] = Str::slug($n['judul']) . '-' . Str::random(5);
            $n['user_id'] = $admin->id;
            $n['published_at'] = now();
            Berita::create($n);
        }

        // Create Achievements
        $achievements = [
            ['nama_lomba' => 'Hackathon Nasional 2025', 'tingkat' => 'Nasional', 'juara' => '1', 'tahun' => 2025, 'deskripsi' => 'Solusi AI untuk pendidikan'],
            ['nama_lomba' => 'Gemastik XVI - Data Mining', 'tingkat' => 'Nasional', 'juara' => '2', 'tahun' => 2024, 'deskripsi' => 'Analisis sentimen deep learning'],
            ['nama_lomba' => 'UI/UX Design Competition', 'tingkat' => 'Regional', 'juara' => '1', 'tahun' => 2024, 'deskripsi' => 'Redesign aplikasi transportasi'],
        ];
        foreach ($achievements as $a) Prestasi::create($a);

        // Create Messages
        PesanKontak::create(['nama' => 'PT Telkom', 'email' => 'sponsor@telkom.co.id', 'subjek' => 'Kerja Sama Sponsorship', 'pesan' => 'Kami tertarik mensponsori kegiatan UDC.', 'is_read' => false]);
    }
}
