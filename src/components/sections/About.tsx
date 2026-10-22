import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { about, impact, profile, stack } from '../../data/portfolio';
import { usePointerEffects, useReducedMotionPref } from '../../hooks/useMediaQuery';
import { Reveal } from '../ui/Reveal';

const linkedin = profile.socials.find((s) => s.label === 'LinkedIn');

/** Full-bleed blue wave band, like light through frosted glass. */
function MeetBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <div ref={ref} className="relative isolate overflow-hidden py-24 md:py-32">
      <motion.div aria-hidden="true" className="absolute inset-[-10%] -z-10" style={{ x: drift }}>
        <div className="absolute inset-0 bg-[#0a3d86]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_10%_20%,#bfe6ff_0%,rgba(78,170,240,0.85)_25%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_95%_90%,#e6f6ff_0%,rgba(90,180,245,0.8)_25%,transparent_60%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave" x1="0" x2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-50 ${120 + i * 70} C 250 ${20 + i * 60}, 650 ${330 + i * 30}, 1250 ${90 + i * 75}`}
              fill="none"
              stroke="url(#wave)"
              strokeWidth={40 - i * 6}
              style={{ filter: 'blur(14px)' }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_50%_50%,rgba(6,38,88,0.85),transparent_75%)]" />
      </motion.div>

      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <h2 id="about-title" className="h-section">
          {about.title}
        </h2>
        {about.body.map((p) => (
          <p key={p.slice(0, 24)} className="mt-5 text-[clamp(1rem,1.4vw,1.15rem)] font-normal leading-[1.6] text-white">
            {p}
          </p>
        ))}
        <ul className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Open to roles">
          {about.openTo.map((r) => (
            <li key={r} className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[13px] text-white backdrop-blur">
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <a href="#experience" className="pill-solid">
            See experience
          </a>
          {linkedin && (
            <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="pill-outline !border-white">
              View LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );
}

function ImpactCard({ item, tall }: { item: (typeof impact)[number]; tall?: boolean }) {
  const pointer = usePointerEffects();
  return (
    <motion.div
      className={`tone-${item.tone} group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 ${tall ? 'min-h-[300px] lg:min-h-0' : 'min-h-[200px]'}`}
      whileHover={pointer ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl transition-transform duration-700 ease-expo group-hover:scale-150"
      />
      <p className="relative text-[15px] font-normal leading-snug text-white">{item.label}</p>
      <div className="relative">
        <p className={`font-light leading-none tracking-tighter2 text-white ${tall ? 'text-7xl md:text-8xl' : 'text-6xl'}`}>{item.value}</p>
        <p className="mt-3 text-sm font-normal text-white/90">{item.detail}</p>
      </div>
    </motion.div>
  );
}

function StackCard() {
  return (
    <div className="tone-ink flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-white/[0.08] p-6">
      <ul className="grid grid-cols-3 gap-x-4 gap-y-3">
        {stack.slice(0, 9).map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.label} className="flex items-center gap-1.5 truncate text-[13px] font-normal text-white/80">
              <Icon className="h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
              <span className="truncate">{s.label}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-[15px] font-normal text-white">
        One toolbox <span className="text-fg-subtle">across on-prem, AWS and Azure.</span>
      </p>
    </div>
  );
}

export function About() {
  const [a, b, c, d, e, f] = impact;
  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <MeetBand />

      <div className="px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-10 text-center">
            <h3 className="h-section">Built for reliability at every scale</h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-fg-muted">Numbers from my work in enterprise support, university IT and research.</p>
          </Reveal>

          <ul className="grid auto-rows-[minmax(200px,auto)] gap-3 md:grid-cols-2 lg:grid-cols-4">
            <li className="lg:col-span-2">
              <Reveal className="h-full">
                <StackCard />
              </Reveal>
            </li>
            {a && (
              <li className="lg:row-span-2">
                <Reveal className="h-full" delay={0.05}>
                  <ImpactCard item={a} tall />
                </Reveal>
              </li>
            )}
            {b && (
              <li>
                <Reveal className="h-full" delay={0.1}>
                  <ImpactCard item={b} />
                </Reveal>
              </li>
            )}
            {c && (
              <li>
                <Reveal className="h-full" delay={0.05}>
                  <ImpactCard item={c} />
                </Reveal>
              </li>
            )}
            {d && (
              <li>
                <Reveal className="h-full" delay={0.1}>
                  <ImpactCard item={d} />
                </Reveal>
              </li>
            )}
            {e && (
              <li>
                <Reveal className="h-full" delay={0.15}>
                  <ImpactCard item={e} />
                </Reveal>
              </li>
            )}
            {f && (
              <li className="md:col-span-2 lg:col-span-4">
                <Reveal className="h-full" delay={0.1}>
                  <ImpactCard item={f} />
                </Reveal>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
