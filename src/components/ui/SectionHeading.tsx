import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string[];
  id: string;
  aside?: string;
};

export function SectionHeading({ index, eyebrow, title, id, aside }: SectionHeadingProps) {
  return (
    <header className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-cyan">{index}</span>
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-cyan/70 to-transparent" />
            {eyebrow}
          </p>
        </Reveal>
        <div className="mt-5">
          <MaskText
            id={id}
            lines={title}
            className="font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold uppercase leading-[0.92] tracking-tightest"
            lineClassName={(i) => (i === title.length - 1 ? 'text-gradient' : '')}
          />
        </div>
      </div>
      {aside && (
        <Reveal delay={0.15} className="md:col-span-4 md:pb-3">
          <p className="max-w-sm text-base leading-relaxed text-fg-muted md:ml-auto">{aside}</p>
        </Reveal>
      )}
    </header>
  );
}
