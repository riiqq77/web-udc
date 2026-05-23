import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
import { prestasiService } from '@/services/api';
import toast from 'react-hot-toast';

const juaraEmoji = { '1': '🥇', '2': '🥈', '3': '🥉', 'Finalis': '🏅' };

export default function AchievementsManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nama_lomba: '', tingkat: 'Nasional', juara: '1', tahun: new Date().getFullYear().toString(), deskripsi: '' });
  const [dokumentasi, setDokumentasi] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await prestasiService.getAll();
      setData(res.data || []);
    } catch (error) {
      toast.error('Gagal memuat prestasi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { 
    setEditing(null); 
    setForm({ nama_lomba: '', tingkat: 'Nasional', juara: '1', tahun: new Date().getFullYear().toString(), deskripsi: '' }); 
    setDokumentasi(null);
    setModalOpen(true); 
  };
  
  const openEdit = (a) => { 
    setEditing(a); 
    setForm({ 
      nama_lomba: a.nama_lomba, 
      tingkat: a.tingkat, 
      juara: a.juara, 
      tahun: a.tahun?.toString() || '', 
      deskripsi: a.deskripsi 
    }); 
    setDokumentasi(null);
    setModalOpen(true); 
  };

  const handleSave = async () => {
    if (!form.nama_lomba) return toast.error('Nama lomba wajib diisi');
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (dokumentasi) formData.append('dokumentasi', dokumentasi);

      if (editing) {
        await prestasiService.update(editing.id, form);
        toast.success('Prestasi diperbarui');
      } else {
        await prestasiService.create(formData);
        toast.success('Prestasi ditambahkan');
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
    if (!window.confirm('Yakin menghapus prestasi ini?')) return;
    try {
      await prestasiService.delete(id);
      toast.success('Prestasi dihapus');
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus prestasi');
    }
  };

  if (loading && data.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manajemen Prestasi</h1><p className="text-sm text-neutral-500 mt-1">{data.length} prestasi</p></div>
        <Button icon={Plus} onClick={openAdd}>Tambah Prestasi</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="border-b border-neutral-100 dark:border-neutral-800">
            {['Lomba', 'Tingkat', 'Juara', 'Tahun', 'Aksi'].map(h => <th key={h} className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-3">{h}</th>)}
          </tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {data.map(a => (
              <tr key={a.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    {a.dokumentasi && (
                      <img src={`/storage/${a.dokumentasi}`} alt="" className="w-10 h-10 object-cover rounded-lg flex-shrink-0 bg-neutral-100 dark:bg-neutral-800" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{a.nama_lomba}</p>
                      <p className="text-xs text-neutral-400">{a.deskripsi}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3"><Badge variant="citron">{a.tingkat}</Badge></td>
                <td className="px-6 py-3"><span className="text-lg">{juaraEmoji[a.juara] || '🏅'}</span> <span className="text-sm">Juara {a.juara}</span></td>
                <td className="px-6 py-3 text-sm text-neutral-500">{a.tahun}</td>
                <td className="px-6 py-3"><div className="flex gap-1"><button onClick={() => openEdit(a)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"><Edit2 size={14} className="text-neutral-500" /></button><button onClick={() => handleDelete(a.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={14} className="text-red-500" /></button></div></td>
              </tr>
            ))}
          </tbody></table>
          {data.length === 0 && !loading && <div className="text-center py-12 text-neutral-400">Tidak ada prestasi ditemukan</div>}
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Prestasi' : 'Tambah Prestasi'}>
        <div className="space-y-4">
          <Input label="Nama Lomba" value={form.nama_lomba} onChange={e => setForm({ ...form, nama_lomba: e.target.value })} required />
          <Textarea label="Deskripsi" rows={2} value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} />
          <div className="grid grid-cols-3 gap-4">
            <Select label="Tingkat" options={['Nasional', 'Regional', 'Internasional'].map(v => ({ value: v, label: v }))} value={form.tingkat} onChange={e => setForm({ ...form, tingkat: e.target.value })} />
            <Select label="Juara" options={['1', '2', '3', 'Finalis'].map(v => ({ value: v, label: v === 'Finalis' ? v : `Juara ${v}` }))} value={form.juara} onChange={e => setForm({ ...form, juara: e.target.value })} />
            <Input label="Tahun" type="number" value={form.tahun} onChange={e => setForm({ ...form, tahun: e.target.value })} />
          </div>
          <FileUpload label="Dokumentasi Lomba" accept="image/*" onChange={(e) => setDokumentasi(e.target.files[0])} />
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} loading={submitting} className="flex-1">Simpan</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={submitting}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
