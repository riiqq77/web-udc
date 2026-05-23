import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Download, Eye, Loader2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge, { StatusBadge } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { pendaftaranService } from '@/services/api';
import toast from 'react-hot-toast';

export default function RegistrationManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await pendaftaranService.getAll();
      setData(res.data.data);
    } catch (error) {
      toast.error('Gagal memuat data pendaftaran');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id, status) => { 
    setUpdating(true);
    try {
      await pendaftaranService.updateStatus(id, { status });
      setData(prev => prev.map(d => d.id === id ? { ...d, status } : d)); 
      toast.success(status === 'diterima' ? 'Pendaftar diterima' : 'Pendaftar ditolak'); 
      setSelected(null); 
    } catch (error) {
      toast.error('Gagal memperbarui status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading && data.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-neutral-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manajemen Pendaftaran</h1><p className="text-sm text-neutral-500 mt-1">{data.filter(d => d.status === 'pending').length} menunggu review</p></div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="border-b border-neutral-100 dark:border-neutral-800">
            {['Pendaftar', 'Jurusan', 'Divisi', 'Tanggal', 'Status', 'Aksi'].map(h => <th key={h} className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-3">{h}</th>)}
          </tr></thead><tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {data.map(d => (
              <tr key={d.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-3"><div><p className="text-sm font-medium text-neutral-900 dark:text-white">{d.nama}</p><p className="text-xs text-neutral-400">{d.email}</p></div></td>
                <td className="px-6 py-3 text-sm text-neutral-500">{d.jurusan}</td>
                <td className="px-6 py-3"><Badge variant="primary">{d.divisi?.nama?.split(' ')[0]}</Badge></td>
                <td className="px-6 py-3 text-sm text-neutral-500">{new Date(d.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-6 py-3"><div className="flex gap-1">
                  <button onClick={() => setSelected(d)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"><Eye size={14} className="text-neutral-500" /></button>
                  {d.status === 'pending' && <>
                    <button onClick={() => updateStatus(d.id, 'diterima')} className="p-1.5 hover:bg-green-50 rounded-lg" disabled={updating}><CheckCircle size={14} className="text-green-500" /></button>
                    <button onClick={() => updateStatus(d.id, 'ditolak')} className="p-1.5 hover:bg-red-50 rounded-lg" disabled={updating}><XCircle size={14} className="text-red-500" /></button>
                  </>}
                </div></td>
              </tr>
            ))}
          </tbody></table>
          {data.length === 0 && !loading && <div className="text-center py-12 text-neutral-400">Tidak ada pendaftaran ditemukan</div>}
        </div>
      </Card>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Detail Pendaftaran">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[['Nama', selected.nama], ['NIM', selected.nim], ['Email', selected.email], ['Jurusan', selected.jurusan], ['Divisi', selected.divisi?.nama], ['Status', selected.status], ['No. Telepon', selected.telepon]].map(([k, v]) => (
                <div key={k}><p className="text-xs text-neutral-400 mb-0.5">{k}</p><p className="text-sm font-medium text-neutral-900 dark:text-white">{v || '-'}</p></div>
              ))}
            </div>
            <div><p className="text-xs text-neutral-400 mb-1">Motivasi / Alasan</p><p className="text-sm text-neutral-600 dark:text-neutral-400">{selected.motivasi}</p></div>
            {selected.cv_path && (
              <a href={`/storage/${selected.cv_path}`} target="_blank" rel="noreferrer" className="inline-block">
                <Button variant="outline" icon={Download} size="sm">Lihat CV</Button>
              </a>
            )}
            {selected.status === 'pending' && (
              <div className="flex gap-3 pt-2">
                <Button onClick={() => updateStatus(selected.id, 'diterima')} icon={CheckCircle} className="flex-1 bg-green-600 hover:bg-green-700" loading={updating}>Terima</Button>
                <Button onClick={() => updateStatus(selected.id, 'ditolak')} variant="danger" icon={XCircle} className="flex-1" loading={updating}>Tolak</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
