import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Newspaper, Loader2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { StatusBadge } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import { Input, Textarea, Select } from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
import { beritaService } from '@/services/api';
import toast from 'react-hot-toast';

export default function NewsManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ judul: '', konten: '', kategori: 'Berita', status: 'draft' });
  const [banner, setBanner] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await beritaService.getAll({ search });
      setData(res.data.data);
    } catch (error) {
      toast.error('Gagal memuat berita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { fetchData(); }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const openAdd = () => { 
    setEditing(null); 
    setForm({ judul: '', konten: '', kategori: 'Berita', status: 'draft' }); 
    setBanner(null);
    setModalOpen(true); 
  };
  
  const openEdit = (n) => { 
    setEditing(n); 
    setForm({ 
      judul: n.judul, 
      konten: n.konten?.replace(/<[^>]*>/g, '') || '', 
      kategori: n.kategori, 
      status: n.status 
    }); 
    setBanner(null);
    setModalOpen(true); 
  };

  const handleSave = async () => {
    if (!form.judul || !form.konten) return toast.error('Judul dan Konten wajib diisi');
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === 'konten') formData.append(key, `<p>${form[key]}</p>`);
        else formData.append(key, form[key]);
      });
      if (banner) formData.append('banner', banner);

      if (editing) {
        await beritaService.update(editing.id, { ...form, konten: `<p>${form.konten}</p>` }); 
        toast.success('Berita diperbarui');
      } else {
        await beritaService.create(formData);
        toast.success('Berita ditambahkan');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => { 
    if (!window.confirm('Yakin menghapus berita ini?')) return;
    try {
      await beritaService.delete(id);
      toast.success('Berita dihapus');
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus berita');
    }
  };

  if (loading && data.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manajemen Berita</h1><p className="text-sm text-neutral-500 mt-1">{data.length} berita</p></div>
        <Button icon={Plus} onClick={openAdd}>Tambah Berita</Button>
      </div>
      <Card><CardHeader><SearchInput value={search} onChange={setSearch} placeholder="Cari berita..." /></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="border-b border-neutral-100 dark:border-neutral-800">
            {['Berita', 'Kategori', 'Status', 'Tanggal', 'Aksi'].map(h => <th key={h} className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-3">{h}</th>)}
          </tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {data.map(n => (
              <tr key={n.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                      {n.banner ? <img src={`http://localhost:8000/storage/${n.banner}`} alt="" className="w-full h-full object-cover" /> : <Newspaper size={16} className="text-neutral-400" />}
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">{n.judul}</span>
                  </div>
                </td>
                <td className="px-6 py-3"><Badge variant="primary">{n.kategori}</Badge></td>
                <td className="px-6 py-3"><StatusBadge status={n.status} /></td>
                <td className="px-6 py-3 text-sm text-neutral-500">{n.published_at ? new Date(n.published_at).toLocaleDateString() : '-'}</td>
                <td className="px-6 py-3"><div className="flex gap-1"><button onClick={() => openEdit(n)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"><Edit2 size={14} className="text-neutral-500" /></button><button onClick={() => handleDelete(n.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button></div></td>
              </tr>
            ))}
          </tbody></table>
          {data.length === 0 && !loading && <div className="text-center py-12 text-neutral-400">Tidak ada berita ditemukan</div>}
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Berita' : 'Tambah Berita'} size="lg">
        <div className="space-y-4">
          <Input label="Judul" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} required />
          <Textarea label="Konten" rows={8} value={form.konten} onChange={e => setForm({ ...form, konten: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Kategori" options={['Berita', 'Kegiatan', 'Kompetisi', 'Rekrutmen'].map(v => ({ value: v, label: v }))} value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })} />
            <Select label="Status" options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }]} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
          </div>
          <FileUpload label="Banner Image" accept="image/*" onChange={(e) => setBanner(e.target.files[0])} />
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} loading={submitting} className="flex-1">Simpan</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={submitting}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
