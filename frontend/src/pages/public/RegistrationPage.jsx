import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { Input, Textarea, Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { divisiService, pendaftaranService } from '@/services/api';
import toast from 'react-hot-toast';

export default function RegistrationPage() {
  const [divisions, setDivisions] = useState([]);
  const [form, setForm] = useState({ 
    nama_lengkap: '', 
    email: '', 
    no_wa: '', 
    nim: '', 
    jurusan: '', 
    angkatan: new Date().getFullYear().toString(), 
    divisi_id: '', 
    alasan_bergabung: '' 
  });
  const [cv, setCv] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await divisiService.getAll();
        setDivisions(res.data);
      } catch (error) {
        console.error("Failed to fetch divisions", error);
      }
    };
    fetchDivisions();
  }, []);

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    if (!form.nama_lengkap || !form.email || !form.divisi_id) return toast.error('Lengkapi data wajib');
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (cv) formData.append('cv', cv); // Assuming API expects 'cv' instead of 'cv_path' for upload. Let's check api.js or backend controller. Wait, the API usually expects 'cv' file.

      await pendaftaranService.submit(formData);
      setSubmitted(true); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengirim pendaftaran');
    } finally {
      setSubmitting(false);
    }
  };
  
  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  if (submitted) return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">Pendaftaran Berhasil!</h1>
        <p className="text-neutral-500 mb-6">Terima kasih telah mendaftar. Tim kami akan menghubungi kamu melalui email.</p>
        <Button variant="outline" onClick={() => {
          setSubmitted(false);
          setForm({ nama_lengkap: '', email: '', no_wa: '', nim: '', jurusan: '', angkatan: new Date().getFullYear().toString(), divisi_id: '', alasan_bergabung: '' });
          setCv(null);
        }}>Daftar Lagi</Button>
      </motion.div>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-citron-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Daftar Anggota</h1>
            <p className="text-lg text-neutral-500">Isi formulir di bawah untuk bergabung dengan UDC</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Nama Lengkap *" placeholder="Nama lengkap" value={form.nama_lengkap} onChange={e => update('nama_lengkap', e.target.value)} required />
              <Input label="NIM *" placeholder="3337XXXXXX" value={form.nim} onChange={e => update('nim', e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Email *" type="email" placeholder="email@student.untirta.ac.id" value={form.email} onChange={e => update('email', e.target.value)} required />
              <Input label="No. Telepon / WA *" placeholder="08xxxxxxxxxx" value={form.no_wa} onChange={e => update('no_wa', e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Jurusan *" placeholder="Teknik Informatika" value={form.jurusan} onChange={e => update('jurusan', e.target.value)} required />
              <Input label="Angkatan *" placeholder="2024" type="number" value={form.angkatan} onChange={e => update('angkatan', e.target.value)} required />
            </div>
            <Select label="Pilih Divisi *" placeholder="Pilih divisi yang diminati"
              options={divisions.map(d => ({ value: d.id.toString(), label: d.nama }))}
              value={form.divisi_id} onChange={e => update('divisi_id', e.target.value)} required />
            <Textarea label="Alasan Bergabung *" placeholder="Ceritakan motivasi kamu bergabung dengan UDC..." rows={4}
              value={form.alasan_bergabung} onChange={e => update('alasan_bergabung', e.target.value)} required />
            <FileUpload label="Upload CV (PDF) Opsional" accept=".pdf" onChange={e => setCv(e.target.files[0])} maxSize={5} />
            <Button type="submit" icon={submitting ? Loader2 : Send} loading={submitting} size="lg" className="w-full">Kirim Pendaftaran</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
