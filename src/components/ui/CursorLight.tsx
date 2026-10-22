import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

/**
 * Desktop-only ambient light + ring that trails the pointer.
 * The native cursor stays visible; this is decoration, not a replacement.
 * Mounted lazily and only when a fine pointer is present and motion is allowed.
 */
export default function CursorLight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const glowX = useSpring(x, { stiffness: 80, damping: 20 });
  const glowY = useSpring(y, { stiffness: 80, damping: 20 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(e.target instanceof Element && e.target.closest(INTERACTIVE) !== null);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div
        className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(91,140,255,0.10), rgba(155,123,255,0.05) 40%, transparent 70%)',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-white/40"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 54 : 22,
          height: hovering ? 54 : 22,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? 'rgba(63,216,240,0.8)' : 'rgba(255,255,255,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      />
    </div>
  );
}
