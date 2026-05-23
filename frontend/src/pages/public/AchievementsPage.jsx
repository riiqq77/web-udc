import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import Badge from '@/components/ui/Badge';
import { prestasiService } from '@/services/api';

const juaraIcon = { '1': '🥇', '2': '🥈', '3': '🥉', 'Finalis': '🏅', 'Juara 1': '🥇', 'Juara 2': '🥈', 'Juara 3': '🥉' };

export default function AchievementsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await prestasiService.getAll({ per_page: 100 });
        setData(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getJuaraCategory = (juara) => {
    const j = juara?.toString().toLowerCase() || '';
    if (j.includes('1') || j === 'satu') return '1';
    if (j.includes('2') || j === 'dua') return '2';
    if (j.includes('3') || j === 'tiga') return '3';
    return 'Finalis';
  };

  if (loading) return <div className="pt-20 min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-royal-purple-500" size={40} /></div>;

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-butter to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Prestasi UDC</h1>
            <p className="text-lg text-neutral-500">Pencapaian membanggakan yang diraih oleh anggota UDC</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[{ icon: '🥇', label: 'Juara 1', count: data.filter(a => getJuaraCategory(a.juara) === '1').length },
            { icon: '🥈', label: 'Juara 2', count: data.filter(a => getJuaraCategory(a.juara) === '2').length },
            { icon: '🥉', label: 'Juara 3', count: data.filter(a => getJuaraCategory(a.juara) === '3').length }
          ].map(s => (
            <div key={s.label} className="p-4">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">{s.count}</div>
              <div className="text-sm text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader badge="Showcase" title="Achievement Timeline" />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
            {data.map((a, i) => {
              const cat = getJuaraCategory(a.juara);
              return (
                <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 mb-6">
                  <div className="relative z-10 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl text-xl border-2 bg-white dark:bg-neutral-900"
                    style={{ borderColor: cat === '1' ? '#F59E0B' : cat === '2' ? '#9CA3AF' : cat === '3' ? '#F97316' : '#3B82F6' }}>
                    {juaraIcon[cat] || '🏅'}
                  </div>
                  <div className="flex-1 p-5 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={cat === '1' ? 'warning' : cat === '2' ? 'default' : 'primary'}>{a.juara}</Badge>
                      <Badge variant="citron">{a.tingkat}</Badge>
                      <span className="text-xs text-neutral-400 ml-auto">{a.tahun}</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">{a.nama_lomba}</h3>
                    <p className="text-sm text-neutral-500 mb-3">{a.deskripsi}</p>
                    {a.dokumentasi && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
                        <img src={`/storage/${a.dokumentasi}`} alt={a.nama_lomba} className="w-full h-48 object-cover" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          {data.length === 0 && <div className="text-center py-12 text-neutral-500">Belum ada data prestasi.</div>}
        </div>
      </section>
    </div>
  );
}
