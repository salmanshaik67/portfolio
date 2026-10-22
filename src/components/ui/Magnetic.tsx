import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';
import { usePointerEffects } from '../../hooks/useMediaQuery';

type MagneticProps = { children: ReactNode; strength?: number; className?: string };

/** Pulls its child toward the cursor on desktop. Inert on touch and with reduced motion. */
export function Magnetic({ children, strength = 0.3, className = 'inline-block' }: MagneticProps) {
  const enabled = usePointerEffects();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  if (!enabled) return <span className={className}>{children}</span>;

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
