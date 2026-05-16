import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { divisiService } from '@/services/api';
import toast from 'react-hot-toast';

export default function DivisionsManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nama: '', deskripsi: '', warna: '#700143' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await divisiService.getAll();
      setData(res.data);
    } catch (error) {
      toast.error('Gagal memuat divisi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ nama: '', deskripsi: '', warna: '#700143' }); setModalOpen(true); };
  const openEdit = (d) => { setEditing(d); setForm({ nama: d.nama, deskripsi: d.deskripsi, warna: d.warna }); setModalOpen(true); };
  
  const handleSave = async () => {
    if (!form.nama) return toast.error('Nama divisi wajib diisi');
    setSubmitting(true);
    try {
      if (editing) {
        await divisiService.update(editing.id, form);
        toast.success('Divisi diperbarui');
      } else {
        await divisiService.create(form);
        toast.success('Divisi ditambahkan');
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
    if (!window.confirm('Yakin ingin menghapus divisi ini?')) return;
    try {
      await divisiService.delete(id);
      toast.success('Divisi dihapus');
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus divisi');
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manajemen Divisi</h1><p className="text-sm text-neutral-500 mt-1">{data.length} divisi</p></div>
        <Button icon={Plus} onClick={openAdd}>Tambah Divisi</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(d => (
          <Card key={d.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: d.warna + '20' }}>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: d.warna }} />
                </div>
                <div className="flex-1"><h3 className="font-semibold text-neutral-900 dark:text-white">{d.nama}</h3><p className="text-xs text-neutral-400">{d.anggota_count || 0} anggota</p></div>
              </div>
              <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{d.deskripsi}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" icon={Edit2} onClick={() => openEdit(d)}>Edit</Button>
                <Button size="sm" variant="ghost" icon={Trash2} onClick={() => handleDelete(d.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">Hapus</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {data.length === 0 && <div className="col-span-full p-8 text-center text-neutral-500">Belum ada data divisi.</div>}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Divisi' : 'Tambah Divisi'}>
        <div className="space-y-4">
          <Input label="Nama Divisi" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} required />
          <Textarea label="Deskripsi" rows={3} value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} />
          <div className="space-y-1.5"><label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Warna Identitas</label><input type="color" value={form.warna} onChange={e => setForm({ ...form, warna: e.target.value })} className="w-full h-10 rounded-lg cursor-pointer" /></div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} loading={submitting} className="flex-1">Simpan</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={submitting}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
