import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, Users, GraduationCap, Heart, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import Avatar from '@/components/ui/Avatar';
import { orgInfo, timeline } from '@/data/mockData';
import { anggotaService } from '@/services/api';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const pilarIcons = [Lightbulb, Users, GraduationCap, Heart];
const CORE_ROLES = ['ketua umum', 'wakil ketua', 'sekretaris', 'bendahara'];

export default function AboutPage() {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPengurus = async () => {
      try {
        setLoading(true);
        const res = await anggotaService.getAll({ per_page: 500 });
        const allMembers = res.data.data || [];
        // Filter those whose jabatan contains one of the CORE_ROLES
        const coreTeam = allMembers.filter(m => 
          m.jabatan && CORE_ROLES.some(role => m.jabatan.toLowerCase().includes(role))
        );
        // Sort by hierarchy (basic)
        coreTeam.sort((a, b) => {
          const rankA = CORE_ROLES.findIndex(r => a.jabatan.toLowerCase().includes(r));
          const rankB = CORE_ROLES.findIndex(r => b.jabatan.toLowerCase().includes(r));
          return rankA - rankB;
        });
        setPengurus(coreTeam);
      } catch (error) {
        console.error("Failed to fetch pengurus", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPengurus();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-royal-purple-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-royal-purple-100 dark:bg-royal-purple-900/30 text-royal-purple-600 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Tentang Kami</span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">Mengenal UDC Lebih Dekat</h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">{orgInfo.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 bg-royal-purple-600 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-4"><Eye size={24} /><h3 className="text-xl font-bold">Visi</h3></div>
              <p className="text-royal-purple-100 leading-relaxed">{orgInfo.visi}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 mb-4"><Target size={24} className="text-royal-purple-600" /><h3 className="text-xl font-bold text-neutral-900 dark:text-white">Misi</h3></div>
              <ul className="space-y-3">
                {orgInfo.misi.map((m, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-royal-purple-100 dark:bg-royal-purple-900/30 text-royal-purple-600 text-xs font-bold">{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Pilar */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Pilar" title="4 Pilar Organisasi" description="Fondasi yang menjadi dasar seluruh kegiatan UDC" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orgInfo.pipilar.map((p, i) => {
              const Icon = pilarIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-royal-purple-50 dark:bg-royal-purple-900/20 flex items-center justify-center">
                    <Icon size={24} className="text-royal-purple-600 dark:text-royal-purple-400" />
                  </div>
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-2">{p.title}</h4>
                  <p className="text-sm text-neutral-500">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pengurus Inti */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Pengurus" title="Struktur Pengurus Inti" description="Tim inti yang memimpin UDC periode ini" />
          {loading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin text-royal-purple-500" size={32} /></div>
          ) : pengurus.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {pengurus.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="text-center">
                  {p.foto ? (
                    <img src={`/storage/${p.foto}`} alt="" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover shadow-md" />
                  ) : (
                    <Avatar name={p.nama_lengkap} size="xl" className="mx-auto mb-3 shadow-md" />
                  )}
                  <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{p.nama_lengkap}</h4>
                  <p className="text-xs text-royal-purple-600 dark:text-royal-purple-400 font-medium">{p.jabatan}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-neutral-500">Struktur pengurus belum diperbarui.</div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader badge="Perjalanan" title="Timeline UDC" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-royal-purple-600 rounded-full -translate-x-1/2 z-10 ring-4 ring-white dark:ring-neutral-900" />
                <div className="flex-1 ml-10 md:ml-0 p-5 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-bold text-royal-purple-600">{t.year}</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mt-1">{t.title}</h4>
                  <p className="text-sm text-neutral-500 mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
