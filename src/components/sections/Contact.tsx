import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, Copy, Info, Loader2, Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { contact, profile } from '../../data/portfolio';
import { Magnetic } from '../ui/Magnetic';
import { MaskText } from '../ui/MaskText';
import { Reveal } from '../ui/Reveal';

/**
 * Optional form backend. Set VITE_CONTACT_ENDPOINT to any endpoint that accepts a JSON POST
 * (Formspree, Getform, your own API…). Without it, the form opens the visitor's email app instead.
 */
const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || '';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Tell me a little more — at least 10 characters.';
  return e;
}

const inputBase =
  'mt-2 block w-full rounded-2xl border bg-white/[0.03] px-4 py-3.5 text-base text-fg placeholder:text-fg-subtle/70 transition-colors duration-300 focus:bg-white/[0.06] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan';

function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const errors = validate(fields);
  const showError = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  const update = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Project enquiry from ${fields.name.trim()}`);
      const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const field = (k: keyof Fields, label: string, props: { type?: string; autoComplete?: string; placeholder: string }) => {
    const err = showError(k);
    const common = {
      id: `contact-${k}`,
      name: k,
      value: fields[k],
      onChange: update(k),
      onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? `contact-${k}-error` : undefined,
      placeholder: props.placeholder,
      className: `${inputBase} ${err ? 'border-rose-400/60' : 'border-white/10 hover:border-white/20'}`,
    };
    return (
      <div>
        <label htmlFor={`contact-${k}`} className="text-sm font-medium text-fg">
          {label}
        </label>
        {k === 'message' ? (
          <textarea {...common} rows={5} className={`${common.className} resize-y`} />
        ) : (
          <input {...common} type={props.type} autoComplete={props.autoComplete} />
        )}
        {err && (
          <p id={`contact-${k}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-rose-300">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} className="glass rounded-[2rem] p-6 sm:p-8" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Name', { autoComplete: 'name', placeholder: 'Jane Doe' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'jane@company.com' })}
      </div>
      <div className="mt-5">{field('message', 'Project details', { placeholder: 'What are you building, and when?' })}</div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="flex items-start gap-2 text-xs leading-relaxed text-fg-subtle sm:max-w-[16rem]">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {endpoint
            ? 'Your message is sent securely to my inbox.'
            : 'This form isn’t connected to a server. Submitting opens your email app with the message ready to send.'}
        </p>
        <button type="submit" className="btn-primary shrink-0 disabled:opacity-60" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : endpoint ? (
            <>
              Send message <Send className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              Open in email app <Mail className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks — your message was sent. I’ll reply soon.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-2 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Something went wrong. Please try again or email{' '}
                <a className="underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-white/25"
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb animate-drift-a left-1/2 top-[10%] h-[40rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(91,140,255,0.5),rgba(155,123,255,0.22)_45%,transparent_70%)]" />
        <div className="orb animate-drift-b bottom-0 right-[10%] h-[22rem] w-[22rem] bg-[radial-gradient(circle,rgba(240,114,214,0.28),transparent_65%)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-cyan">05</span>
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-cyan/70 to-transparent" />
            Contact
          </p>
        </Reveal>
        <MaskText
          id="contact-title"
          lines={contact.headline}
          className="mt-6 font-display text-[clamp(2.6rem,9vw,8.5rem)] font-semibold uppercase leading-[0.9] tracking-tightest"
          lineClassName={(i) => (i === 1 ? 'text-gradient md:pl-[10vw]' : i === 2 ? 'md:pl-[4vw]' : '')}
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-fg-muted">{contact.blurb}</p>
              <div className="mt-8 flex items-center gap-3">
                <Magnetic className="inline-block min-w-0">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex min-h-[48px] min-w-0 items-center gap-3 font-display text-2xl font-medium tracking-tight sm:text-3xl"
                  >
                    <span className="link-underline truncate pb-1">{profile.email}</span>
                    <ArrowUpRight
                      className="h-6 w-6 shrink-0 text-cyan transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </Magnetic>
                <CopyEmail />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="eyebrow mt-14">Elsewhere</h3>
              <ul className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {profile.socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-[56px] items-center justify-between gap-4 py-3 text-fg-muted transition-colors hover:text-fg"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span className="text-fg">{s.label}</span>
                          <span className="hidden text-sm text-fg-subtle xs:inline">{s.handle}</span>
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
