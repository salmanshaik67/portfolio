import { Sparkle } from 'lucide-react';
import { skillGroups } from '../../data/portfolio';

const words = skillGroups.flatMap((g) => g.skills.map((s) => s.label)).slice(0, 12);

/** Slow editorial marquee between hero and about. Decorative: the skills section lists the same content. */
export function Ticker() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {words.map((w) => (
        <li key={w} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-3xl font-medium uppercase tracking-tight text-fg/80 md:text-5xl">{w}</span>
          <Sparkle className="h-5 w-5 text-violet" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-6 md:py-8">
      <div className="animate-marquee flex w-max">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
