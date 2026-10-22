import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { easeExpo } from '../lib/motion';
import { LogoMark } from './ui/Logo';

const sectionIds = ['home', ...navItems.map((n) => n.id)];
const linkedin = profile.socials.find((s) => s.label === 'LinkedIn');

export function Nav() {
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8));

  // Mobile menu: lock scroll, close on Escape, trap focus, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      (button ? [button as HTMLElement] : []).concat(Array.from(panel.current?.querySelectorAll<HTMLElement>('a, button') ?? []));
    focusables()[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab') return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
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
      button?.focus();
    };
  }, [open]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[80] -translate-y-24 rounded-full bg-white px-5 py-2.5 text-sm text-black focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? 'border-white/[0.08] bg-black/80 backdrop-blur-xl' : 'border-transparent bg-black'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-4 md:px-6">
          <a href="#home" className="flex min-h-[44px] items-center gap-2 text-[17px] font-medium tracking-tightish" aria-label={`${profile.name}, back to top`}>
            <LogoMark />
            {profile.name}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative flex min-h-[40px] items-center px-2.5 text-[13px] transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-fg-subtle hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sky"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:text-white sm:grid"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <a href="#contact" className="pill-outline hidden !min-h-[34px] !px-3.5 !text-[13px] sm:inline-flex">
              Contact
            </a>
            <a href={`mailto:${profile.email}`} className="pill-sky !min-h-[34px] !px-3.5 !text-[13px]">
              Email me
            </a>
            <button
              ref={menuButton}
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-black px-5 pb-8 pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <ul className="flex flex-1 flex-col justify-center">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-b border-white/[0.08]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.04 + i * 0.05, duration: 0.5, ease: easeExpo } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="flex items-center justify-between py-4 text-4xl font-light tracking-tighter2"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="spectrum-x mb-6 h-2 rounded-full" aria-hidden="true" />
            <div className="flex gap-2">
              <a href={`mailto:${profile.email}`} className="pill-solid flex-1">
                Email me
              </a>
              {linkedin && (
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="pill-outline flex-1">
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
