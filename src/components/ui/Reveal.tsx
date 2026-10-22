import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { revealTransition, viewportOnce } from '../../lib/motion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Fade-and-rise on first scroll into view. Transform/opacity only, so no layout shift. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={revealTransition(delay)}
    >
      {children}
    </motion.div>
  );
}
