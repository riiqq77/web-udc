import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Divisi', path: '/divisi' },
  { label: 'Portofolio', path: '/portofolio' },
  { label: 'Anggota', path: '/anggota' },
  { label: 'Berita', path: '/berita' },
  { label: 'Prestasi', path: '/prestasi' },
  { label: 'Kontak', path: '/kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-soft border-b border-neutral-200/50 dark:border-neutral-800/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5">
              <div className="w-7 h-7 bg-royal-purple-600 rounded-tl-lg rounded-bl-lg" />
              <div className="w-4 h-7 bg-royal-purple-600 rounded-tr-lg rounded-br-lg" />
              <div className="w-4 h-7 bg-citron-400 rounded-tr-lg rounded-br-lg ml-0.5" />
            </div>
            <span className="font-bold text-lg text-neutral-900 dark:text-white tracking-tight">UDC</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${location.pathname === link.path ? 'text-royal-purple-600 dark:text-royal-purple-400' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>
                {link.label}
                {location.pathname === link.path && (
                  <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-0.5 bg-royal-purple-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/daftar" className="hidden sm:block">
              <Button size="sm">Daftar</Button>
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-royal-purple-50 dark:bg-royal-purple-900/20 text-royal-purple-600' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}>
                  {link.label}
                </Link>
              ))}
              <Link to="/daftar" className="block mt-2">
                <Button className="w-full" size="md">Daftar Anggota</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
