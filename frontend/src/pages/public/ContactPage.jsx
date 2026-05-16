import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Phone, ChevronDown, Loader2 } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { orgInfo, faqs } from '@/data/mockData';
import { pesanService } from '@/services/api';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    if (!form.nama || !form.email || !form.subjek || !form.pesan) {
      return toast.error('Semua kolom wajib diisi');
    }
    setSubmitting(true);
    try {
      await pesanService.send(form);
      setSubmitted(true); 
      setForm({ nama: '', email: '', subjek: '', pesan: '' });
      setTimeout(() => setSubmitted(false), 5000); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengirim pesan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-royal-purple-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">Hubungi Kami</h1>
            <p className="text-lg text-neutral-500">Punya pertanyaan? Kami siap membantu</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Kirim Pesan</h2>
              {submitted ? (
                <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-semibold text-green-700 dark:text-green-400">Pesan Terkirim!</h3>
                  <p className="text-sm text-green-600 dark:text-green-500 mt-1">Kami akan merespons sesegera mungkin ke email Anda.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Nama" placeholder="Nama lengkap" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} required />
                    <Input label="Email" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <Input label="Subjek" placeholder="Tentang apa?" value={form.subjek} onChange={e => setForm({ ...form, subjek: e.target.value })} required />
                  <Textarea label="Pesan" placeholder="Tuliskan pesanmu..." rows={5} value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} required />
                  <Button type="submit" icon={submitting ? Loader2 : Send} loading={submitting} className="w-full sm:w-auto">Kirim Pesan</Button>
                </form>
              )}
            </motion.div>

            {/* Info + Map */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="space-y-4">
                {[{ icon: MapPin, label: 'Alamat', value: orgInfo.address },
                  { icon: Mail, label: 'Email', value: orgInfo.email },
                  { icon: Phone, label: 'Telepon', value: orgInfo.phone }
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-royal-purple-50 dark:bg-royal-purple-900/20 flex items-center justify-center">
                      <Icon size={18} className="text-royal-purple-600" />
                    </div>
                    <div><p className="text-xs text-neutral-400 mb-0.5">{label}</p><p className="text-sm text-neutral-700 dark:text-neutral-300">{value}</p></div>
                  </div>
                ))}
              </div>
              <div className="h-64 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d106.0678!3d-6.3568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjEnMjQuNCJTIDEwNsKwMDQnMDQuMSJF!5e0!3m2!1sid!2sid!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className="rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-8">Pertanyaan Umum</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="font-medium text-neutral-900 dark:text-white text-sm">{faq.q}</span>
                  <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }}><ChevronDown size={16} className="text-neutral-400" /></motion.div>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-4 text-sm text-neutral-500">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
