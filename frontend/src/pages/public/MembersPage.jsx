import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Briefcase, Code2, Loader2 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import SectionHeader from '@/components/shared/SectionHeader';
import { anggotaService, divisiService } from '@/services/api';

const CORE_ROLES = ['ketua umum', 'wakil ketua', 'sekretaris', 'bendahara'];

export default function MembersPage() {
  const [data, setData] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [memRes, divRes] = await Promise.all([
          anggotaService.getAll({ per_page: 500 }),
          divisiService.getAll()
        ]);
        setData(memRes.data.data || []);
        setDivisions(divRes.data || []);
      } catch (error) {
        console.error("Failed to fetch members", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const divOptions = useMemo(() => ['Semua', ...divisions.map(d => d.nama)], [divisions]);
  
  const filtered = useMemo(() => {
    return filter === 'Semua' 
      ? data 
      : data.filter(m => (m.divisi?.nama || divisions.find(d => d.id === m.divisi_id)?.nama) === filter);
  }, [filter, data, divisions]);

  const pengurus = useMemo(() => {
    const coreTeam = data.filter(m => 
      m.jabatan && CORE_ROLES.some(role => m.jabatan.toLowerCase().includes(role))
    );
    coreTeam.sort((a, b) => {
      const rankA = CORE_ROLES.findIndex(r => a.jabatan.toLowerCase().includes(r));
      const rankB = CORE_ROLES.findIndex(r => b.jabatan.toLowerCase().includes(r));
      return rankA - rankB;
    });
    return coreTeam;
  }, [data]);

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-royal-purple-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Anggota UDC</h1>
            <p className="text-lg text-neutral-500">Tim hebat di balik setiap karya dan prestasi</p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center"><Loader2 className="animate-spin text-royal-purple-500" size={40} /></div>
      ) : (
        <>
          {/* Pengurus Inti */}
          {pengurus.length > 0 && (
            <section className="py-16 bg-white dark:bg-neutral-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader badge="Pengurus Inti" title="Jajaran Pengurus" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  {pengurus.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="text-center group">
                      <div className="relative mb-4">
                        {p.foto ? (
                          <img src={`/storage/${p.foto}`} alt="" className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-royal-purple-100 dark:ring-royal-purple-900/30 group-hover:ring-royal-purple-300 transition-all" />
                        ) : (
                          <Avatar name={p.nama_lengkap} size="xl" className="mx-auto ring-4 ring-royal-purple-100 dark:ring-royal-purple-900/30 group-hover:ring-royal-purple-300 transition-all" />
                        )}
                      </div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white truncate">{p.nama_lengkap}</h4>
                      <p className="text-sm text-royal-purple-600 dark:text-royal-purple-400 font-medium truncate">{p.jabatan}</p>
                      <div className="flex justify-center gap-2 mt-2">
                        {p.instagram && <a href={p.instagram} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-royal-purple-600 transition-colors"><Camera size={14} /></a>}
                        {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-royal-purple-600 transition-colors"><Briefcase size={14} /></a>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Members */}
          <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader badge="Anggota" title="Seluruh Anggota" />
              <div className="flex gap-2 flex-wrap justify-center mb-8">
                {divOptions.map(d => (
                  <button key={d} onClick={() => setFilter(d)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === d ? 'bg-royal-purple-600 text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:border-royal-purple-300'}`}>
                    {d}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filtered.map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    {m.foto ? (
                      <img src={`/storage/${m.foto}`} alt="" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                    ) : (
                      <Avatar name={m.nama_lengkap} size="lg" className="mx-auto mb-3" />
                    )}
                    <h4 className="font-medium text-sm text-neutral-900 dark:text-white truncate">{m.nama_lengkap}</h4>
                    <p className="text-[10px] text-neutral-500 truncate">{m.jabatan}</p>
                    <p className="text-[10px] text-royal-purple-500 mt-1 truncate">{m.divisi?.nama || divisions.find(d => d.id === m.divisi_id)?.nama}</p>
                  </motion.div>
                ))}
              </div>
              {filtered.length === 0 && <div className="text-center py-12 text-neutral-500">Tidak ada anggota di kategori ini.</div>}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
