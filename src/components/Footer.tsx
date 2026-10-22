import { ArrowUp } from 'lucide-react';
import { navItems, profile } from '../data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] px-5 pb-10 pt-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[clamp(2.5rem,8vw,6rem)] font-semibold uppercase leading-none tracking-tightest text-outline">
              {profile.name}
            </p>
            <p className="mt-3 text-sm text-fg-muted">
              {profile.role} · {profile.location}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="link-underline inline-flex min-h-[44px] items-center text-fg-muted hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-white/[0.06] pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with React, Vite, Tailwind CSS and Framer Motion.
          </p>
          <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 text-fg-muted hover:text-fg">
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
