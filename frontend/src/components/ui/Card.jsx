import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, ...props }) {
  const Comp = hover ? motion.div : 'div';
  const hoverProps = hover ? { whileHover: { y: -4 }, transition: { duration: 0.2 } } : {};
  return (
    <Comp className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-soft ${hover ? 'cursor-pointer card-hover' : ''} ${className}`} {...hoverProps} {...props}>
      {children}
    </Comp>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 ${className}`}>{children}</div>;
}
