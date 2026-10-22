import { AnimatePresence, motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CodeLang, Project } from '../../data/portfolio';
import { useReducedMotionPref } from '../../hooks/useMediaQuery';
import { CopyButton } from '../ui/CopyButton';

const KEYWORDS: Record<CodeLang, string[]> = {
  python: ['def', 'return', 'for', 'in', 'import', 'from', 'assert', 'if', 'else'],
  groovy: ['pipeline', 'agent', 'any', 'stages', 'stage', 'steps', 'post', 'failure', 'sh'],
  yaml: ['true', 'false'],
  bash: ['if', 'then', 'fi', 'for', 'do', 'done'],
};

type Token = { text: string; cls: string };

function tokenize(line: string, lang: CodeLang): Token[] {
  const comment = lang === 'groovy' ? /\/\/.*$/ : /#.*$/;
  const out: Token[] = [];
  const re = new RegExp(`(${comment.source})|("[^"]*"|'[^']*')|([A-Za-z_][\\w.-]*)(?=\\s*\\()|([A-Za-z_][\\w-]*)(?=:\\s)|([A-Za-z_][\\w]*)`, 'g');
  let last = 0;
  for (const m of line.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ text: line.slice(last, idx), cls: 'text-white/85' });
    const [text, c, s, fn, key, word] = m;
    let cls = 'text-white/85';
    if (c) cls = 'text-white/40 italic';
    else if (s) cls = 'text-[#f5b260]';
    else if (fn) cls = 'text-[#b4e48e]';
    else if (key && lang === 'yaml') cls = 'text-teal';
    else if (word && KEYWORDS[lang].includes(word)) cls = 'text-sky';
    out.push({ text, cls });
    last = idx + text.length;
  }
  if (last < line.length) out.push({ text: line.slice(last), cls: 'text-white/85' });
  return out;
}

/** Editor-style panel with line numbers, syntax colouring and a Run button that streams sample output. */
export function CodePanel({ project }: { project: Project }) {
  const reduced = useReducedMotionPref();
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<number>();

  // Reset when the visitor switches project.
  useEffect(() => {
    window.clearInterval(timer.current);
    setShown(0);
    setRunning(false);
  }, [project.slug]);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const run = () => {
    window.clearInterval(timer.current);
    if (reduced) {
      setShown(project.output.length);
      return;
    }
    setShown(0);
    setRunning(true);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= project.output.length) {
        window.clearInterval(timer.current);
        setRunning(false);
      }
    }, 260);
  };

  const done = shown >= project.output.length;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
      <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-white/70">{project.file}</span>
        <span className="label ml-auto !text-[10px]">Illustrative snippet</span>
      </div>

      <pre className="code-scroll overflow-x-auto px-0 py-4 font-mono text-[12.5px] leading-[1.7]" aria-label={`${project.file} code sample`}>
        <code>
          {project.code.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-10 shrink-0 select-none pr-3 text-right text-white/25" aria-hidden="true">
                {i + 1}
              </span>
              <span className="whitespace-pre pr-4">
                {tokenize(line, project.lang).map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>

      <div className="border-t border-white/[0.08] bg-black/50 px-4 py-3" aria-live="polite">
        <div className="min-h-[1.5rem] font-mono text-[12px] leading-[1.75]">
          {shown === 0 && !running ? (
            <p className="text-white/40">Press Run to see what this does.</p>
          ) : (
            <AnimatePresence initial={false}>
              {project.output.slice(0, shown).map((line, i) => (
                <motion.p
                  key={`${project.slug}-${i}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line.startsWith('✓') || line.includes('SUCCESS') ? 'text-emerald-300' : line.startsWith('$') ? 'text-white' : 'text-white/60'}
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
          )}
          {running && <span className="animate-blink inline-block h-3.5 w-2 translate-y-0.5 bg-white/80" aria-hidden="true" />}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/[0.08] px-3 py-3">
        <CopyButton
          value={project.code.join('\n')}
          label="Copy code"
          copiedLabel="Code copied"
          iconOnly
          className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black"
        />
        <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="pill-outline !min-h-[36px] !text-[13px]">
          {project.link.label}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <button type="button" onClick={run} disabled={running} className="pill-solid ml-auto !min-h-[36px] !text-[13px] disabled:opacity-60">
          {done ? <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {running ? 'Running…' : done ? 'Run again' : 'Run'}
        </button>
      </div>
    </div>
  );
}
