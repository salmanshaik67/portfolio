import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useRef } from 'react';
import { about, profile, projects } from '../../data/portfolio';
import { useReducedMotionPref } from '../../hooks/useMediaQuery';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const stats = [...about.stats, { value: String(projects.length).padStart(2, '0'), label: 'Featured projects' }];

function PortraitPlaceholder() {
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Portrait placeholder: abstract silhouette">
      <defs>
        <linearGradient id="portrait-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#151a3d" />
          <stop offset="1" stopColor="#080a18" />
        </linearGradient>
        <radialGradient id="portrait-glow" cx="50%" cy="38%" r="55%">
          <stop offset="0" stopColor="#5b8cff" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#9b7bff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#9b7bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="portrait-figure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9d6ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c9d6ff" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#portrait-bg)" />
      <rect width="400" height="500" fill="url(#portrait-glow)" />
      <g stroke="rgba(255,255,255,0.06)">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="500" />
        ))}
      </g>
      <circle cx="200" cy="190" r="72" fill="url(#portrait-figure)" stroke="rgba(255,255,255,0.25)" />
      <path d="M70 500c8-110 62-170 130-170s122 60 130 170Z" fill="url(#portrait-figure)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="200" cy="190" r="110" fill="none" stroke="#3fd8f0" strokeOpacity="0.35" strokeDasharray="3 9" />
    </svg>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const floatA = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const floatB = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-30, 50]);

  return (
    <section id="about" aria-labelledby="about-title" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" eyebrow="About" id="about-title" title={['Reliable by', 'design.']} />

        <div ref={ref} className="grid gap-16 md:grid-cols-12 md:gap-10">
          {/* Portrait column */}
          <div className="relative md:col-span-5">
            <Reveal className="relative">
              <div className="glass overflow-hidden rounded-[2rem] p-2">
                <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  {profile.portrait ? (
                    <img
                      src={profile.portrait}
                      alt={profile.portraitAlt}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <PortraitPlaceholder />
                  )}
                </div>
              </div>
              <motion.div
                style={{ y: floatA }}
                className="glass-strong absolute -right-2 top-10 rounded-2xl px-4 py-3 sm:-right-8 md:-right-10"
              >
                <p className="eyebrow !text-[10px]">{about.floatingNotes[0]?.label}</p>
                <p className="mt-1 font-display text-sm font-medium">{about.floatingNotes[0]?.value}</p>
              </motion.div>
              <motion.div
                style={{ y: floatB }}
                className="glass-strong absolute -left-2 bottom-24 rounded-2xl px-4 py-3 sm:-left-6"
              >
                <p className="eyebrow !text-[10px]">{about.floatingNotes[1]?.label}</p>
                <p className="mt-1 font-display text-sm font-medium">{about.floatingNotes[1]?.value}</p>
              </motion.div>
              {!profile.portrait && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                  Placeholder · set <code className="text-fg-muted">profile.portrait</code>
                </p>
              )}
            </Reveal>

          </div>

          {/* Text column, offset for an editorial rhythm */}
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.15] tracking-tight">
                {about.statement}
              </p>
            </Reveal>
            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p className="text-base leading-relaxed text-fg-muted md:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-12">
              <figure className="gradient-border glass relative rounded-3xl p-7">
                <Quote className="h-6 w-6 text-violet" aria-hidden="true" />
                <blockquote className="mt-4 font-display text-xl leading-snug tracking-tight text-fg">
                  {about.philosophy}
                </blockquote>
                <figcaption className="eyebrow mt-5">Philosophy</figcaption>
              </figure>
            </Reveal>

            <ul className="mt-12 grid gap-6 sm:grid-cols-3">
              {about.highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <li key={h.title}>
                    <Reveal delay={0.08 * i}>
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-display text-base font-medium">{h.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{h.text}</p>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={0.1}>
              <dl className="mt-14 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse px-3 py-6 first:pl-0 sm:px-5">
                    <dt className="mt-2 text-xs leading-snug text-fg-subtle sm:text-sm">{s.label}</dt>
                    <dd className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
