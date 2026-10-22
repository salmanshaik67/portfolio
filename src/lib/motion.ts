import type { Transition } from 'framer-motion';

export const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealTransition = (delay = 0): Transition => ({
  duration: 0.9,
  ease: easeExpo,
  delay,
});

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
