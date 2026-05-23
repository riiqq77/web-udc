import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { beritaService } from '@/services/api';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await beritaService.getBySlug(slug);
        setArticle(res.data);
      } catch (error) {
        console.error("Failed to fetch article", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <div className="pt-20 min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-royal-purple-500" size={40} /></div>;

  if (!article) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Artikel tidak ditemukan</h1>
        <Link to="/berita"><Button variant="outline" icon={ArrowLeft}>Kembali</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/berita" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-royal-purple-600 transition-colors mb-8">
              <ArrowLeft size={16} /> Kembali ke Berita
            </Link>
            <Badge variant="primary" className="mb-4">{article.kategori}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">{article.judul}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}</span>
              <span className="flex items-center gap-1.5"><User size={14} /> Admin UDC</span>
            </div>
            {article.banner && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img src={`/storage/${article.banner}`} alt={article.judul} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}
            <div className="prose prose-royal-purple dark:prose-invert max-w-none prose-img:rounded-xl prose-a:text-royal-purple-600 dark:prose-a:text-royal-purple-400" dangerouslySetInnerHTML={{ __html: article.konten }} />
          </motion.div>
        </div>
      </article>
    </div>
  );
}
