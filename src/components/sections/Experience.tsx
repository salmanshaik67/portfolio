import { motion } from 'framer-motion';
import { Cloud, KeyRound, Lock, Server, Shield, Terminal } from 'lucide-react';
import { credentials, timeline, type TimelineEntry } from '../../data/portfolio';
import { usePointerEffects } from '../../hooks/useMediaQuery';
import { Reveal } from '../ui/Reveal';

/** Deterministic pseudo-random numbers so tiles look organic but never change between renders. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const ASCII = '=H>0%!*~@#$]>«$+@#<>+@!$*H=>0%!*=&*$#*!~';

function Tile({ kind, label }: { kind: TimelineEntry['tile']; label: string }) {
  const big = <span className="relative text-4xl font-medium tracking-tighter2 text-white md:text-5xl">{label}</span>;

  switch (kind) {
    case 'lines':
      return (
        <div className="relative flex h-full items-center justify-center bg-[#12a46f]">
          <div className="absolute inset-x-4 inset-y-6 flex items-center justify-between">
            {Array.from({ length: 34 }, (_, i) => (
              <span key={i} className="w-[2px] rounded-full bg-white/75" style={{ height: `${25 + rand(i) * 70}%` }} />
            ))}
          </div>
          <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white">● {label}</span>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white">● {label}</span>
        </div>
      );
    case 'ascii':
      return (
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#1f9e95]">
          <p aria-hidden="true" className="absolute inset-0 break-all p-2 font-mono text-[13px] leading-[1.5] tracking-[0.2em] text-white/45">
            {ASCII.repeat(12)}
          </p>
          <span className="relative rounded bg-[#1f9e95] px-2">{big}</span>
        </div>
      );
    case 'pattern': {
      const icons = [Lock, KeyRound, Shield, Server, Cloud, Terminal];
      return (
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#2363e6]">
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-8 place-items-center gap-2 p-3">
            {Array.from({ length: 40 }, (_, i) => {
              const Icon = icons[i % icons.length]!;
              return <Icon key={i} className="h-4 w-4 text-white/35" />;
            })}
          </div>
          <span className="relative rounded-lg bg-[#2363e6] px-3">{big}</span>
        </div>
      );
    }
    case 'bars':
      return (
        <div className="relative flex h-full items-end justify-center gap-1.5 overflow-hidden bg-[linear-gradient(160deg,#f2a64a,#c4581a)] px-5 pb-5 pt-16">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="flex-1 rounded-t bg-white/70" style={{ height: `${20 + rand(i + 50) * 60 + i * 1.5}%` }} />
          ))}
          <span className="absolute left-5 top-4">{big}</span>
        </div>
      );
    case 'grid':
      return (
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#6a43d6]">
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] place-items-center p-3">
            {Array.from({ length: 140 }, (_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${rand(i + 7) > 0.15 ? 'bg-white/55' : 'bg-[#ff7a7a]'}`} />
            ))}
          </div>
          <span className="relative rounded-lg bg-[#6a43d6] px-3">{big}</span>
        </div>
      );
  }
}

export function Experience() {
  const pointer = usePointerEffects();
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-ink-900 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="mb-14 text-center">
          <p className="label mb-3">Experience</p>
          <h2 id="experience-title" className="h-section">
            Where I&apos;ve kept things running.
          </h2>
        </Reveal>

        <ol className="space-y-10 md:space-y-12">
          {timeline.map((t, i) => (
            <li key={t.role}>
              <Reveal delay={0.05} className="grid items-center gap-5 md:grid-cols-[minmax(0,320px)_1fr] md:gap-8">
                <motion.div
                  className="h-40 overflow-hidden rounded-xl md:h-44"
                  whileHover={pointer ? { scale: 1.02, rotate: i % 2 ? 0.6 : -0.6 } : undefined}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  aria-hidden="true"
                >
                  <Tile kind={t.tile} label={t.tileLabel} />
                </motion.div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{t.period}</p>
                  <h3 className="mt-2 text-[22px] font-normal leading-snug tracking-tightish text-white">{t.role}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{t.org}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{t.summary}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-20">
          <h3 className="mb-6 text-center text-[22px] font-normal tracking-tightish">Education &amp; certifications</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c, i) => (
              <li key={c.title} className="overflow-hidden rounded-xl border border-white/[0.08] bg-black">
                <div
                  className="relative flex h-24 items-center justify-center overflow-hidden"
                  style={{ background: ['#1f9e95', '#2363e6', '#12a46f', '#6a43d6'][i % 4] }}
                  aria-hidden="true"
                >
                  <p className="absolute inset-0 break-all p-1.5 font-mono text-[11px] leading-[1.45] tracking-[0.2em] text-white/35">
                    {ASCII.repeat(6)}
                  </p>
                  <span className="relative rounded px-2 font-mono text-xl font-medium text-white" style={{ background: 'inherit' }}>
                    {c.code}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[15px] font-normal text-white">{c.title}</p>
                  <p className="mt-1 text-[13px] text-fg-subtle">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
