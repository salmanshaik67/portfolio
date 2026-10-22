import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { manifesto, process } from '../../data/portfolio';
import { easeExpo, viewportOnce } from '../../lib/motion';
import { Reveal } from '../ui/Reveal';

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 id="manifesto-title" className="h-section">
            How I work
          </h2>
          <p className="mt-5 text-[clamp(1.05rem,1.6vw,1.25rem)] font-normal leading-[1.6] text-white">{manifesto}</p>
        </Reveal>

        <motion.ol
          className="mt-10 flex flex-wrap items-center justify-center gap-y-3"
          initial="hidden"
          whileInView="shown"
          viewport={viewportOnce}
          variants={{ shown: { transition: { staggerChildren: 0.08 } } }}
        >
          {process.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                className="flex items-center"
                variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeExpo } } }}
              >
                <span className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-normal text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {step.title}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-left text-xs text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  >
                    {step.text}
                  </span>
                </span>
                {i < process.length - 1 && <ArrowRight className="mx-1.5 h-3.5 w-3.5 text-white/30" aria-hidden="true" />}
              </motion.li>
            );
          })}
        </motion.ol>
        <p className="sr-only">
          {process.map((s) => `${s.title}: ${s.text}`).join(' ')}
        </p>
      </div>
    </section>
  );
}
