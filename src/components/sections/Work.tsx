import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { projects, type Project } from '../../data/portfolio';
import { easeExpo } from '../../lib/motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../work/ProjectCard';

const ProjectModal = lazy(() => import('../work/ProjectModal'));

/** Editorial rhythm: a feature row, then alternating offset pairs. */
const layouts = [
  { wrap: 'md:col-span-12', feature: true, aspect: 'aspect-[16/10]' },
  { wrap: 'md:col-span-7', aspect: 'aspect-[4/3]' },
  { wrap: 'md:col-span-5 md:mt-40', aspect: 'aspect-[4/5]' },
  { wrap: 'md:col-span-5 md:col-start-2', aspect: 'aspect-[4/5]' },
  { wrap: 'md:col-span-6 md:mt-24', aspect: 'aspect-[4/3]' },
];

export function Work() {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], []);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-x-clip px-5 py-24 md:px-10 md:py-32">
      <div aria-hidden="true" className="orb -left-40 top-1/3 h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(63,216,240,0.18),transparent_65%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          id="work-title"
          title={['Featured', 'work.']}
          aside="Automation, CI/CD and security work from university infrastructure and research. Open any project for the details."
        />

        <div role="group" aria-label="Filter projects by category" className="-mt-4 mb-14 flex flex-wrap gap-2 md:mb-20">
          {categories.map((c) => {
            const active = filter === c;
            const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={`relative min-h-[44px] rounded-full px-5 text-sm transition-colors duration-300 ${
                  active ? 'text-ink-950' : 'border border-white/10 text-fg-muted hover:border-white/25 hover:text-fg'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {c} <span className={active ? 'text-ink-700' : 'text-fg-subtle'}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.ul layout className="grid gap-x-10 gap-y-20 md:grid-cols-12 md:gap-y-24">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => {
                const l = filter === 'All' ? layouts[i % layouts.length] : layouts[(i % 4) + 1];
                return (
                  <motion.li
                    key={project.slug}
                    layout
                    className={l?.wrap}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.9, ease: easeExpo }}
                  >
                    <ProjectCard
                      project={project}
                      index={projects.indexOf(project)}
                      feature={l?.feature}
                      aspect={l?.aspect}
                      onOpen={setSelected}
                    />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.slug} project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </section>
  );
}
