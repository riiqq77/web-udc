import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@/store';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';

// Public Pages
import HomePage from '@/pages/public/HomePage';
import AboutPage from '@/pages/public/AboutPage';
import DivisionsPage from '@/pages/public/DivisionsPage';
import PortfolioPage from '@/pages/public/PortfolioPage';
import MembersPage from '@/pages/public/MembersPage';
import NewsPage from '@/pages/public/NewsPage';
import NewsDetailPage from '@/pages/public/NewsDetailPage';
import AchievementsPage from '@/pages/public/AchievementsPage';
import ContactPage from '@/pages/public/ContactPage';
import RegistrationPage from '@/pages/public/RegistrationPage';

// Admin Pages
import LoginPage from '@/pages/admin/LoginPage';
import AdminLayout from '@/components/layout/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import MembersManagement from '@/pages/admin/MembersManagement';
import DivisionsManagement from '@/pages/admin/DivisionsManagement';
import PortfolioManagement from '@/pages/admin/PortfolioManagement';
import NewsManagement from '@/pages/admin/NewsManagement';
import AchievementsManagement from '@/pages/admin/AchievementsManagement';
import RegistrationManagement from '@/pages/admin/RegistrationManagement';
import MessagesManagement from '@/pages/admin/MessagesManagement';
import SettingsPage from '@/pages/admin/SettingsPage';

export default function App() {
  const initTheme = useThemeStore(s => s.initTheme);
  useEffect(() => { initTheme(); }, [initTheme]);

  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ className: '!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 !shadow-elevated !rounded-xl !text-sm', duration: 3000 }} />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/divisi" element={<DivisionsPage />} />
          <Route path="/portofolio" element={<PortfolioPage />} />
          <Route path="/anggota" element={<MembersPage />} />
          <Route path="/berita" element={<NewsPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/prestasi" element={<AchievementsPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/daftar" element={<RegistrationPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="anggota" element={<MembersManagement />} />
          <Route path="divisi" element={<DivisionsManagement />} />
          <Route path="portofolio" element={<PortfolioManagement />} />
          <Route path="berita" element={<NewsManagement />} />
          <Route path="prestasi" element={<AchievementsManagement />} />
          <Route path="pendaftaran" element={<RegistrationManagement />} />
          <Route path="pesan" element={<MessagesManagement />} />
          <Route path="pengaturan" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
