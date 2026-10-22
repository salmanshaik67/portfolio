import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CopyButtonProps = {
  value: string;
  label: string;
  copiedLabel?: string;
  className?: string;
  /** Hide the visible text and keep it for screen readers. */
  iconOnly?: boolean;
};

/** Copies text to the clipboard and confirms inline. Falls back to selecting nothing if the API is blocked. */
export function CopyButton({ value, label, copiedLabel = 'Copied', className = 'pill-outline', iconOnly }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const Icon = copied ? Check : Copy;
  return (
    <button type="button" onClick={copy} className={className} aria-label={iconOnly ? (copied ? copiedLabel : label) : undefined}>
      {!iconOnly && <span aria-live="polite">{copied ? copiedLabel : label}</span>}
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}
