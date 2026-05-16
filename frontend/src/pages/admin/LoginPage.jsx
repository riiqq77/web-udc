import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store';
import { authService } from '@/services/api';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@udc.ac.id');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      login(response.data.user, response.data.token);
      toast.success('Login berhasil!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0"><div className="absolute top-1/3 left-1/3 w-96 h-96 bg-royal-purple-600/10 rounded-full blur-3xl" /><div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-citron-400/5 rounded-full blur-3xl" /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            <div className="w-8 h-8 bg-royal-purple-600 rounded-tl-lg rounded-bl-lg" /><div className="w-5 h-8 bg-royal-purple-600 rounded-tr-lg rounded-br-lg" /><div className="w-5 h-8 bg-citron-400 rounded-tr-lg rounded-br-lg ml-0.5" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-neutral-400 text-sm mt-1">Masuk untuk mengelola UDC</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-5">
          <Input label="Email" type="email" icon={Mail} placeholder="admin@udc.ac.id" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" type="password" icon={Lock} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" loading={loading} className="w-full" size="lg">Masuk</Button>
          <p className="text-xs text-neutral-500 text-center">Demo: admin@udc.ac.id / password</p>
        </form>
      </motion.div>
    </div>
  );
}
