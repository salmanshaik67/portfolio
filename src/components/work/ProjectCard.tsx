import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, Maximize2 } from 'lucide-react';
import type { PointerEvent } from 'react';
import type { Project } from '../../data/portfolio';
import { usePointerEffects } from '../../hooks/useMediaQuery';
import { ProjectArt } from './ProjectArt';

type ProjectCardProps = {
  project: Project;
  index: number;
  feature?: boolean;
  aspect?: string;
  onOpen: (project: Project) => void;
};

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-fg transition-colors hover:border-cyan/50 hover:bg-white/[0.08]"
        >
          {project.link.label}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.sourceUrl && (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          Source
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project, index, feature, aspect = 'aspect-[4/3]', onOpen }: ProjectCardProps) {
  const tiltEnabled = usePointerEffects();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const number = String(index + 1).padStart(2, '0');

  const visual = (
    <div className="[perspective:1200px]">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="will-change-transform">
        <button
          type="button"
          onClick={() => onOpen(project)}
          onPointerMove={onMove}
          onPointerLeave={reset}
          aria-label={`Open details for ${project.title}`}
          className="gradient-border glass group/art relative block w-full overflow-hidden rounded-[1.75rem] p-1.5 text-left"
        >
          <span className={`block overflow-hidden rounded-[1.4rem] ${aspect}`}>
            <ProjectArt
              project={project}
              className="h-full w-full transition-transform duration-[900ms] ease-expo group-hover/art:scale-[1.06]"
            />
          </span>
          <span className="glass absolute left-5 top-5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg">
            {project.category} · {project.year}
          </span>
          <span className="glass-strong absolute bottom-5 right-5 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-fg opacity-100 transition-all duration-500 ease-expo md:translate-y-2 md:opacity-0 md:group-hover/art:translate-y-0 md:group-hover/art:opacity-100 md:group-focus-visible/art:translate-y-0 md:group-focus-visible/art:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            View case
          </span>
        </button>
      </motion.div>
    </div>
  );

  const meta = (
    <div className={feature ? '' : 'mt-6'}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-cyan">{number}</span>
        <h3 className={`font-display font-semibold tracking-tight ${feature ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
          {project.title}
        </h3>
      </div>
      <p className={`mt-3 max-w-xl leading-relaxed text-fg-muted ${feature ? 'text-lg' : 'text-base'}`}>{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle" aria-label="Technologies">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="mt-5">
        <ProjectLinks project={project} />
      </div>
    </div>
  );

  if (feature) {
    return (
      <article className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-8">{visual}</div>
        <div className="md:col-span-4">{meta}</div>
      </article>
    );
  }

  return (
    <article>
      {visual}
      {meta}
    </article>
  );
}
