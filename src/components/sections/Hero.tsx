import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import type { PointerEvent } from 'react';
import { profile } from '../../data/portfolio';
import { usePointerEffects } from '../../hooks/useMediaQuery';
import { easeExpo } from '../../lib/motion';
import { Magnetic } from '../ui/Magnetic';
import { MaskText } from '../ui/MaskText';

/** Positions relative to the headline block, tucked into the gaps left by the staggered lines. */
const chipPositions = [
  'right-[4%] -top-6',
  'left-0 top-[44%]',
  'right-[6%] top-[46%]',
  'left-[3%] bottom-[10%]',
];

function useLayer(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  return {
    x: useTransform(mx, (v) => v * depth),
    y: useTransform(my, (v) => v * depth),
  };
}

export function Hero() {
  const pointer = usePointerEffects();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  const far = useLayer(mx, my, -18);
  const mid = useLayer(mx, my, 30);
  const near = useLayer(mx, my, 55);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!pointer || e.pointerType !== 'mouse') return;
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  };

  const [l1, l2, l3] = profile.headline;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-36"
    >
      {/* Hero atmosphere */}
      <motion.div aria-hidden="true" style={far} className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb animate-drift-b right-[-10%] top-[5%] h-[38rem] w-[38rem] bg-[radial-gradient(circle,rgba(91,140,255,0.5),transparent_62%)]" />
        <div className="orb animate-drift-a left-[30%] top-[45%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(240,114,214,0.18),transparent_62%)]" />
      </motion.div>

      {/* Orbital glass sculpture */}
      <motion.div
        aria-hidden="true"
        style={mid}
        className="pointer-events-none absolute right-[-30%] top-[14%] -z-10 aspect-square w-[95vw] max-w-[760px] opacity-80 sm:right-[-12%] md:right-[-4%] md:top-[10%] md:w-[58vw]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 2, ease: easeExpo, delay: 0.2 }}
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <defs>
            <radialGradient id="hero-core" cx="38%" cy="32%" r="70%">
              <stop offset="0" stopColor="#dfe7ff" stopOpacity="0.9" />
              <stop offset="0.25" stopColor="#7d9dff" stopOpacity="0.55" />
              <stop offset="0.6" stopColor="#6a4fd8" stopOpacity="0.25" />
              <stop offset="1" stopColor="#070915" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3fd8f0" />
              <stop offset="0.5" stopColor="#5b8cff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#9b7bff" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="300" r="170" fill="url(#hero-core)" />
          <circle cx="300" cy="300" r="170" fill="none" stroke="rgba(255,255,255,0.18)" />
          <g fill="none" stroke="url(#hero-ring)" strokeWidth="1.2">
            <ellipse cx="300" cy="300" rx="270" ry="92" transform="rotate(-18 300 300)" />
            <ellipse cx="300" cy="300" rx="230" ry="230" strokeOpacity="0.25" strokeDasharray="2 10" />
            <ellipse cx="300" cy="300" rx="290" ry="60" transform="rotate(28 300 300)" strokeOpacity="0.5" />
          </g>
          <circle cx="545" cy="215" r="6" fill="#3fd8f0" />
          <circle cx="545" cy="215" r="16" fill="#3fd8f0" fillOpacity="0.15" />
          <circle cx="78" cy="395" r="4" fill="#9b7bff" />
        </svg>
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <motion.p
          className="glass inline-flex w-fit items-center gap-3 rounded-full py-2 pl-3 pr-4 text-xs text-fg-muted sm:text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeExpo, delay: 0.1 }}
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className={`absolute inset-0 rounded-full ${`animate-pulse-ring ${profile.availability.open ? 'bg-emerald-400' : 'bg-cyan'}`}`} />
            <span className={`relative h-2.5 w-2.5 rounded-full ${profile.availability.open ? 'bg-emerald-400' : 'bg-cyan'}`} />
          </span>
          {profile.availability.label}
          <span className="hidden text-fg-subtle sm:inline">· {profile.location}</span>
        </motion.p>

        <div className="relative flex flex-1 flex-col justify-center py-10 md:py-6">
          {/* Floating chips — desktop only */}
          <motion.ul aria-label="Focus areas" style={near} className="pointer-events-none absolute inset-0 hidden lg:block">
            {profile.heroChips.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <motion.li
                  key={chip.label}
                  className={`glass absolute flex items-center gap-2 rounded-full px-4 py-2 text-xs text-fg-muted ${chipPositions[i % chipPositions.length]}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: easeExpo, delay: 1.1 + i * 0.12 }}
                >
                  <Icon className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
                  {chip.label}
                </motion.li>
              );
            })}
          </motion.ul>
          <MaskText
            as="h1"
            id="hero-title"
            immediate
            delay={0.25}
            lines={[l1 ?? '', l2 ?? '', l3 ?? '']}
            className="font-display text-[clamp(3.2rem,min(15vw,18svh),11rem)] font-semibold uppercase leading-[0.86] tracking-tightest"
            lineClassName={(i) =>
              i === 1 ? 'text-outline pl-[8vw] md:pl-[14vw]' : i === 2 ? 'text-gradient pl-[2vw] md:pl-[30vw]' : ''
            }
          />
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <motion.div
            className="md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeExpo, delay: 0.75 }}
          >
            <p className="font-display text-lg font-medium text-fg">
              {profile.name} <span className="text-fg-subtle">—</span>{' '}
              <span className="text-fg-muted">{profile.role}</span>
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-fg-muted">{profile.intro}</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeExpo, delay: 0.9 }}
          >
            <Magnetic>
              <a href="#work" className="btn-primary group">
                Explore my work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost">
                <MessageCircle className="h-4 w-4 text-cyan" aria-hidden="true" />
                Let&apos;s talk
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="mt-10 flex w-fit items-center gap-3 self-start rounded-full py-2 pr-2 text-xs uppercase tracking-[0.22em] text-fg-subtle transition-colors hover:text-fg md:self-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <span className="relative flex h-9 w-6 justify-center rounded-full border border-white/20 pt-2" aria-hidden="true">
            <span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-fg" />
          </span>
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
