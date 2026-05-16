import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchInput({ value, onChange, placeholder = 'Cari...', delay = 300 }) {
  const [local, setLocal] = useState(value || '');
  useEffect(() => { const t = setTimeout(() => onChange(local), delay); return () => clearTimeout(t); }, [local, delay]);
  useEffect(() => { setLocal(value || ''); }, [value]);

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
      <input value={local} onChange={(e) => setLocal(e.target.value)} placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-purple-600/20 focus:border-royal-purple-600 transition-all" />
    </div>
  );
}
