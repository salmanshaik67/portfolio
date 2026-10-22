import { profile } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-8 text-center text-sm text-fg-subtle">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="mt-1 text-xs">Inspired by photon.codes</p>
    </footer>
  );
}
