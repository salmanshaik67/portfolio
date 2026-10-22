import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { easeExpo } from '../lib/motion';
import { Magnetic } from './ui/Magnetic';

const sectionIds = navItems.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

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

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-fg px-5 py-3 text-sm font-medium text-ink-950 focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-expo md:px-4 ${
            scrolled || open
              ? 'border-white/10 bg-ink-900/55 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#home" className="group flex min-h-[44px] items-center gap-3 rounded-full pl-2 pr-3" aria-label={`${profile.name}, back to top`}>
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 font-display text-sm font-semibold tracking-tight">
              {profile.initials}
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(63,216,240,0.9)]" />
            </span>
            <span className="hidden whitespace-nowrap font-display text-sm font-medium tracking-tight text-fg-muted transition-colors group-hover:text-fg sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Magnetic strength={0.25}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group relative flex min-h-[40px] items-center rounded-full px-3.5 text-sm transition-colors duration-300 lg:px-4 ${
                        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan to-violet transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                      </span>
                    </a>
                  </Magnetic>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-block">
              <a href="#contact" className="btn-primary !min-h-[44px] whitespace-nowrap !px-5">
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <button
              ref={menuButton}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col bg-ink-950/80 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <div aria-hidden="true" className="orb -right-24 top-10 h-72 w-72 bg-violet/40" />
            <ul className="relative flex flex-1 flex-col justify-center gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.05, duration: 0.6, ease: easeExpo } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="flex items-baseline gap-4 py-2 font-display text-5xl font-semibold uppercase tracking-tightest"
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-cyan">0{i + 1}</span>
                    <span className={active === item.id ? 'text-gradient' : 'text-fg'}>{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="relative flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35 } }}
            >
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                Let&apos;s talk <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`mailto:${profile.email}`} className="text-center text-sm text-fg-muted">
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
