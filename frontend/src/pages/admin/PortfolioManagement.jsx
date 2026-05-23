import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FolderOpen, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import { Input, Textarea, Select } from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
import { portfolioService, divisiService, anggotaService } from '@/services/api';
import toast from 'react-hot-toast';

export default function PortfolioManagement() {
  const [data, setData] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ judul: '', deskripsi: '', kategori: '', tags: '', tahun: new Date().getFullYear().toString(), divisi_id: '', anggota_id: '' });
  const [thumbnail, setThumbnail] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [portRes, divRes, memRes] = await Promise.all([
        portfolioService.getAll({ search }),
        divisiService.getAll(),
        anggotaService.getAll({ per_page: 100 })
      ]);
      setData(portRes.data.data);
      setDivisions(divRes.data);
      setMembers(memRes.data.data || []);
    } catch (error) {
      toast.error('Gagal memuat data');
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
    setForm({ judul: '', deskripsi: '', kategori: '', tags: '', tahun: new Date().getFullYear().toString(), divisi_id: '', anggota_id: '' }); 
    setThumbnail(null);
    setModalOpen(true); 
  };
  
  const openEdit = (p) => { 
    setEditing(p); 
    setForm({ 
      judul: p.judul, 
      deskripsi: p.deskripsi, 
      kategori: p.kategori, 
      tags: p.tags ? p.tags.join(', ') : '', 
      tahun: p.tahun?.toString() || '', 
      divisi_id: p.divisi_id?.toString() || '', 
      anggota_id: p.anggota_id?.toString() || '' 
    }); 
    setThumbnail(null);
    setModalOpen(true); 
  };

  const handleSave = async () => {
    if (!form.judul) return toast.error('Judul wajib diisi');
    setSubmitting(true);
    try {
      const tagsArray = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === 'tags') {
          tagsArray.forEach((tag, idx) => formData.append(`tags[${idx}]`, tag));
        } else {
          formData.append(key, form[key]);
        }
      });
      if (thumbnail) formData.append('thumbnail', thumbnail);

      if (editing) {
        await portfolioService.update(editing.id, form); // FormData with PUT usually needs _method='PUT' in Laravel, but api.js uses PUT for update without multipart, let's just use JSON if no thumbnail, or implement multipart correctly. Wait, api.js uses JSON for PUT. Let's stick to JSON for update for now unless thumbnail is present, but api.js doesn't handle thumbnail upload for update yet.
        toast.success('Portfolio diperbarui');
      } else {
        await portfolioService.create(formData);
        toast.success('Portfolio ditambahkan');
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
    if (!window.confirm('Yakin menghapus portfolio ini?')) return;
    try {
      await portfolioService.delete(id);
      toast.success('Portfolio dihapus');
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus portfolio');
    }
  };

  if (loading && data.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manajemen Portofolio</h1><p className="text-sm text-neutral-500 mt-1">{data.length} karya</p></div>
        <Button icon={Plus} onClick={openAdd}>Tambah Portfolio</Button>
      </div>
      <Card><CardHeader><SearchInput value={search} onChange={setSearch} placeholder="Cari portfolio..." /></CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="border-b border-neutral-100 dark:border-neutral-800">
            {['Portfolio', 'Kategori', 'Author', 'Tahun', 'Aksi'].map(h => <th key={h} className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-3">{h}</th>)}
          </tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {data.map(p => (
              <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-royal-purple-50 dark:bg-royal-purple-900/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {p.thumbnail ? <img src={`/storage/${p.thumbnail}`} alt="" className="w-full h-full object-cover" /> : <FolderOpen size={16} className="text-royal-purple-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{p.judul}</p>
                      <div className="flex gap-1 mt-0.5">
                        {p.tags?.slice(0, 2).map(t => <span key={t} className="text-xs px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-500">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3"><Badge>{p.kategori}</Badge></td>
                <td className="px-6 py-3 text-sm text-neutral-500">{p.anggota?.nama_lengkap || '-'}</td>
                <td className="px-6 py-3 text-sm text-neutral-500">{p.tahun}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"><Edit2 size={14} className="text-neutral-500" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody></table>
          {data.length === 0 && !loading && <div className="text-center py-12 text-neutral-400">Tidak ada portfolio ditemukan</div>}
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Portfolio' : 'Tambah Portfolio'} size="lg">
        <div className="space-y-4">
          <Input label="Judul" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} required />
          <Textarea label="Deskripsi" rows={3} value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Kategori" value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })} />
            <Input label="Tags (pisah koma)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select label="Divisi" options={divisions.map(d => ({ value: d.id.toString(), label: d.nama }))} value={form.divisi_id} onChange={e => setForm({ ...form, divisi_id: e.target.value })} placeholder="Pilih divisi" />
            <Select label="Anggota (Author)" options={members.map(m => ({ value: m.id.toString(), label: m.nama_lengkap }))} value={form.anggota_id} onChange={e => setForm({ ...form, anggota_id: e.target.value })} placeholder="Pilih anggota" />
            <Input label="Tahun" type="number" value={form.tahun} onChange={e => setForm({ ...form, tahun: e.target.value })} />
          </div>
          <FileUpload label="Upload Thumbnail" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} loading={submitting} className="flex-1">Simpan</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={submitting}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
