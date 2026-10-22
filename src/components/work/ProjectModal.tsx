import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Project } from '../../data/portfolio';
import { easeExpo } from '../../lib/motion';
import { ProjectLinks } from './ProjectCard';
import { ProjectArt } from './ProjectArt';

type ProjectModalProps = { project: Project; onClose: () => void };

/** Accessible detail dialog: focus trap, Escape to close, scroll lock, focus returns to the trigger. */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialog.current) return;
      const items = Array.from(dialog.current.querySelectorAll<HTMLElement>('a[href], button'));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="glass-strong relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-ink-900/80 sm:rounded-[2rem]"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeExpo } }}
        exit={{ y: 30, opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[2rem]">
          <ProjectArt project={project} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
        </div>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="glass-strong absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="eyebrow">
              {project.category} · {project.year}
            </p>
            <h3 id="project-modal-title" className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-fg-muted">{project.description}</p>
            <ul className="mt-6 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-fg-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <dl className="space-y-5 md:col-span-2">
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1.5 text-sm">{project.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div className="pt-2">
              <ProjectLinks project={project} />
            </div>
          </dl>
        </div>
      </motion.div>
    </motion.div>
  );
}
