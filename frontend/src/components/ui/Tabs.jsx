import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Tabs({ tabs, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex);
  return (
    <div>
      <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActive(i)} className={`relative flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${active === i ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}>
            {active === i && <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-lg shadow-xs" transition={{ type: 'spring', duration: 0.3 }} />}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[active]?.content}</div>
    </div>
  );
}
