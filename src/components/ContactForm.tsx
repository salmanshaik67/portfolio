import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Loader2, Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { profile } from '../data/portfolio';

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
  'mt-2 block w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-base font-normal text-white placeholder:text-white/30 transition-colors duration-300 focus:bg-white/[0.06] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky';

export function ContactForm() {
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
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Hello from ${fields.name.trim()}`);
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
      className: `${inputBase} ${err ? 'border-rose-400/70' : 'border-white/10 hover:border-white/25'}`,
    };
    return (
      <div>
        <label htmlFor={`contact-${k}`} className="text-sm font-normal text-white">
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
    <form noValidate onSubmit={onSubmit} className="card p-5 sm:p-7" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Name', { autoComplete: 'name', placeholder: 'Jane Doe' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'jane@company.com' })}
      </div>
      <div className="mt-5">{field('message', 'Message', { placeholder: 'The role, the team, or the thing you want automated…' })}</div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="flex items-start gap-2 text-xs leading-relaxed text-fg-subtle sm:max-w-[17rem]">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {endpoint
            ? 'Your message is sent straight to my inbox.'
            : 'This form isn’t connected to a server. Submitting opens your email app with the message ready to send.'}
        </p>
        <button type="submit" className="pill-solid shrink-0 disabled:opacity-60" disabled={status === 'submitting'}>
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
              className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks — your message was sent. I’ll reply soon.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Something went wrong. Please email{' '}
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
