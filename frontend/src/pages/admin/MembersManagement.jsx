import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { StatusBadge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import FileUpload from '@/components/ui/FileUpload';
import { anggotaService, divisiService } from '@/services/api';
import toast from 'react-hot-toast';

export default function MembersManagement() {
  const [data, setData] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [filterDiv, setFilterDiv] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nama_lengkap: '', jabatan: '', divisi_id: '', status: 'aktif', angkatan: new Date().getFullYear().toString() });
  const [foto, setFoto] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [membersRes, divRes] = await Promise.all([
        anggotaService.getAll({ divisi_id: filterDiv, search }),
        divisiService.getAll()
      ]);
      setData(membersRes.data.data);
      setDivisions(divRes.data);
    } catch (error) {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { fetchData(); }, 300);
    return () => clearTimeout(timer);
  }, [search, filterDiv]);

  const openAdd = () => { 
    setEditing(null); 
    setForm({ nama_lengkap: '', jabatan: '', divisi_id: '', status: 'aktif', angkatan: new Date().getFullYear().toString() }); 
    setFoto(null);
    setModalOpen(true); 
  };
  
  const openEdit = (m) => { 
    setEditing(m); 
    setForm({ 
      nama_lengkap: m.nama_lengkap, 
      jabatan: m.jabatan, 
      divisi_id: m.divisi_id?.toString() || '', 
      status: m.status, 
      angkatan: m.angkatan?.toString() || '' 
    }); 
    setFoto(null);
    setModalOpen(true); 
  };

  const handleSave = async () => {
    if (!form.nama_lengkap || !form.divisi_id) return toast.error('Nama dan Divisi wajib diisi');
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (foto) formData.append('foto', foto);

      if (editing) {
        await anggotaService.update(editing.id, formData);
        toast.success('Anggota diperbarui');
      } else {
        await anggotaService.create(formData);
        toast.success('Anggota ditambahkan');
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
    if (!window.confirm('Yakin ingin menghapus anggota ini?')) return;
    try {
      await anggotaService.delete(id);
      toast.success('Anggota dihapus');
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus anggota');
    }
  };

  if (loading && data.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manajemen Anggota</h1><p className="text-sm text-neutral-500 mt-1">{data.length} anggota</p></div>
        <Button icon={Plus} onClick={openAdd}>Tambah Anggota</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Cari anggota..." /></div>
          <select value={filterDiv} onChange={e => setFilterDiv(e.target.value)} className="px-3 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm">
            <option value="">Semua Divisi</option>
            {divisions.map(d => <option key={d.id} value={d.id}>{d.nama}</option>)}
          </select>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-neutral-100 dark:border-neutral-800">
              {['Anggota', 'Divisi', 'Jabatan', 'Status', 'Aksi'].map(h => <th key={h} className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {data.map(m => (
                <tr key={m.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-3"><div className="flex items-center gap-3"><Avatar name={m.nama_lengkap} size="sm" src={m.foto ? `http://localhost:8000/storage/${m.foto}` : null} /><span className="text-sm font-medium text-neutral-900 dark:text-white">{m.nama_lengkap}</span></div></td>
                  <td className="px-6 py-3"><Badge variant="primary">{m.divisi?.nama?.split(' ')[0]}</Badge></td>
                  <td className="px-6 py-3 text-sm text-neutral-500">{m.jabatan}</td>
                  <td className="px-6 py-3"><StatusBadge status={m.status} /></td>
                  <td className="px-6 py-3"><div className="flex gap-1">
                    <button onClick={() => openEdit(m)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"><Edit2 size={14} className="text-neutral-500" /></button>
                    <button onClick={() => handleDelete(m.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"><Trash2 size={14} className="text-red-500" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && !loading && <div className="text-center py-12 text-neutral-400">Tidak ada anggota ditemukan</div>}
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Anggota' : 'Tambah Anggota'}>
        <div className="space-y-4">
          <Input label="Nama Lengkap" value={form.nama_lengkap} onChange={e => setForm({ ...form, nama_lengkap: e.target.value })} required />
          <Input label="Jabatan" value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })} />
          <Select label="Divisi" options={divisions.map(d => ({ value: d.id.toString(), label: d.nama }))} value={form.divisi_id} onChange={e => setForm({ ...form, divisi_id: e.target.value })} placeholder="Pilih divisi" />
          <Select label="Status" options={[{ value: 'aktif', label: 'Aktif' }, { value: 'nonaktif', label: 'Nonaktif' }]} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
          <Input label="Angkatan" type="number" value={form.angkatan} onChange={e => setForm({ ...form, angkatan: e.target.value })} />
          <FileUpload label="Foto Profil" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} loading={submitting} className="flex-1">Simpan</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={submitting}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
