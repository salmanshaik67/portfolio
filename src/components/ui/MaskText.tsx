import { motion } from 'framer-motion';
import { easeExpo, viewportOnce } from '../../lib/motion';

type MaskTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: (index: number) => string;
  /** Animate on mount instead of on scroll (used in the hero). */
  immediate?: boolean;
  delay?: number;
  as?: 'h1' | 'h2' | 'p';
  id?: string;
};

/** Each line slides up from behind a clipping mask. Screen readers get the plain sentence. */
export function MaskText({ lines, className, lineClassName, immediate, delay = 0, as = 'h2', id }: MaskTextProps) {
  const Tag = motion[as];
  const trigger = immediate ? { animate: 'shown' } : { whileInView: 'shown', viewport: viewportOnce };

  return (
    <Tag id={id} className={className} initial="hidden" {...trigger} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName?.(i) ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              shown: { y: '0%', transition: { duration: 1.1, ease: easeExpo, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
