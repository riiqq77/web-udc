import { Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function FileUpload({ label, accept, onChange, maxSize = 5, className = '' }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const ref = useRef();

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > maxSize * 1024 * 1024) { setError(`Ukuran file melebihi ${maxSize}MB`); return; }
    setFile(f); setError(''); onChange?.(f);
  };

  const remove = () => { setFile(null); setError(''); onChange?.(null); if (ref.current) ref.current.value = ''; };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>}
      {!file ? (
        <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl cursor-pointer hover:border-royal-purple-400 hover:bg-royal-purple-50/50 dark:hover:bg-royal-purple-900/10 transition-colors">
          <Upload size={24} className="text-neutral-400" />
          <span className="text-sm text-neutral-500">Klik untuk upload atau drag & drop</span>
          <span className="text-xs text-neutral-400">Maks. {maxSize}MB</span>
          <input ref={ref} type="file" accept={accept} onChange={handleChange} className="hidden" />
        </label>
      ) : (
        <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{file.name}</p><p className="text-xs text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p></div>
          <button onClick={remove} className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"><X size={16} /></button>
        </div>
      )}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
