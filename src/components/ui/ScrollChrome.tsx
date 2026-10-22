import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

/** Spectrum scroll-progress bar and a back-to-top pill that appears after the hero. */
export function ScrollChrome() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 900));

  return (
    <>
      <motion.div aria-hidden="true" className="spectrum-x fixed inset-x-0 top-0 z-[70] h-[2px] origin-left" style={{ scaleX }} />
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:bottom-8 md:right-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
