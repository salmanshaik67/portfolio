import { useId } from 'react';
import type { Project } from '../../data/portfolio';

type ArtProps = { project: Project; className?: string };

/** Generated, resolution-independent cover art. Nothing to download, nothing to break. */
export function ProjectArt({ project, className = '' }: ArtProps) {
  const uid = useId().replace(/:/g, '');
  const [a, b, c] = project.palette;
  const id = (name: string) => `${name}-${uid}`;

  const defs = (
    <defs>
      <linearGradient id={id('bg')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0d1130" />
        <stop offset="1" stopColor="#05060d" />
      </linearGradient>
      <linearGradient id={id('line')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={a} />
        <stop offset="0.5" stopColor={b} />
        <stop offset="1" stopColor={c} />
      </linearGradient>
      <radialGradient id={id('glowA')} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={a} stopOpacity="0.85" />
        <stop offset="1" stopColor={a} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={id('glowB')} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={b} stopOpacity="0.75" />
        <stop offset="1" stopColor={b} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={id('glowC')} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={c} stopOpacity="0.6" />
        <stop offset="1" stopColor={c} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={id('glass')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
      </linearGradient>
      <pattern id={id('grid')} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
      </pattern>
    </defs>
  );

  const glass = (x: number, y: number, w: number, h: number, r = 18) => (
    <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${id('glass')})`} stroke="#fff" strokeOpacity="0.18" />
  );

  let scene: JSX.Element;
  switch (project.art) {
    case 'aurora':
      scene = (
        <>
          <ellipse cx="220" cy="180" rx="320" ry="200" fill={`url(#${id('glowA')})`} />
          <ellipse cx="620" cy="420" rx="300" ry="220" fill={`url(#${id('glowB')})`} />
          <ellipse cx="520" cy="120" rx="200" ry="140" fill={`url(#${id('glowC')})`} />
          <g fill="none" stroke={`url(#${id('line')})`} strokeWidth="1.4" strokeOpacity="0.8">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M-20 ${360 + i * 16} C 180 ${250 + i * 22}, 380 ${470 - i * 8}, 820 ${300 + i * 18}`}
                strokeOpacity={0.15 + i * 0.08}
              />
            ))}
          </g>
          {glass(190, 150, 420, 280, 22)}
          <circle cx="216" cy="174" r="5" fill="#fff" fillOpacity="0.4" />
          <circle cx="232" cy="174" r="5" fill="#fff" fillOpacity="0.25" />
          <circle cx="248" cy="174" r="5" fill="#fff" fillOpacity="0.15" />
          <rect x="216" y="210" width="150" height="10" rx="5" fill="#fff" fillOpacity="0.55" />
          <rect x="216" y="232" width="230" height="6" rx="3" fill="#fff" fillOpacity="0.2" />
          <rect x="216" y="246" width="190" height="6" rx="3" fill="#fff" fillOpacity="0.2" />
          {glass(216, 290, 110, 110, 14)}
          {glass(340, 290, 110, 110, 14)}
          {glass(464, 290, 120, 110, 14)}
          <circle cx="271" cy="345" r="26" fill="none" stroke={a} strokeWidth="5" strokeDasharray="120 200" strokeLinecap="round" />
          <path d="M356 370 L380 340 L400 356 L434 318" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <rect x="482" y="330" width="14" height="50" rx="4" fill={b} fillOpacity="0.8" />
          <rect x="504" y="314" width="14" height="66" rx="4" fill={a} fillOpacity="0.8" />
          <rect x="526" y="342" width="14" height="38" rx="4" fill={c} fillOpacity="0.8" />
          <rect x="548" y="322" width="14" height="58" rx="4" fill="#fff" fillOpacity="0.3" />
        </>
      );
      break;
    case 'signal':
      scene = (
        <>
          <rect width="800" height="600" fill={`url(#${id('grid')})`} />
          <ellipse cx="400" cy="330" rx="380" ry="160" fill={`url(#${id('glowA')})`} opacity="0.55" />
          <g fill="none" strokeWidth="2" strokeLinecap="round">
            {[0, 1, 2, 3].map((k) => (
              <path
                key={k}
                stroke={[a, b, c, '#ffffff'][k]}
                strokeOpacity={k === 3 ? 0.25 : 0.9 - k * 0.15}
                d={Array.from({ length: 41 }, (_, i) => {
                  const x = i * 20;
                  const y = 330 + Math.sin(i * (0.35 + k * 0.08) + k) * (70 - k * 12) + Math.cos(i * 0.9 + k) * 14;
                  return `${i === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
                }).join(' ')}
              />
            ))}
          </g>
          <circle cx="480" cy="268" r="7" fill="#fff" />
          <circle cx="480" cy="268" r="22" fill={a} fillOpacity="0.25" />
          <line x1="480" y1="90" x2="480" y2="520" stroke="#fff" strokeOpacity="0.25" strokeDasharray="4 6" />
          {glass(440, 90, 200, 130, 18)}
          <rect x="464" y="114" width="70" height="7" rx="3.5" fill="#fff" fillOpacity="0.35" />
          <text x="464" y="176" fill="#fff" fontFamily="Space Grotesk Variable, sans-serif" fontSize="44" fontWeight="600">
            99.9%
          </text>
          <rect x="464" y="192" width="120" height="6" rx="3" fill={c} fillOpacity="0.8" />
          {glass(170, 440, 260, 90, 18)}
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={194 + i * 18} y={505 - ((i * 37) % 50) - 10} width="10" height={((i * 37) % 50) + 10} rx="3" fill={i % 3 ? b : a} fillOpacity="0.85" />
          ))}
        </>
      );
      break;
    case 'terminal':
      scene = (
        <>
          <ellipse cx="260" cy="170" rx="300" ry="200" fill={`url(#${id('glowB')})`} opacity="0.55" />
          <ellipse cx="600" cy="470" rx="280" ry="200" fill={`url(#${id('glowA')})`} opacity="0.5" />
          <rect width="800" height="600" fill={`url(#${id('grid')})`} />
          {glass(160, 80, 480, 290, 20)}
          <circle cx="186" cy="104" r="5" fill="#ff6b8b" fillOpacity="0.8" />
          <circle cx="202" cy="104" r="5" fill="#ffd166" fillOpacity="0.8" />
          <circle cx="218" cy="104" r="5" fill="#5be3a2" fillOpacity="0.8" />
          <line x1="160" y1="124" x2="640" y2="124" stroke="#fff" strokeOpacity="0.12" />
          <g fontFamily="JetBrains Mono Variable, monospace" fontSize="15">
            <text x="186" y="160" fill={a}>$</text>
            <text x="204" y="160" fill="#fff" fillOpacity="0.9">ansible-playbook renew-certs.yml</text>
            <text x="186" y="188" fill="#fff" fillOpacity="0.45">PLAY RECAP ********************</text>
            <text x="186" y="212" fill="#5be3a2">ok=52</text>
            <text x="250" y="212" fill="#ffd166">changed=12</text>
            <text x="358" y="212" fill="#fff" fillOpacity="0.55">failed=0</text>
            <text x="186" y="252" fill={a}>$</text>
            <text x="204" y="252" fill="#fff" fillOpacity="0.9">./healthcheck.sh --all</text>
            <text x="186" y="278" fill="#fff" fillOpacity="0.45">[ok] disk  [ok] cpu  [ok] tls</text>
            <text x="186" y="318" fill={c}>›</text>
            <rect x="204" y="306" width="10" height="16" fill="#fff" fillOpacity="0.8" />
          </g>
          <line x1="200" y1="470" x2="600" y2="470" stroke={`url(#${id('line')})`} strokeWidth="3" />
          {['Build', 'Test', 'Scan', 'Deploy', 'Notify'].map((label, i) => (
            <g key={label} transform={`translate(${200 + i * 100} 470)`}>
              <circle r="22" fill="#0b0f24" stroke={[a, b, c, a, b][i]} strokeWidth="2" />
              <path d="M-8 0 L-2 6 L9 -6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text y="48" textAnchor="middle" fill="#fff" fillOpacity="0.6" fontFamily="JetBrains Mono Variable, monospace" fontSize="13">
                {label}
              </text>
            </g>
          ))}
        </>
      );
      break;
    case 'orbit':
      scene = (
        <>
          <ellipse cx="400" cy="300" rx="340" ry="260" fill={`url(#${id('glowB')})`} opacity="0.5" />
          <g fill="none" stroke={`url(#${id('line')})`}>
            <ellipse cx="400" cy="300" rx="320" ry="90" strokeOpacity="0.8" transform="rotate(-12 400 300)" />
            <ellipse cx="400" cy="300" rx="250" ry="250" strokeOpacity="0.18" strokeDasharray="2 8" />
            <ellipse cx="400" cy="300" rx="360" ry="130" strokeOpacity="0.35" transform="rotate(20 400 300)" />
          </g>
          <circle cx="400" cy="300" r="130" fill={`url(#${id('glowA')})`} />
          <circle cx="400" cy="300" r="110" fill="#0b0f24" />
          <circle cx="400" cy="300" r="110" fill={`url(#${id('glowC')})`} opacity="0.9" />
          <circle cx="400" cy="300" r="110" fill="none" stroke="#fff" strokeOpacity="0.3" />
          <ellipse cx="370" cy="262" rx="44" ry="26" fill="#fff" fillOpacity="0.18" />
          <circle cx="712" cy="236" r="9" fill={a} />
          <circle cx="712" cy="236" r="24" fill={a} fillOpacity="0.2" />
          <circle cx="112" cy="372" r="6" fill={b} />
          <circle cx="560" cy="510" r="4" fill="#fff" fillOpacity="0.7" />
          <g stroke="#fff" strokeOpacity="0.2">
            <line x1="400" y1="40" x2="400" y2="120" />
            <line x1="400" y1="480" x2="400" y2="560" />
            <line x1="60" y1="300" x2="140" y2="300" />
            <line x1="660" y1="300" x2="740" y2="300" />
          </g>
          {glass(170, 40, 170, 64, 16)}
          <circle cx="198" cy="72" r="9" fill={c} />
          <rect x="218" y="62" width="90" height="7" rx="3.5" fill="#fff" fillOpacity="0.45" />
          <rect x="218" y="76" width="60" height="6" rx="3" fill="#fff" fillOpacity="0.2" />
        </>
      );
      break;
    case 'shield':
      scene = (
        <>
          <ellipse cx="400" cy="300" rx="320" ry="240" fill={`url(#${id('glowA')})`} opacity="0.5" />
          <ellipse cx="560" cy="460" rx="240" ry="180" fill={`url(#${id('glowB')})`} opacity="0.45" />
          <g stroke="#fff" strokeOpacity="0.16">
            {[
              [190, 150], [610, 140], [180, 420], [620, 430], [300, 520], [500, 80],
            ].map(([x, y]) => (
              <line key={`${x}-${y}`} x1="400" y1="290" x2={x} y2={y} />
            ))}
          </g>
          {[
            [190, 150, a], [610, 140, c], [180, 420, b], [620, 430, a], [300, 520, c], [500, 80, b],
          ].map(([x, y, col]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="16" fill={col as string} fillOpacity="0.15" />
              <circle cx={x} cy={y} r="6" fill={col as string} />
            </g>
          ))}
          <path
            d="M400 140 L520 185 V290 C520 370 465 425 400 450 C335 425 280 370 280 290 V185 Z"
            fill="#0b0f24"
            stroke={`url(#${id('line')})`}
            strokeWidth="3"
          />
          <path
            d="M400 140 L520 185 V290 C520 370 465 425 400 450 C335 425 280 370 280 290 V185 Z"
            fill={`url(#${id('glowC')})`}
            opacity="0.6"
          />
          <rect x="370" y="285" width="60" height="50" rx="10" fill="#fff" fillOpacity="0.9" />
          <path d="M382 285 V268 a18 18 0 0 1 36 0 V285" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="7" />
          <circle cx="400" cy="306" r="6" fill="#0b0f24" />
          <rect x="397" y="306" width="6" height="16" rx="3" fill="#0b0f24" />
          {glass(430, 470, 200, 64, 16)}
          <text x="452" y="508" fill="#fff" fillOpacity="0.85" fontFamily="JetBrains Mono Variable, monospace" fontSize="14">
            pii: redacted ✓
          </text>
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={project.artAlt}>
      {defs}
      <rect width="800" height="600" fill={`url(#${id('bg')})`} />
      {scene}
    </svg>
  );
}
