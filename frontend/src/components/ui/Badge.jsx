const badgeVariants = {
  default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  primary: 'bg-royal-purple-50 text-royal-purple-700 dark:bg-royal-purple-900/30 dark:text-royal-purple-300',
  success: 'bg-success-light text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-warning-light text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-error-light text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-info-light text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  citron: 'bg-citron-50 text-citron-700 dark:bg-citron-900/30 dark:text-citron-400',
};

export default function Badge({ variant = 'default', children, className = '', dot }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeVariants[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-green-500' : variant === 'error' ? 'bg-red-500' : variant === 'warning' ? 'bg-amber-500' : 'bg-current'}`} />}
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    aktif: { variant: 'success', label: 'Aktif' },
    nonaktif: { variant: 'error', label: 'Nonaktif' },
    pending: { variant: 'warning', label: 'Pending' },
    approved: { variant: 'success', label: 'Diterima' },
    rejected: { variant: 'error', label: 'Ditolak' },
    published: { variant: 'success', label: 'Published' },
    draft: { variant: 'default', label: 'Draft' },
    read: { variant: 'default', label: 'Dibaca' },
    unread: { variant: 'info', label: 'Belum Dibaca' },
  };
  const { variant, label } = map[status] || { variant: 'default', label: status };
  return <Badge variant={variant} dot>{label}</Badge>;
}
