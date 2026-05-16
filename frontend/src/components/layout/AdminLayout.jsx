import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Layers, FolderOpen, Newspaper, Trophy, ClipboardList, MessageSquare, Settings, LogOut, Menu, X, ChevronLeft } from 'lucide-react';
import { useAuthStore, useSidebarStore } from '@/store';
import { authService } from '@/services/api';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Avatar from '@/components/ui/Avatar';

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Anggota', path: '/admin/anggota', icon: Users },
  { label: 'Divisi', path: '/admin/divisi', icon: Layers },
  { label: 'Portofolio', path: '/admin/portofolio', icon: FolderOpen },
  { label: 'Berita', path: '/admin/berita', icon: Newspaper },
  { label: 'Prestasi', path: '/admin/prestasi', icon: Trophy },
  { label: 'Pendaftaran', path: '/admin/pendaftaran', icon: ClipboardList },
  { label: 'Pesan', path: '/admin/pesan', icon: MessageSquare },
  { label: 'Pengaturan', path: '/admin/pengaturan', icon: Settings },
];

export default function AdminLayout() {
  const { isOpen, toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => { 
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      logout(); 
      navigate('/admin/login'); 
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${isOpen ? 'w-64' : 'w-[72px]'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-100 dark:border-neutral-800">
          {isOpen && <div className="flex items-center gap-2"><div className="flex items-center gap-0.5"><div className="w-5 h-5 bg-royal-purple-600 rounded-tl-md rounded-bl-md" /><div className="w-3 h-5 bg-royal-purple-600 rounded-tr-md rounded-br-md" /><div className="w-3 h-5 bg-citron-400 rounded-tr-md rounded-br-md ml-px" /></div><span className="font-bold text-sm">UDC Admin</span></div>}
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map(({ label, path, icon: Icon, end }) => (
            <NavLink key={path} to={path} end={end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-royal-purple-50 dark:bg-royal-purple-900/20 text-royal-purple-600 dark:text-royal-purple-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200'}`}>
              <Icon size={18} className="flex-shrink-0" />
              {isOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
          {isOpen && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <Avatar name={user?.name || 'Admin'} size="sm" />
              <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p><p className="text-xs text-neutral-400 truncate">{user?.role || 'admin'}</p></div>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <LogOut size={18} />{isOpen && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-[72px]'}`}>
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-20">
          <div />
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        {/* Page Content */}
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
}
