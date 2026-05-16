import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, FolderOpen, Trophy, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import SectionHeader from '@/components/shared/SectionHeader';
import { orgInfo } from '@/data/mockData';
import { divisiService, portfolioService, anggotaService, prestasiService } from '@/services/api';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  const [divisions, setDivisions] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [counts, setCounts] = useState({ members: 0, portfolios: 0, achievements: 0, events: 12 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [divRes, portRes, memRes, presRes] = await Promise.all([
          divisiService.getAll(),
          portfolioService.getAll(),
          anggotaService.getAll({ per_page: 1000 }),
          prestasiService.getAll()
        ]);
        setDivisions(divRes.data);
        setPortfolios(portRes.data.data?.slice(0, 3) || []);
        setCounts({
          members: memRes.data.data?.length || 0,
          portfolios: portRes.data.data?.length || 0,
          achievements: presRes.data.data?.length || 0,
          events: 12
        });
      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: Users, value: counts.members + '+', label: 'Anggota Aktif' },
    { icon: FolderOpen, value: counts.portfolios + '+', label: 'Karya Portfolio' },
    { icon: Trophy, value: counts.achievements + '+', label: 'Prestasi' },
    { icon: Calendar, value: counts.events + '+', label: 'Kegiatan' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-citron-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <Sparkles size={14} className="text-citron-400" />
              <span className="text-sm text-neutral-300">Open Recruitment 2025/2026</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Untirta<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-purple-400 via-citron-400 to-butter">Digital Creative</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {orgInfo.tagline}. Bergabunglah dengan komunitas kreatif digital terbesar di Universitas Sultan Ageng Tirtayasa.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/daftar">
                <Button size="lg" icon={ArrowRight} className="bg-gradient-to-r from-royal-purple-600 to-royal-purple-700 hover:from-royal-purple-700 hover:to-royal-purple-800 shadow-lg shadow-royal-purple-600/25">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link to="/tentang">
                <Button variant="outline" size="lg" className="border-neutral-700 text-neutral-300 hover:bg-white/5">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-neutral-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={fadeUp} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl bg-royal-purple-50 dark:bg-royal-purple-900/20">
                  <Icon size={22} className="text-royal-purple-600 dark:text-royal-purple-400" />
                </div>
                <div className="text-3xl font-bold text-neutral-900 dark:text-white">{value}</div>
                <div className="text-sm text-neutral-500 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-3 py-1 bg-citron-100 dark:bg-citron-900/30 text-citron-700 dark:text-citron-400 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Tentang Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
                Membangun Generasi<br />Digital yang Kreatif
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">{orgInfo.description}</p>
              <Link to="/tentang"><Button variant="outline" icon={ChevronRight}>Selengkapnya</Button></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {orgInfo.pipilar.map((p, i) => (
                <div key={i} className="p-5 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-soft">
                  <div className="text-2xl mb-3">{['💡', '🤝', '🎓', '❤️'][i]}</div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{p.title}</h4>
                  <p className="text-xs text-neutral-500">{p.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divisions Preview */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Divisi" title="6 Divisi Unggulan" description="Pilih bidang yang sesuai dengan passion dan kemampuanmu" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((div) => (
              <motion.div key={div.id} variants={fadeUp}>
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: div.warna + '15' }}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: div.warna }} />
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{div.nama}</h3>
                    <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{div.deskripsi}</p>
                    <span className="text-xs text-neutral-400">{div.anggota_count || 0} anggota</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/divisi"><Button variant="outline" icon={ChevronRight}>Lihat Semua Divisi</Button></Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Portofolio" title="Karya Terbaik Kami" description="Lihat karya-karya kreatif yang dihasilkan oleh anggota UDC" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <Card hover className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-royal-purple-100 to-citron-100 dark:from-royal-purple-900/30 dark:to-citron-900/30 flex items-center justify-center overflow-hidden">
                    {p.thumbnail ? <img src={`http://localhost:8000/storage/${p.thumbnail}`} alt="" className="w-full h-full object-cover" /> : <FolderOpen size={40} className="text-royal-purple-400" />}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex gap-2 mb-2">
                      {p.tags?.slice(0, 2).map((t) => <span key={t} className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400">{t}</span>)}
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">{p.judul}</h3>
                    <p className="text-sm text-neutral-500 line-clamp-2">{p.deskripsi}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/portofolio"><Button variant="outline" icon={ChevronRight}>Lihat Semua Portofolio</Button></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-citron-400/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Siap Bergabung dengan <span className="text-citron-400">UDC</span>?
            </h2>
            <p className="text-neutral-400 text-lg mb-8">Jadilah bagian dari komunitas digital creative terbesar di Untirta.</p>
            <Link to="/daftar">
              <Button size="xl" className="bg-gradient-to-r from-royal-purple-600 to-royal-purple-700 shadow-lg shadow-royal-purple-600/25">
                Daftar Sekarang <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
