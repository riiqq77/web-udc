// UDC Mock Data - All static content for the website

export const orgInfo = {
  name: 'Untirta Digital Creative',
  shortName: 'UDC',
  tagline: 'Wadah Kreativitas Digital Mahasiswa Untirta',
  description: 'Unit Kegiatan Mahasiswa yang berfokus pada pengembangan kreativitas digital, teknologi, dan inovasi di lingkungan Universitas Sultan Ageng Tirtayasa.',
  founded: 2019,
  university: 'Universitas Sultan Ageng Tirtayasa',
  email: 'udc@untirta.ac.id',
  phone: '+62 812 3456 7890',
  address: 'Gedung Student Center Lt. 2, Kampus Untirta Sindangsari, Serang, Banten',
  instagram: 'https://instagram.com/udc.untirta',
  youtube: 'https://youtube.com/@udcuntirta',
  linkedin: 'https://linkedin.com/company/udc-untirta',
  github: 'https://github.com/udc-untirta',
  maps: 'https://maps.google.com/?q=-6.3568,106.0678',
  visi: 'Menjadi organisasi mahasiswa terdepan dalam pengembangan kreativitas digital dan teknologi yang berdampak bagi masyarakat.',
  misi: [
    'Mengembangkan potensi anggota di bidang teknologi dan kreativitas digital',
    'Menyelenggarakan pelatihan dan workshop berkualitas secara berkala',
    'Membangun portofolio karya digital yang profesional',
    'Mewakili universitas dalam kompetisi teknologi tingkat nasional',
    'Membangun jejaring dengan komunitas teknologi dan industri'
  ],
  pipilar: [
    { title: 'Inovasi', desc: 'Mendorong ide-ide kreatif dan solusi teknologi terbaru', icon: 'Lightbulb' },
    { title: 'Kolaborasi', desc: 'Membangun tim yang solid dan saling mendukung', icon: 'Users' },
    { title: 'Edukasi', desc: 'Berbagi ilmu dan pengalaman untuk tumbuh bersama', icon: 'GraduationCap' },
    { title: 'Kontribusi', desc: 'Memberikan dampak positif bagi kampus dan masyarakat', icon: 'Heart' }
  ],
  stats: { members: 127, divisions: 6, portfolios: 84, achievements: 32, events: 48 }
};

export const divisions = [
  { id: 1, name: 'Training & Competition', slug: 'training-competition', color: '#700143', description: 'Divisi yang bertanggung jawab dalam pelatihan skill digital dan persiapan kompetisi teknologi tingkat nasional.', tasks: ['Menyelenggarakan bootcamp dan workshop', 'Membimbing tim kompetisi', 'Menyusun kurikulum pelatihan', 'Evaluasi perkembangan anggota'], memberCount: 22 },
  { id: 2, name: 'HRD', slug: 'hrd', color: '#8B1A5A', description: 'Divisi Human Resource Development yang mengelola sumber daya manusia, rekrutmen, dan pengembangan anggota.', tasks: ['Rekrutmen anggota baru', 'Orientasi dan onboarding', 'Evaluasi kinerja anggota', 'Program pengembangan diri'], memberCount: 15 },
  { id: 3, name: 'Digital & Social Media', slug: 'digital-social-media', color: '#A03370', description: 'Mengelola seluruh platform digital dan media sosial UDC untuk branding dan engagement.', tasks: ['Manajemen media sosial', 'Content planning & scheduling', 'Analytics dan reporting', 'Digital marketing'], memberCount: 20 },
  { id: 4, name: 'Creative & Design', slug: 'creative-design', color: '#CFD78C', description: 'Divisi kreatif yang bertanggung jawab atas seluruh kebutuhan desain visual organisasi.', tasks: ['Desain grafis dan branding', 'UI/UX design', 'Motion graphics', 'Brand guideline'], memberCount: 25 },
  { id: 5, name: 'Artificial Intelligence', slug: 'artificial-intelligence', color: '#B5BD6A', description: 'Divisi yang fokus pada eksplorasi dan implementasi teknologi kecerdasan buatan.', tasks: ['Riset AI dan Machine Learning', 'Pengembangan model AI', 'Workshop AI untuk anggota', 'Proyek berbasis data'], memberCount: 18 },
  { id: 6, name: 'Media Production', slug: 'media-production', color: '#97A048', description: 'Divisi produksi media yang menangani foto, video, dan konten multimedia organisasi.', tasks: ['Produksi video dan dokumentasi', 'Fotografi kegiatan', 'Podcast dan konten audio', 'Editing dan post-production'], memberCount: 20 }
];

export const pengurus = [
  { id: 1, name: 'Ahmad Fauzan', jabatan: 'Ketua Umum', foto: null, divisi: null, instagram: '#', linkedin: '#', github: '#' },
  { id: 2, name: 'Siti Nurhaliza', jabatan: 'Wakil Ketua', foto: null, divisi: null, instagram: '#', linkedin: '#' },
  { id: 3, name: 'Rizky Pratama', jabatan: 'Sekretaris', foto: null, divisi: null, instagram: '#', linkedin: '#' },
  { id: 4, name: 'Dina Mariana', jabatan: 'Bendahara', foto: null, divisi: null, instagram: '#', linkedin: '#' },
];

export const members = [
  { id: 5, name: 'Budi Santoso', jabatan: 'Ketua Divisi', foto: null, divisiId: 1, status: 'aktif', angkatan: 2023, instagram: '#' },
  { id: 6, name: 'Rina Wati', jabatan: 'Anggota', foto: null, divisiId: 1, status: 'aktif', angkatan: 2024, instagram: '#' },
  { id: 7, name: 'Doni Setiawan', jabatan: 'Ketua Divisi', foto: null, divisiId: 2, status: 'aktif', angkatan: 2023, instagram: '#' },
  { id: 8, name: 'Maya Putri', jabatan: 'Anggota', foto: null, divisiId: 2, status: 'aktif', angkatan: 2024, instagram: '#' },
  { id: 9, name: 'Andi Wijaya', jabatan: 'Ketua Divisi', foto: null, divisiId: 3, status: 'aktif', angkatan: 2023, instagram: '#' },
  { id: 10, name: 'Lestari Dewi', jabatan: 'Anggota', foto: null, divisiId: 3, status: 'aktif', angkatan: 2024, instagram: '#' },
  { id: 11, name: 'Fajar Ramadhan', jabatan: 'Ketua Divisi', foto: null, divisiId: 4, status: 'aktif', angkatan: 2023, instagram: '#' },
  { id: 12, name: 'Nadia Safitri', jabatan: 'Anggota', foto: null, divisiId: 4, status: 'aktif', angkatan: 2024, instagram: '#' },
  { id: 13, name: 'Hendra Kurniawan', jabatan: 'Ketua Divisi', foto: null, divisiId: 5, status: 'aktif', angkatan: 2023, instagram: '#' },
  { id: 14, name: 'Putri Amelia', jabatan: 'Anggota', foto: null, divisiId: 5, status: 'aktif', angkatan: 2024, instagram: '#' },
  { id: 15, name: 'Yoga Pratama', jabatan: 'Ketua Divisi', foto: null, divisiId: 6, status: 'aktif', angkatan: 2023, instagram: '#' },
  { id: 16, name: 'Citra Lestari', jabatan: 'Anggota', foto: null, divisiId: 6, status: 'aktif', angkatan: 2024, instagram: '#' },
];

export const portfolios = [
  { id: 1, judul: 'UDC Brand Identity Redesign', deskripsi: 'Redesign identitas visual lengkap untuk UDC termasuk logo, color palette, dan brand guideline.', thumbnail: null, kategori: 'Design', tags: ['Branding', 'Visual Identity'], tahun: 2025, anggotaId: 11, divisiId: 4 },
  { id: 2, judul: 'Smart Campus App', deskripsi: 'Aplikasi mobile untuk memudahkan mahasiswa mengakses layanan kampus.', thumbnail: null, kategori: 'Development', tags: ['Mobile', 'React Native'], tahun: 2025, anggotaId: 5, divisiId: 1 },
  { id: 3, judul: 'AI Chatbot Untirta', deskripsi: 'Chatbot berbasis AI untuk menjawab pertanyaan mahasiswa seputar kampus.', thumbnail: null, kategori: 'AI', tags: ['NLP', 'Python', 'Machine Learning'], tahun: 2024, anggotaId: 13, divisiId: 5 },
  { id: 4, judul: 'UDC Documentary Film', deskripsi: 'Film dokumenter perjalanan UDC dari awal berdiri hingga sekarang.', thumbnail: null, kategori: 'Video', tags: ['Documentary', 'Storytelling'], tahun: 2024, anggotaId: 15, divisiId: 6 },
  { id: 5, judul: 'Social Media Campaign - Digital Week', deskripsi: 'Campaign media sosial untuk event Digital Week 2024.', thumbnail: null, kategori: 'Marketing', tags: ['Social Media', 'Campaign'], tahun: 2024, anggotaId: 9, divisiId: 3 },
  { id: 6, judul: 'Dashboard Analytics Platform', deskripsi: 'Platform analytics untuk monitoring performa media sosial UDC.', thumbnail: null, kategori: 'Development', tags: ['React', 'Data Viz'], tahun: 2025, anggotaId: 6, divisiId: 1 },
];

export const news = [
  { id: 1, judul: 'UDC Meraih Juara 1 Hackathon Nasional 2025', slug: 'udc-juara-hackathon-2025', konten: '<p>Tim UDC berhasil meraih juara pertama dalam Hackathon Nasional 2025 yang diselenggarakan di Jakarta. Tim yang terdiri dari 4 anggota ini berhasil mengembangkan solusi inovatif berbasis AI untuk permasalahan pendidikan.</p><p>Kompetisi yang diikuti oleh lebih dari 200 tim dari seluruh Indonesia ini menjadi bukti bahwa anggota UDC memiliki kemampuan yang kompetitif di tingkat nasional.</p>', banner: null, kategori: 'Kompetisi', status: 'published', publishedAt: '2025-04-15', userId: 1 },
  { id: 2, judul: 'Workshop UI/UX Design: Dari Wireframe ke Prototype', slug: 'workshop-uiux-design', konten: '<p>UDC mengadakan workshop intensif tentang UI/UX Design selama 2 hari. Peserta belajar mulai dari riset pengguna, wireframing, hingga membuat prototype interaktif menggunakan Figma.</p>', banner: null, kategori: 'Kegiatan', status: 'published', publishedAt: '2025-03-20', userId: 1 },
  { id: 3, judul: 'Open Recruitment UDC 2025/2026', slug: 'open-recruitment-2025', konten: '<p>UDC membuka rekrutmen anggota baru untuk periode 2025/2026. Kami mencari mahasiswa Untirta yang passionate di bidang teknologi dan kreativitas digital.</p>', banner: null, kategori: 'Rekrutmen', status: 'published', publishedAt: '2025-02-01', userId: 1 },
  { id: 4, judul: 'Bootcamp Web Development: React & Laravel', slug: 'bootcamp-webdev', konten: '<p>Bootcamp intensif selama 1 bulan untuk mempelajari full-stack web development menggunakan React dan Laravel.</p>', banner: null, kategori: 'Kegiatan', status: 'published', publishedAt: '2025-01-10', userId: 1 },
  { id: 5, judul: 'UDC x Google Developer Group: Tech Talk', slug: 'udc-gdg-techtalk', konten: '<p>Kolaborasi UDC dengan Google Developer Group Banten menghadirkan tech talk tentang Cloud Computing dan AI.</p>', banner: null, kategori: 'Berita', status: 'published', publishedAt: '2024-12-05', userId: 1 },
  { id: 6, judul: 'Hasil Seleksi Anggota Baru 2024', slug: 'hasil-seleksi-2024', konten: '<p>Pengumuman hasil seleksi anggota baru UDC periode 2024/2025.</p>', banner: null, kategori: 'Rekrutmen', status: 'published', publishedAt: '2024-09-15', userId: 1 },
];

export const achievements = [
  { id: 1, namaLomba: 'Hackathon Nasional 2025', tingkat: 'Nasional', juara: '1', tahun: 2025, deskripsi: 'Mengembangkan solusi AI untuk pendidikan inklusif', dokumentasi: null },
  { id: 2, namaLomba: 'Gemastik XVI - Data Mining', tingkat: 'Nasional', juara: '2', tahun: 2024, deskripsi: 'Analisis sentimen media sosial menggunakan deep learning', dokumentasi: null },
  { id: 3, namaLomba: 'UI/UX Design Competition', tingkat: 'Regional', juara: '1', tahun: 2024, deskripsi: 'Redesign aplikasi transportasi publik Banten', dokumentasi: null },
  { id: 4, namaLomba: 'FIND IT UGM - Web Development', tingkat: 'Nasional', juara: '3', tahun: 2024, deskripsi: 'Platform donasi berbasis blockchain', dokumentasi: null },
  { id: 5, namaLomba: 'Video Competition Kemendikbud', tingkat: 'Nasional', juara: 'Finalis', tahun: 2023, deskripsi: 'Video kampanye literasi digital', dokumentasi: null },
  { id: 6, namaLomba: 'Competitive Programming INC', tingkat: 'Nasional', juara: '2', tahun: 2023, deskripsi: 'Kompetisi pemrograman algoritma tingkat nasional', dokumentasi: null },
];

export const timeline = [
  { year: 2019, title: 'Berdirinya UDC', desc: 'UDC didirikan oleh sekelompok mahasiswa yang passionate di bidang teknologi.' },
  { year: 2020, title: 'Ekspansi Digital', desc: 'UDC mulai aktif di media sosial dan menyelenggarakan workshop online.' },
  { year: 2021, title: 'Divisi Baru', desc: 'Penambahan divisi AI dan Media Production.' },
  { year: 2022, title: 'Kompetisi Perdana', desc: 'Pertama kali mengirim tim ke kompetisi nasional.' },
  { year: 2023, title: 'Prestasi Nasional', desc: 'Meraih beberapa penghargaan di kompetisi tingkat nasional.' },
  { year: 2024, title: 'Transformasi', desc: 'Restrukturisasi organisasi dan peningkatan kualitas program kerja.' },
  { year: 2025, title: 'Era Baru', desc: 'Peluncuran website resmi dan sistem administrasi digital.' },
];

export const faqs = [
  { q: 'Apa itu UDC?', a: 'UDC (Untirta Digital Creative) adalah Unit Kegiatan Mahasiswa di Universitas Sultan Ageng Tirtayasa yang berfokus pada pengembangan kreativitas digital dan teknologi.' },
  { q: 'Siapa yang bisa bergabung?', a: 'Seluruh mahasiswa aktif Universitas Sultan Ageng Tirtayasa dari semua jurusan dan angkatan.' },
  { q: 'Bagaimana cara mendaftar?', a: 'Kamu bisa mendaftar melalui halaman pendaftaran di website ini saat periode rekrutmen dibuka.' },
  { q: 'Apakah ada biaya keanggotaan?', a: 'Tidak ada biaya keanggotaan. Semua program dan pelatihan gratis untuk anggota.' },
  { q: 'Apa saja kegiatan UDC?', a: 'UDC menyelenggarakan workshop, bootcamp, kompetisi internal, project kolaboratif, dan berbagai kegiatan pengembangan skill digital lainnya.' },
];
