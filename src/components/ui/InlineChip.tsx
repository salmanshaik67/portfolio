import type { Chip } from '../../data/portfolio';

const tints = ['#00bbff', '#77dddd', '#b4e48e', '#ffcc66', '#f07a52', '#bb88ff'];

/** Icon-in-a-tile + label, sized to sit inside a sentence. */
export function InlineChip({ chip, index, suffix = '' }: { chip: Chip; index: number; suffix?: string }) {
  const Icon = chip.icon;
  const tint = tints[index % tints.length];
  return (
    <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap text-white">
      <span
        className="relative top-[0.12em] grid h-[1.05em] w-[1.05em] place-items-center self-center rounded-[0.28em]"
        style={{ background: tint }}
        aria-hidden="true"
      >
        <Icon className="h-[0.7em] w-[0.7em] text-black" strokeWidth={2.4} />
      </span>
      <span>
        {chip.label}
        {suffix}
      </span>
    </span>
  );
}
