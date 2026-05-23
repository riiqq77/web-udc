import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Newspaper, Loader2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';
import { beritaService } from '@/services/api';

const categories = ['Semua', 'Berita', 'Kegiatan', 'Kompetisi', 'Rekrutmen'];
const ITEMS_PER_PAGE = 4;

export default function NewsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Semua');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Ensure we fetch all published news. The API might need 'status=published' or handle it on backend.
        // Assuming backend handles public viewing or we just filter locally if not too many.
        const res = await beritaService.getAll({ per_page: 100 }); 
        // Filter out drafts if they leak to public API
        const publishedNews = res.data.data.filter(n => n.status === 'published' || !n.status); 
        setData(publishedNews);
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return category === 'Semua' ? data : data.filter(n => n.kategori === category);
  }, [category, data]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const featured = data.length > 0 ? data[0] : null;

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><Loader2 className="animate-spin text-royal-purple-500" size={40} /></div>;

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-royal-purple-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Berita & Kegiatan</h1>
            <p className="text-lg text-neutral-500">Info terbaru seputar kegiatan dan pencapaian UDC</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          {featured && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to={`/berita/${featured.slug}`}>
                <div className="relative mb-12 p-8 md:p-12 bg-gradient-to-br from-royal-purple-600 to-royal-purple-800 rounded-2xl text-white overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 z-10" />
                  {featured.banner && (
                    <img src={`/storage/${featured.banner}`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="relative z-20">
                    <Badge variant="citron" className="mb-4">{featured.kategori}</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:underline">{featured.judul}</h2>
                    <div className="flex items-center gap-2 text-royal-purple-200 text-sm"><Calendar size={14} />{featured.published_at ? new Date(featured.published_at).toLocaleDateString() : '-'}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === cat ? 'bg-royal-purple-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {paginated.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={`/berita/${n.slug}`}>
                  <Card hover className="h-full overflow-hidden group">
                    <div className="h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center overflow-hidden">
                      {n.banner ? (
                        <img src={`/storage/${n.banner}`} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <Newspaper size={36} className="text-neutral-300 dark:text-neutral-600" />
                      )}
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="primary" className="mb-2">{n.kategori}</Badge>
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2">{n.judul}</h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-400"><Calendar size={12} />{n.published_at ? new Date(n.published_at).toLocaleDateString() : '-'}</div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {filtered.length === 0 && <div className="text-center py-12 text-neutral-500">Tidak ada berita dalam kategori ini.</div>}

          {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
        </div>
      </section>
    </div>
  );
}
