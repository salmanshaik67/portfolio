import { navItems, profile } from '../data/portfolio';
import { LogoMark } from './ui/Logo';

const linkedin = profile.socials.find((s) => s.label === 'LinkedIn');

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] px-4 pb-8 pt-14 md:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_auto]">
        <div className="space-y-5">
          <LogoMark className="h-7 w-7" />
          <p className="max-w-xs text-sm text-fg-subtle">
            {profile.name} — {profile.role}.
          </p>
          <p className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Currently: {profile.status}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <nav aria-label="Footer">
            <p className="label !text-white">Portfolio</p>
            <ul className="mt-3 space-y-1 text-[13px]">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="link-quiet inline-flex min-h-[32px] items-center lowercase">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label !text-white">Connect</p>
            <ul className="mt-3 space-y-1 text-[13px]">
              {linkedin && (
                <li>
                  <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex min-h-[32px] items-center">
                    linkedin<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${profile.email}`} className="link-quiet inline-flex min-h-[32px] items-center">
                  email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label !text-white">Based in</p>
            <p className="mt-3 max-w-[12rem] text-[13px] leading-relaxed text-fg-subtle">{profile.location}</p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-[1400px] text-[11px] text-fg-subtle">
        © {year} {profile.name} | Inspired by photon.codes
      </p>
    </footer>
  );
}
