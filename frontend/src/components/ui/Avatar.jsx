import { User } from 'lucide-react';

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-20 h-20 text-xl' };
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '';

  return (
    <div className={`relative flex-shrink-0 rounded-full overflow-hidden ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-royal-purple-100 dark:bg-royal-purple-900/30 text-royal-purple-600 dark:text-royal-purple-400 font-semibold">
          {initials || <User size={size === 'sm' ? 14 : size === 'lg' ? 24 : size === 'xl' ? 32 : 18} />}
        </div>
      )}
    </div>
  );
}
