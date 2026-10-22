import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import { projects } from '../../data/portfolio';
import { easeExpo } from '../../lib/motion';
import { Reveal } from '../ui/Reveal';
import { CodePanel } from '../work/CodePanel';

function Sparkline({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-28" aria-hidden="true">
      <path d="M2 34 L22 30 L40 32 L58 20 L76 22 L94 10 L118 6" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="118" cy="6" r="3.5" fill={color} />
    </svg>
  );
}

function Ring({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
      <circle cx="20" cy="20" r="15" fill="none" stroke={color} strokeWidth="5" strokeDasharray="80 100" strokeLinecap="round" transform="rotate(-90 20 20)" />
    </svg>
  );
}

function Checks({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 40" className="h-10 w-20" aria-hidden="true">
      {[0, 1, 2].map((r) => (
        <g key={r} transform={`translate(0 ${r * 13})`}>
          <rect x="0" y="2" width="9" height="9" rx="2" fill={color} />
          <rect x="14" y="4" width={60 - r * 12} height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
        </g>
      ))}
    </svg>
  );
}

const visuals = [Ring, Sparkline, Checks];

export function Work() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[index]!;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (index + keys[e.key]! + projects.length) % projects.length;
      setIndex(next);
      tabs.current[next]?.focus();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : projects.length - 1;
      setIndex(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section id="work" aria-labelledby="work-title" className="relative px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10 grid gap-4 md:grid-cols-2 md:items-end">
          <div>
            <p className="label mb-3">Selected work</p>
            <h2 id="work-title" className="h-section">
              Infrastructure that
              <br />
              runs itself.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-fg-muted md:ml-auto">
            Five projects from university infrastructure, research and enterprise support. Pick one, then press Run.
          </p>
        </Reveal>

        <Reveal className="relative">
          {/* Sky backdrop peeking out behind the panel */}
          <div
            aria-hidden="true"
            className="absolute -bottom-10 right-0 top-24 w-[70%] rounded-3xl"
            style={{
              background:
                'radial-gradient(80% 70% at 70% 70%, #e9f6ff 0%, #8fd0ff 30%, #2f8fe6 60%, #0b3f8c 100%)',
            }}
          />

          <div className="relative rounded-2xl border border-white/10 bg-[#0b0f16]/90 p-4 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-6">
            <div
              role="tablist"
              aria-label="Projects"
              onKeyDown={onKey}
              className="code-scroll -mx-1 mb-6 flex gap-1.5 overflow-x-auto px-1 pb-1"
            >
              {projects.map((p, i) => {
                const Icon = p.icon;
                const selected = i === index;
                return (
                  <button
                    key={p.slug}
                    ref={(el) => (tabs.current[i] = el)}
                    role="tab"
                    id={`tab-${p.slug}`}
                    aria-selected={selected}
                    aria-controls={`panel-${p.slug}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setIndex(i)}
                    className={`pill shrink-0 !min-h-[36px] !text-[13px] ${
                      selected ? 'border-white bg-white text-black' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: selected ? '#000' : p.accent }} aria-hidden="true" />
                    {p.tab}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                id={`panel-${project.slug}`}
                role="tabpanel"
                aria-labelledby={`tab-${project.slug}`}
                className="grid gap-6 lg:grid-cols-[1.15fr_1fr]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: easeExpo } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              >
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-normal tracking-tighter2">{project.title}</h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted">{project.description}</p>
                  <div className="mt-5">
                    <CodePanel project={project} />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <p className="text-[15px] font-normal text-white">
                      {project.category}
                      <span className="text-fg-subtle"> · {project.year}</span>
                    </p>
                    <p className="truncate text-right text-[13px] text-fg-subtle">{project.context}</p>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {project.highlights.map((h, i) => {
                      const Visual = visuals[i % visuals.length]!;
                      return (
                        <li key={h.title} className="flex min-h-[170px] flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors duration-300 hover:bg-white/[0.06]">
                          <Visual color={project.accent} />
                          <div className="mt-6">
                            <p className="text-[15px] font-normal text-white">{h.title}</p>
                            <p className="mt-1 text-[13px] leading-snug text-fg-subtle">{h.text}</p>
                          </div>
                        </li>
                      );
                    })}
                    <li className="flex min-h-[170px] flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
                      <p className="label">Stack</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <li key={t} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[12px] text-white/85">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
