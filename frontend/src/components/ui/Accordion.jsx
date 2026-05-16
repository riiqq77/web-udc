import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <AccordionItem key={i} title={item.title} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

export function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
        <span className="font-medium text-neutral-900 dark:text-neutral-100">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-neutral-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
