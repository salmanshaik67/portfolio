import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

/** Top scroll-progress bar and a back-to-top button that appears after the hero. */
export function ScrollChrome() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 900));

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan via-electric to-violet"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            className="glass-strong fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full text-fg transition-colors hover:border-white/25 md:bottom-8 md:right-8"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.35 }}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
