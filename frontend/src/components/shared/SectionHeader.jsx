import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title, description, center = true, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className={`${center ? 'text-center' : ''} mb-12 ${className}`}>
      {badge && <span className="inline-block px-3 py-1 bg-royal-purple-50 dark:bg-royal-purple-900/20 text-royal-purple-600 dark:text-royal-purple-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">{badge}</span>}
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">{title}</h2>
      {description && <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-base leading-relaxed">{description}</p>}
    </motion.div>
  );
}
