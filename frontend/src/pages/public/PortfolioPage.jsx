import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FolderOpen, ExternalLink, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import SearchInput from '@/components/ui/SearchInput';
import { portfolioService } from '@/services/api';

export default function PortfolioPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await portfolioService.getAll({ per_page: 100 });
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch portfolios", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    return ['Semua', ...new Set(data.map(p => p.kategori).filter(Boolean))];
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter(p => {
      const matchSearch = p.judul.toLowerCase().includes(search.toLowerCase()) || p.deskripsi?.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'Semua' || p.kategori === category;
      return matchSearch && matchCat;
    });
  }, [data, search, category]);

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-royal-purple-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Portofolio</h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Karya-karya kreatif yang dihasilkan oleh anggota UDC</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Cari karya..." /></div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === cat ? 'bg-royal-purple-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-royal-purple-500" size={40} /></div>
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filtered.map(p => {
                    const author = p.anggota;
                    return (
                      <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                        <Card hover className="overflow-hidden cursor-pointer group" onClick={() => setSelected(p)}>
                          <div className="h-48 bg-gradient-to-br from-royal-purple-100 to-citron-100 dark:from-royal-purple-900/30 dark:to-citron-900/30 flex items-center justify-center overflow-hidden">
                            {p.thumbnail ? (
                              <img src={`/storage/${p.thumbnail}`} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                              <FolderOpen size={40} className="text-royal-purple-300" />
                            )}
                          </div>
                          <CardContent className="p-5">
                            <div className="flex gap-2 mb-2 flex-wrap">
                              {p.tags?.slice(0,3).map(t => <span key={t} className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500">{t}</span>)}
                            </div>
                            <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">{p.judul}</h3>
                            <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{p.deskripsi}</p>
                            <div className="flex items-center justify-between">
                              {author ? <div className="flex items-center gap-2"><Avatar name={author.nama_lengkap} size="sm" /><span className="text-xs text-neutral-500 truncate max-w-[120px]">{author.nama_lengkap}</span></div> : <div />}
                              <span className="text-xs text-neutral-400">{p.tahun}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
              {filtered.length === 0 && <div className="text-center py-16 text-neutral-400">Tidak ada portofolio ditemukan</div>}
            </>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.judul} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="h-64 bg-gradient-to-br from-royal-purple-100 to-citron-100 dark:from-royal-purple-900/30 dark:to-citron-900/30 rounded-xl flex items-center justify-center overflow-hidden">
              {selected.thumbnail ? (
                <img src={`/storage/${selected.thumbnail}`} alt="" className="w-full h-full object-contain bg-neutral-900/5" />
              ) : (
                <FolderOpen size={60} className="text-royal-purple-300" />
              )}
            </div>
            <div className="flex gap-2 flex-wrap">{selected.tags?.map(t => <Badge key={t} variant="primary">{t}</Badge>)}</div>
            <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line">{selected.deskripsi}</p>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                {selected.anggota && (
                  <>
                    {selected.anggota.foto ? (
                      <img src={`/storage/${selected.anggota.foto}`} alt={selected.anggota.nama_lengkap} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <Avatar name={selected.anggota.nama_lengkap} size="sm" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{selected.anggota.nama_lengkap}</p>
                      <p className="text-xs text-neutral-400">{selected.divisi?.nama || selected.anggota.divisi?.nama}</p>
                    </div>
                  </>
                )}
              </div>
              <Badge variant="citron">{selected.tahun}</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
