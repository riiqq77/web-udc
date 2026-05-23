import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import Avatar from '@/components/ui/Avatar';
import { divisiService, anggotaService } from '@/services/api';

export default function DivisionsPage() {
  const [openId, setOpenId] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [divRes, memRes] = await Promise.all([
          divisiService.getAll(),
          anggotaService.getAll({ per_page: 500 }) // Fetch enough members to show previews
        ]);
        setDivisions(divRes.data);
        setMembers(memRes.data.data);
      } catch (error) {
        console.error("Failed to fetch divisions data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="pt-20 min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-royal-purple-500" size={40} /></div>;

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-citron-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Divisi UDC</h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">6 divisi dengan fokus dan keahlian berbeda untuk mengembangkan potensimu</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {divisions.map((div, i) => {
            const isOpen = openId === div.id;
            const divMembers = members.filter(m => m.divisi_id === div.id);
            // Parse tasks if they are stored as JSON or comma separated. Assuming comma separated string or array.
            // If the database doesn't have a specific `tasks` field, we'll ignore it or parse from description if needed.
            // For now, let's assume no specific tasks field exists on backend model, we will omit the tasks section if empty.
            return (
              <motion.div key={div.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenId(isOpen ? null : div.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: div.warna + '15' }}>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: div.warna }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 dark:text-white text-lg">{div.nama}</h3>
                      <p className="text-sm text-neutral-500">{div.anggota_count || divMembers.length} anggota</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} className="text-neutral-400" /></motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6 border-t border-neutral-100 dark:border-neutral-800 pt-4">
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">{div.deskripsi}</p>
                        
                        {divMembers.length > 0 && (
                          <>
                            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-3">Preview Anggota:</h4>
                            <div className="flex gap-4 flex-wrap">
                              {divMembers.slice(0, 5).map(m => (
                                <div key={m.id} className="flex items-center gap-2 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                                  {m.foto ? (
                                    <img src={`/storage/${m.foto}`} alt="" className="w-8 h-8 rounded-full object-cover" />
                                  ) : (
                                    <Avatar name={m.nama_lengkap} size="sm" />
                                  )}
                                  <div>
                                    <p className="text-xs font-medium text-neutral-900 dark:text-white truncate max-w-[100px]">{m.nama_lengkap}</p>
                                    <p className="text-[10px] text-neutral-400">{m.jabatan}</p>
                                  </div>
                                </div>
                              ))}
                              {divMembers.length > 5 && (
                                <div className="flex items-center justify-center px-3 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-xs text-neutral-500">
                                  +{divMembers.length - 5} lainnya
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
