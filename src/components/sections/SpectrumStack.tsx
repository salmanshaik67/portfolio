import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type PointerEvent } from 'react';
import { usePointerEffects, useReducedMotionPref } from '../../hooks/useMediaQuery';

const COLORS = [
  '#4ba3d1', '#79bde0', '#a7d7ee', '#d6ecf6', '#f3f8fb', '#e8f7ee', '#d3f2d0', '#c4efc0',
  '#b4e48e', '#c6e783', '#d8ea78', '#f2dc78', '#f5b260', '#f07a52', '#e5564b', '#d94848',
];
const N = COLORS.length;
const W = 100 / N;
/** Flat band geometry, in % of the stage. */
const FLAT_TOP = 30;
const FLAT_H = 34;

function Pane({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const t = i / (N - 1);
  // Staircase: panes rise to the right and grow, overlapping like a fanned deck of glass.
  const stairBottom = 96 - 40 * t;
  const stairH = 30 + 30 * t;
  const top = useTransform(progress, [0, 1], [`${stairBottom - stairH}%`, `${FLAT_TOP}%`]);
  const height = useTransform(progress, [0, 1], [`${stairH}%`, `${FLAT_H}%`]);
  const width = useTransform(progress, [0, 1], [`${W * 2.1}%`, `${W + 0.05}%`]);
  const left = useTransform(progress, [0, 1], [`${i * W * 0.86}%`, `${i * W}%`]);
  const rotateY = useTransform(progress, [0, 1], [-14, 0]);
  const sheen = useTransform(progress, [0, 1], [1, 0.25]);

  return (
    <motion.div
      className="absolute origin-left"
      style={{ top, height, width, left, rotateY, zIndex: i, background: COLORS[i] }}
      whileHover={{ y: -14, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      <motion.span
        className="absolute inset-0 border-l border-t border-white/50"
        style={{
          opacity: sheen,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 45%, rgba(0,0,0,0.12))',
        }}
      />
    </motion.div>
  );
}

/**
 * Hero centrepiece: a fanned stack of spectrum glass panes that settles into a single
 * flat spectrum bar as you scroll. Mouse tilts the stage on desktop; reduced motion keeps it still.
 */
export function SpectrumStack() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const pointer = usePointerEffects();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 70%', 'start 10%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const still = useMotionValue(0);
  const progress = reduced ? still : smooth;

  const tiltX = useSpring(0, { stiffness: 80, damping: 16 });
  const tiltY = useSpring(0, { stiffness: 80, damping: 16 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!pointer) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  const reset = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="[perspective:1400px]" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div
        ref={stage}
        aria-hidden="true"
        className="relative mx-auto h-[clamp(200px,34vw,460px)] w-full [transform-style:preserve-3d]"
        style={{ rotateX: tiltX, rotateY: tiltY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {COLORS.map((_, i) => (
          <Pane key={i} i={i} progress={progress} />
        ))}
      </motion.div>
    </div>
  );
}
