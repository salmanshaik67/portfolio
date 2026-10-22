import { motion } from 'framer-motion';
import { skillGroups } from '../../data/portfolio';
import { easeExpo, viewportOnce } from '../../lib/motion';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';


export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          id="skills-title"
          title={['Skills &', 'toolkit.']}
          aside="No percentage bars — just the tools I reach for and how I use them."
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {skillGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <li key={group.title} className={gi === 0 ? 'md:col-span-2' : undefined}>
                <Reveal delay={gi * 0.06} className="h-full">
                  <div className="gradient-border glass h-full rounded-[1.75rem] p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight">{group.title}</h3>
                        <p className="mt-1.5 text-sm text-fg-muted">{group.blurb}</p>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-electric/25 to-violet/10">
                        <Icon className="h-5 w-5 text-fg" aria-hidden="true" />
                      </span>
                    </div>
                    <motion.ul
                      className="mt-7 flex flex-wrap gap-2"
                      initial="hidden"
                      whileInView="shown"
                      viewport={viewportOnce}
                      variants={{ shown: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
                    >
                      {group.skills.map((s) => {
                        const SkillIcon = s.icon;
                        return (
                          <motion.li
                            key={s.label}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeExpo } },
                            }}
                            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-fg transition-colors duration-300 hover:border-cyan/40 hover:bg-white/[0.08]"
                          >
                            <SkillIcon className="h-4 w-4 text-cyan" aria-hidden="true" />
                            {s.label}
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
