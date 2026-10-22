import { motion, useScroll } from 'framer-motion';
import { Award } from 'lucide-react';
import { useRef } from 'react';
import { credentials, process, timeline } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 50%'] });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-x-clip px-5 py-24 md:px-10 md:py-32">
      <div aria-hidden="true" className="orb right-[-10rem] top-20 h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(155,123,255,0.22),transparent_65%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" eyebrow="Experience & process" id="experience-title" title={['How I', 'work.']} />

        <div className="grid gap-16 lg:grid-cols-12">
          {/* Timeline */}
          <div className="lg:col-span-7">
            <h3 className="eyebrow mb-8">Experience</h3>
            <div className="relative pl-8">
              <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
              <motion.span
                aria-hidden="true"
                style={{ scaleY: scrollYProgress }}
                className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-cyan via-electric to-violet"
              />
              <ol ref={listRef} className="space-y-6">
              {timeline.map((entry, i) => (
                <li key={i} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-7 h-[15px] w-[15px] rounded-full border border-cyan/60 bg-ink-950 shadow-[0_0_14px_rgba(63,216,240,0.5)]"
                  />
                  <Reveal delay={i * 0.06}>
                    <article className="glass rounded-3xl p-6 md:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">{entry.period}</p>
                        {entry.placeholder && (
                          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200">
                            Placeholder
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">{entry.role}</h4>
                      <p className="mt-1 text-sm text-fg-muted">{entry.org}</p>
                      <p className="mt-4 text-base leading-relaxed text-fg-muted">{entry.summary}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
              </ol>
            </div>
          </div>

          {/* Process */}
          <div className="lg:col-span-5 lg:pt-14">
            <div className="lg:sticky lg:top-28">
            <h3 className="eyebrow mb-8">Process</h3>
            <ol className="space-y-3">
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.title}>
                    <Reveal delay={i * 0.06}>
                      <div className="group flex items-start gap-5 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-white/15 hover:bg-white/[0.05]">
                        <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                        <div className="flex-1">
                          <p className="flex items-center gap-2 font-display text-lg font-medium">
                            <Icon className="h-4 w-4 text-violet transition-colors group-hover:text-cyan" aria-hidden="true" />
                            {step.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            <Reveal delay={0.1} className="mt-10">
              <div className="glass rounded-3xl p-6">
                <h3 className="eyebrow flex items-center gap-2">
                  <Award className="h-4 w-4 text-cyan" aria-hidden="true" />
                  Education &amp; certifications
                </h3>
                <ul className="mt-5 space-y-4">
                  {credentials.map((c) => (
                    <li key={c.title}>
                      <p className="font-display text-base font-medium leading-snug">{c.title}</p>
                      <p className="mt-0.5 text-sm text-fg-muted">{c.issuer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
