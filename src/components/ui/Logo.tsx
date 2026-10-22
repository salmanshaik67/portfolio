/** Three spectrum bars — the site's mark. */
export function LogoMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <rect x="1" y="6" width="3.6" height="9" rx="1" fill="#4ba3d1" />
      <rect x="6.2" y="3.5" width="3.6" height="11.5" rx="1" fill="#c4efc0" />
      <rect x="11.4" y="1" width="3.6" height="14" rx="1" fill="#f07a52" />
    </svg>
  );
}
