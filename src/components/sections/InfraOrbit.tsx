import { useEffect, useRef } from 'react';
import { useReducedMotionPref } from '../../hooks/useMediaQuery';

type Node = { label: string; color: string; angle: number; lift: number };

const NODES: Node[] = [
  { label: 'Linux', color: '#4ba3d1' },
  { label: 'Windows Server', color: '#a7d7ee' },
  { label: 'AWS', color: '#c4efc0' },
  { label: 'Azure', color: '#b4e48e' },
  { label: 'Ansible', color: '#f2dc78' },
  { label: 'Jenkins', color: '#f5b260' },
  { label: 'TLS / PKI', color: '#f07a52' },
  { label: 'ServiceNow', color: '#e5564b' },
].map((n, i, all) => ({ ...n, angle: (i / all.length) * Math.PI * 2, lift: i % 2 ? -0.22 : 0.14 }));

type Packet = { from: number; to: number; t: number; speed: number; color: string };

/** Index -1 is the core. */
const pos = (i: number, p: { x: number; y: number }[], core: { x: number; y: number }) => (i < 0 ? core : p[i]!);

/**
 * Hero centrepiece: a live "infrastructure map" — eight tool nodes orbit a glowing core,
 * linked by edges that carry spectrum-coloured data packets. Drag (or swipe) to spin it,
 * hover a node to light it up. Pauses offscreen; reduced motion renders one still frame.
 */
export function InfraOrbit() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    const ctx = el?.getContext('2d');
    if (!el || !box || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let rot = 0.35;
    let spin = 0.0016; // radians per frame
    let tiltTarget = 0;
    let tilt = 0;
    let hover = -2;
    let dragging = false;
    let lastX = 0;
    let visible = true;
    let raf = 0;
    let frame = 0;
    const packets: Packet[] = [];
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      const r = box.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      if (reduced) draw();
    };

    const spawn = () => {
      // Core → node, node → core, or hop along the ring.
      const i = Math.floor(Math.random() * NODES.length);
      const r = Math.random();
      const [from, to] = r < 0.4 ? [-1, i] : r < 0.7 ? [i, -1] : [i, (i + 1) % NODES.length];
      packets.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.01, color: NODES[i]!.color });
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.5;
      const R = Math.min(w * 0.42, h * 0.95);
      const pitch = 0.42 + tilt;
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const focal = R * 3.2;

      const project = (x: number, y: number, z: number) => {
        const y2 = y * cosP - z * sinP;
        const z2 = y * sinP + z * cosP;
        const s = focal / (focal + z2);
        return { x: cx + x * s, y: cy + y2 * s, s, z: z2 };
      };

      // Floor rings and radial spokes.
      ctx.lineWidth = 1;
      for (let k = 1; k <= 4; k++) {
        const rr = R * (0.35 + k * 0.22);
        ctx.beginPath();
        for (let a = 0; a <= 64; a++) {
          const t = (a / 64) * Math.PI * 2;
          const p = project(Math.cos(t) * rr, R * 0.32, Math.sin(t) * rr);
          if (a === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.09 - k * 0.015})`;
        ctx.setLineDash(k % 2 ? [] : [2, 6]);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      for (let a = 0; a < 24; a++) {
        const t = (a / 24) * Math.PI * 2 + rot * 0.25;
        const p1 = project(Math.cos(t) * R * 0.4, R * 0.32, Math.sin(t) * R * 0.4);
        const p2 = project(Math.cos(t) * R * 1.25, R * 0.32, Math.sin(t) * R * 1.25);
        const g = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        g.addColorStop(0, 'rgba(255,255,255,0.06)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      const core = project(0, 0, 0);
      const pts = NODES.map((n) => {
        const a = n.angle + rot;
        return { ...project(Math.cos(a) * R, n.lift * R, Math.sin(a) * R), node: n };
      });

      // Edges: core spokes and the ring.
      pts.forEach((p, i) => {
        const near = 0.25 + 0.55 * (1 - (p.z + R) / (2 * R));
        const lit = hover === i;
        const g = ctx.createLinearGradient(core.x, core.y, p.x, p.y);
        g.addColorStop(0, `rgba(255,255,255,${lit ? 0.5 : 0.05})`);
        g.addColorStop(1, hexA(p.node.color, lit ? 0.9 : near * 0.55));
        ctx.strokeStyle = g;
        ctx.lineWidth = lit ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(core.x, core.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        const q = pts[(i + 1) % pts.length]!;
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + near * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      });

      // Packets.
      for (const k of packets) {
        const a = pos(k.from, pts, core);
        const b = pos(k.to, pts, core);
        const x = a.x + (b.x - a.x) * k.t;
        const y = a.y + (b.y - a.y) * k.t;
        const tx = a.x + (b.x - a.x) * Math.max(0, k.t - 0.12);
        const ty = a.y + (b.y - a.y) * Math.max(0, k.t - 0.12);
        const g = ctx.createLinearGradient(tx, ty, x, y);
        g.addColorStop(0, hexA(k.color, 0));
        g.addColorStop(1, hexA(k.color, 0.95));
        ctx.strokeStyle = g;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core: layered glow, conic spectrum ring and pulse.
      const coreR = R * 0.13;
      const glow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, coreR * 3.2);
      glow.addColorStop(0, 'rgba(160,215,255,0.55)');
      glow.addColorStop(0.4, 'rgba(91,140,255,0.18)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(core.x, core.y, coreR * 3.2, 0, Math.PI * 2);
      ctx.fill();

      const pulse = (frame % 140) / 140;
      ctx.strokeStyle = `rgba(160,215,255,${0.45 * (1 - pulse)})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(core.x, core.y, coreR * (1.2 + pulse * 1.8), 0, Math.PI * 2);
      ctx.stroke();

      if (typeof ctx.createConicGradient === 'function') {
        const cg = ctx.createConicGradient(rot * 2, core.x, core.y);
        ['#4ba3d1', '#f3f8fb', '#c4efc0', '#f2dc78', '#f07a52', '#d94848', '#4ba3d1'].forEach((c, i, arr) => cg.addColorStop(i / (arr.length - 1), c));
        ctx.strokeStyle = cg;
      } else {
        ctx.strokeStyle = '#a7d7ee';
      }
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(core.x, core.y, coreR, 0, Math.PI * 2);
      ctx.stroke();

      const body = ctx.createRadialGradient(core.x - coreR * 0.35, core.y - coreR * 0.4, 0, core.x, core.y, coreR);
      body.addColorStop(0, '#ffffff');
      body.addColorStop(0.35, '#9fd4f5');
      body.addColorStop(1, '#0b2a5a');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(core.x, core.y, coreR * 0.78, 0, Math.PI * 2);
      ctx.fill();

      // Nodes, far to near.
      const order = pts.map((p, i) => ({ p, i })).sort((a, b) => b.p.z - a.p.z);
      ctx.font = `500 ${Math.max(10, Math.round(11 * Math.min(1.15, w / 900)))}px "Azeret Mono Variable", ui-monospace, monospace`;
      ctx.textBaseline = 'middle';
      for (const { p, i } of order) {
        const depth = 1 - (p.z + R) / (2 * R); // 1 = near
        const lit = hover === i;
        const r = (5 + depth * 5) * (lit ? 1.5 : 1);

        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        halo.addColorStop(0, hexA(p.node.color, lit ? 0.6 : 0.3 * (0.4 + depth)));
        halo.addColorStop(1, hexA(p.node.color, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.node.color;
        ctx.globalAlpha = 0.45 + depth * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label pill.
        const text = lit ? `${p.node.label} · online` : p.node.label;
        const tw = ctx.measureText(text).width;
        // Labels on the right half sit left of the node so they never run off-canvas.
        const lx = p.x > cx ? p.x - r - 8 - tw : p.x + r + 8;
        const ly = p.y;
        ctx.globalAlpha = lit ? 1 : 0.35 + depth * 0.6;
        ctx.fillStyle = lit ? '#ffffff' : 'rgba(0,0,0,0.6)';
        roundRect(ctx, lx - 6, ly - 10, tw + 12, 20, 10);
        ctx.fill();
        ctx.strokeStyle = lit ? '#ffffff' : 'rgba(255,255,255,0.18)';
        ctx.stroke();
        ctx.fillStyle = lit ? '#000' : '#fff';
        ctx.fillText(text, lx, ly + 0.5);
        ctx.globalAlpha = 1;
      }

      // Hit-test for hover.
      let best = -2;
      let bestD = 30;
      pts.forEach((p, i) => {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best !== hover) {
        hover = best;
        el.style.cursor = best >= 0 ? 'pointer' : dragging ? 'grabbing' : 'grab';
      }
    };

    const tick = () => {
      if (visible && !document.hidden) {
        frame++;
        if (!dragging) {
          spin += (0.0016 - spin) * 0.02;
          rot += hover >= 0 ? spin * 0.2 : spin;
        }
        tilt += (tiltTarget - tilt) * 0.06;
        if (frame % 14 === 0 && packets.length < 26) spawn();
        for (let i = packets.length - 1; i >= 0; i--) {
          packets[i]!.t += packets[i]!.speed;
          if (packets[i]!.t >= 1) packets.splice(i, 1);
        }
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (e.pointerType === 'mouse') tiltTarget = ((mouse.y / h) - 0.5) * 0.25;
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        rot += dx * 0.006;
        spin = dx * 0.0009;
      }
      if (reduced) draw();
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    const onUp = () => {
      dragging = false;
      el.style.cursor = 'grab';
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      tiltTarget = 0;
      if (reduced) draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([entry]) => (visible = !!entry?.isIntersecting));
    io.observe(box);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('pointerleave', onLeave);
    resize();
    if (reduced) draw();
    else raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  return (
    <div className="relative">
      <div ref={wrap} className="relative h-[clamp(300px,42vw,560px)] w-full">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 cursor-grab touch-pan-y" />
      </div>

      {/* HUD corners */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span className="absolute left-0 top-0 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Infra map · live
        </span>
        <span className="absolute right-0 top-0 hidden sm:block">nodes 08 · packets ∞</span>
        <span className="absolute bottom-0 left-0">drag to rotate</span>
        <span className="absolute bottom-0 right-0 hidden sm:block">hover a node</span>
        <span className="absolute left-0 top-5 h-6 w-6 border-l border-t border-white/20" />
        <span className="absolute right-0 top-5 h-6 w-6 border-r border-t border-white/20" />
        <span className="absolute bottom-5 left-0 h-6 w-6 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-0 h-6 w-6 border-b border-r border-white/20" />
      </div>
    </div>
  );
}

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${Math.max(0, Math.min(1, a))})`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
