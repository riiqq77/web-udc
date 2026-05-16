import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />}
      <input
        ref={ref}
        className={`w-full px-3 py-2.5 bg-white dark:bg-neutral-800 border rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-royal-purple-600/20 focus:border-royal-purple-600 transition-all duration-200 ${Icon ? 'pl-10' : ''} ${error ? 'border-error focus:ring-error/20 focus:border-error' : 'border-neutral-200 dark:border-neutral-700'} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
));

const Textarea = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>}
    <textarea
      ref={ref}
      className={`w-full px-3 py-2.5 bg-white dark:bg-neutral-800 border rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-royal-purple-600/20 focus:border-royal-purple-600 transition-all duration-200 resize-none ${error ? 'border-error' : 'border-neutral-200 dark:border-neutral-700'} ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
));

const Select = forwardRef(({ label, error, options = [], placeholder, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>}
    <select
      ref={ref}
      className={`w-full px-3 py-2.5 bg-white dark:bg-neutral-800 border rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-royal-purple-600/20 focus:border-royal-purple-600 transition-all duration-200 ${error ? 'border-error' : 'border-neutral-200 dark:border-neutral-700'} ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
));

Input.displayName = 'Input';
Textarea.displayName = 'Textarea';
Select.displayName = 'Select';
export { Input, Textarea, Select };
export default Input;
