import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, MailOpen, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { pesanService } from '@/services/api';
import toast from 'react-hot-toast';

export default function MessagesManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await pesanService.getAll();
      setData(res.data || []);
    } catch (error) {
      toast.error('Gagal memuat pesan kontak');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const markRead = async (id) => {
    try {
      await pesanService.markAsRead(id);
      setData(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    } catch (error) {
      console.error('Failed to mark read', error);
    }
  };

  const handleDelete = async (id) => { 
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
    try {
      await pesanService.delete(id);
      setData(prev => prev.filter(m => m.id !== id)); 
      toast.success('Pesan dihapus'); 
      setSelected(null); 
    } catch (error) {
      toast.error('Gagal menghapus pesan');
    }
  };

  const openMessage = (m) => { 
    setSelected(m); 
    if (!m.is_read) markRead(m.id); 
  };

  if (loading && data.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Pesan Masuk</h1><p className="text-sm text-neutral-500 mt-1">{data.filter(m => !m.is_read).length} belum dibaca</p></div>

      <Card>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {data.map(m => (
            <div key={m.id} onClick={() => openMessage(m)}
              className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${!m.is_read ? 'bg-royal-purple-50/50 dark:bg-royal-purple-900/10' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!m.is_read ? 'bg-royal-purple-100 dark:bg-royal-purple-900/30' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
                {!m.is_read ? <Mail size={16} className="text-royal-purple-600" /> : <MailOpen size={16} className="text-neutral-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm truncate ${!m.is_read ? 'font-semibold text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>{m.nama}</p>
                  {!m.is_read && <Badge variant="primary">Baru</Badge>}
                </div>
                <p className="text-sm text-neutral-500 truncate">{m.subjek}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">{new Date(m.created_at).toLocaleDateString()}</span>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
              </div>
            </div>
          ))}
          {data.length === 0 && !loading && <div className="text-center py-12 text-neutral-400">Tidak ada pesan masuk</div>}
        </div>
      </Card>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.subjek}>
        {selected && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div><p className="font-medium text-neutral-900 dark:text-white">{selected.nama}</p><p className="text-sm text-neutral-400">{selected.email}</p></div>
              <span className="text-xs text-neutral-400">{new Date(selected.created_at).toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800"><p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{selected.pesan}</p></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
