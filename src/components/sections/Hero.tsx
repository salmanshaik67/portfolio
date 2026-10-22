import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { credentials, profile, stack } from '../../data/portfolio';
import { easeExpo } from '../../lib/motion';
import { CopyButton } from '../ui/CopyButton';
import { InlineChip } from '../ui/InlineChip';
import { SpectrumStack } from './SpectrumStack';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: easeExpo, delay },
});

function StackStrip() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {stack.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.label} className="flex items-center gap-2 whitespace-nowrap text-lg font-normal tracking-tightish text-white/75">
            <Icon className="h-4 w-4 text-white/60" aria-hidden="true" />
            {s.label}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          {row}
          <div aria-hidden="true">{row}</div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-white/10 bg-ink-800 py-2 pl-3 pr-2 md:self-auto">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-normal text-white">99.9% availability</span>
          <span className="block text-[11px] text-fg-subtle">sustained in L2/L3 support</span>
        </span>
        <span className="ml-1 flex gap-1.5">
          {credentials.slice(0, 2).map((c) => (
            <span
              key={c.code}
              title={`${c.title} — ${c.issuer}`}
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white text-center font-mono text-[9px] font-medium leading-tight text-black"
            >
              {c.code}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const [l1, l2] = profile.headline;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative px-4 pb-14 pt-24 md:px-6 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1
          id="hero-title"
          className="max-w-5xl text-[clamp(2.25rem,4.6vw,3.9rem)] font-normal leading-[1.06] tracking-tighter2"
          {...rise(0.05)}
        >
          {l1}
          <br />
          {l2}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-4xl text-[clamp(1.05rem,1.75vw,1.45rem)] font-light leading-[1.45] text-fg-muted"
          {...rise(0.15)}
        >
          {profile.introLead}{' '}
          {profile.introChips.map((chip, i) => (
            <span key={chip.label}>
              <InlineChip chip={chip} index={i} suffix={i < profile.introChips.length - 1 ? ',' : ''} />{' '}
            </span>
          ))}
          {profile.introTail}
        </motion.p>

        <motion.div className="mt-6 flex flex-wrap items-center gap-2" {...rise(0.25)}>
          <a href="#work" className="pill-solid">
            View my work
          </a>
          <CopyButton value={profile.email} label="Copy email" copiedLabel="Email copied" />
          <span className="inline-flex min-h-[40px] items-center gap-1.5 px-2 text-sm text-fg-subtle">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}
          </span>
        </motion.div>

        <div className="mt-10 md:mt-6">
          <SpectrumStack />
        </div>

        <StackStrip />

        <a
          href="#work"
          className="mt-10 inline-flex min-h-[44px] items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-subtle transition-colors hover:text-white"
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          Scroll to explore
        </a>
      </div>
    </section>
  );
}
