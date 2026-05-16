import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <button onClick={toggleTheme} className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Toggle theme">
      <motion.div key={isDark ? 'dark' : 'light'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
        {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-neutral-600" />}
      </motion.div>
    </button>
  );
}
