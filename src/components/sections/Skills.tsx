import { motion } from 'framer-motion';
import { skillGroups, type SkillGroup } from '../../data/portfolio';
import { usePointerEffects } from '../../hooks/useMediaQuery';
import { Reveal } from '../ui/Reveal';

/** Loose cluster positions (in % of the visual) for the floating skill pills. */
const spots: { left?: string; right?: string; top: string }[] = [
  { left: '7%', top: '16%' },
  { right: '7%', top: '30%' },
  { left: '12%', top: '46%' },
  { right: '12%', top: '62%' },
  { left: '22%', top: '76%' },
];

function SkillCard({ group, wide }: { group: SkillGroup; wide?: boolean }) {
  const pointer = usePointerEffects();
  const Icon = group.icon;
  return (
    <motion.article
      className={`group flex h-full flex-col ${wide ? 'md:flex-row md:items-stretch md:gap-8' : ''}`}
      initial="rest"
      whileHover={pointer ? 'hover' : undefined}
      animate="rest"
    >
      <div
        className={`tone-${group.tone} relative overflow-hidden rounded-2xl ${wide ? 'h-56 md:h-auto md:min-h-[240px] md:w-1/2' : 'h-60 md:h-72'}`}
      >
        <span aria-hidden="true" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-black/25 text-white backdrop-blur">
          <Icon className="h-5 w-5" />
        </span>
        <ul aria-label={`${group.title} skills`} className="absolute inset-0">
          {group.skills.map((s, i) => {
            const SkillIcon = s.icon;
            const spot = spots[i % spots.length]!;
            return (
              <motion.li
                key={s.label}
                className="absolute"
                style={spot}
                variants={{
                  rest: { x: 0, y: 0 },
                  hover: { x: (i % 2 ? 1 : -1) * 12, y: ((i % 3) - 1) * 8, transition: { type: 'spring', stiffness: 200, damping: 14 } },
                }}
              >
                <span
                  className="animate-float flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[13px] font-normal text-black shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]"
                  style={{ animationDelay: `${i * -1.1}s` }}
                >
                  <SkillIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {s.label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <p className={`text-[15px] leading-relaxed text-fg-muted ${wide ? 'mt-4 md:mt-0 md:flex md:w-1/2 md:items-center md:text-lg' : 'mt-4'}`}>
        <span>
          <span className="font-normal text-white">{group.title}.</span> {group.blurb}
        </span>
      </p>
    </motion.article>
  );
}

export function Skills() {
  const main = skillGroups.slice(0, 4);
  const last = skillGroups[4];
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mb-12 text-center">
          <p className="label mb-3">Skills</p>
          <h2 id="skills-title" className="h-section">
            First-class for the infrastructure era.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-fg-muted">
            No percentage bars — just the tools I reach for, grouped by the job they do.
          </p>
        </Reveal>

        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {main.map((g, i) => (
            <li key={g.title}>
              <Reveal className="h-full" delay={(i % 2) * 0.08}>
                <SkillCard group={g} />
              </Reveal>
            </li>
          ))}
          {last && (
            <li className="md:col-span-2">
              <Reveal className="h-full">
                <SkillCard group={last} wide />
              </Reveal>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
