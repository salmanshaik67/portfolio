import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { contact, profile } from '../../data/portfolio';
import { easeExpo, viewportOnce } from '../../lib/motion';
import { ContactForm } from '../ContactForm';
import { CopyButton } from '../ui/CopyButton';
import { Reveal } from '../ui/Reveal';

const BANDS = ['#4ba3d1', '#8ccbe8', '#c9e7f5', '#f3f8fb', '#e3f6ea', '#c4efc0', '#b4e48e', '#d8ea78', '#f2dc78', '#f5b260', '#f07a52', '#e5564b', '#d94848'];
const linkedin = profile.socials.find((s) => s.label === 'LinkedIn');

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      {/* Spectrum stripes call-to-action */}
      <div className="relative isolate overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 flex flex-col"
          initial="hidden"
          whileInView="shown"
          viewport={viewportOnce}
          variants={{ shown: { transition: { staggerChildren: 0.045 } } }}
        >
          {BANDS.map((c) => (
            <motion.span
              key={c}
              className="block flex-1 origin-left transition-[filter] duration-300 hover:brightness-110"
              style={{ background: c }}
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 0.9, ease: easeExpo } } }}
            />
          ))}
        </motion.div>

        <Reveal className="mx-auto flex min-h-[420px] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center md:min-h-[480px]">
          <h2 id="contact-title" className="text-[clamp(2rem,4.4vw,3.2rem)] font-normal leading-[1.08] tracking-tighter2 text-black [text-wrap:balance]">
            {contact.headline}
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <a href={`mailto:${profile.email}`} className="pill-dark">
              Email me
            </a>
            {linkedin && (
              <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="pill-dark-outline bg-white/40">
                LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <CopyButton value={profile.email} label="Copy email" copiedLabel="Email copied" className="pill-dark-outline bg-white/40" />
          </div>
        </Reveal>
      </div>

      {/* Form */}
      <div className="px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="label mb-3">Contact</p>
            <h3 className="h-section">Send a note</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">{contact.blurb}</p>
            <dl className="mt-8 space-y-4 text-[15px]">
              <div>
                <dt className="label">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${profile.email}`} className="break-all font-normal text-white underline-offset-4 hover:underline">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Location</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-normal text-white">
                  <MapPin className="h-3.5 w-3.5 text-fg-subtle" aria-hidden="true" />
                  {profile.location}
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
