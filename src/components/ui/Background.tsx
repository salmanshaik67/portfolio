/** Fixed cinematic backdrop: base wash, drifting colour orbs, a masked grid and film grain. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#141a3d_0%,#090c1d_45%,#04050a_80%)]" />
      <div className="orb animate-drift-a -left-[12%] top-[-10%] h-[55vmax] w-[55vmax] bg-[radial-gradient(circle,rgba(91,140,255,0.55),transparent_65%)]" />
      <div className="orb animate-drift-b right-[-18%] top-[25%] h-[50vmax] w-[50vmax] bg-[radial-gradient(circle,rgba(155,123,255,0.45),transparent_65%)]" />
      <div className="orb animate-drift-a bottom-[-25%] left-[20%] hidden h-[45vmax] w-[45vmax] bg-[radial-gradient(circle,rgba(63,216,240,0.25),transparent_65%)] md:block" />
      <div className="grid-overlay absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,5,10,0.75)_100%)]" />
    </div>
  );
}
