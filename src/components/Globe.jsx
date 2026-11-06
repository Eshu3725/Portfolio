import { useEffect, useRef } from 'react';

const DEG = Math.PI / 180;
const HOME = { code: 'TUM', lat: 13.34, lon: 77.1 };
const DESTINATIONS = [
  { code: 'SFO', lat: 37.62, lon: -122.38 },
  { code: 'LHR', lat: 51.47, lon: -0.45 },
  { code: 'HND', lat: 35.55, lon: 139.78 },
  { code: 'DXB', lat: 25.25, lon: 55.36 },
  { code: 'SIN', lat: 1.36, lon: 103.99 },
  { code: 'SYD', lat: -33.94, lon: 151.18 },
  { code: 'KEF', lat: 63.98, lon: -22.6 },
  { code: 'CPT', lat: -33.97, lon: 18.6 },
];

const toVec = (lat, lon) => {
  const p = lat * DEG;
  const l = lon * DEG;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

const slerp = (a, b, t) => {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(d);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const k1 = Math.sin((1 - t) * omega) / s;
  const k2 = Math.sin(t * omega) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
};

// Evenly distributed "data points" on the sphere (Fibonacci lattice)
const DOTS = (() => {
  const n = 1100;
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    return [Math.cos(th) * r, y, Math.sin(th) * r];
  });
})();

const HOME_VEC = toVec(HOME.lat, HOME.lon);

const ARCS = DESTINATIONS.map((d, i) => {
  const end = toVec(d.lat, d.lon);
  const omega = Math.acos(
    Math.min(1, HOME_VEC[0] * end[0] + HOME_VEC[1] * end[1] + HOME_VEC[2] * end[2])
  );
  const lift = 0.05 + omega * 0.11;
  const pts = Array.from({ length: 61 }, (_, k) => {
    const t = k / 60;
    const v = slerp(HOME_VEC, end, t);
    const h = 1 + lift * Math.sin(Math.PI * t);
    return [v[0] * h, v[1] * h, v[2] * h];
  });
  return { ...d, end, pts, offset: i / DESTINATIONS.length };
});

const rotate = (v, yaw, pitch) => {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = v[0] * cy + v[2] * sy;
  const z1 = -v[0] * sy + v[2] * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return [x1, v[1] * cp - z1 * sp, v[1] * sp + z1 * cp];
};

const readColors = () => {
  const s = getComputedStyle(document.documentElement);
  const get = (name, fallback) => s.getPropertyValue(name).trim() || fallback;
  return {
    dot: get('--globe-dot', '150,180,240'),
    arc: get('--globe-arc', '255,181,71'),
    glow: get('--globe-glow', '92,200,255'),
    label: get('--globe-label', '233,237,247'),
  };
};

/** Draggable dotted globe with animated flight routes out of Tumkur. */
const Globe = ({ theme }) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const redrawRef = useRef(null);

  useEffect(() => {
    colorsRef.current = readColors();
    redrawRef.current?.();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const autoSpeed = reduce ? 0 : 0.0018;

    let w = 0;
    let h = 0;
    let raf = 0;
    let yaw = -HOME.lon * DEG - 0.55;
    let pitch = 0.32;
    let vel = autoSpeed;
    const drag = { active: false, x: 0, y: 0 };
    const start = performance.now();

    const draw = (now) => {
      const c = colorsRef.current || readColors();
      const t = (now - start) / 1000;
      // keep the 1.38R atmosphere inside the canvas so it never clips square
      const R = Math.min(w, h) * 0.355;
      const cx = w / 2;
      const cy = h / 2;
      const sx = (x) => cx + x * R;
      const sy = (y) => cy - y * R;

      ctx.clearRect(0, 0, w, h);

      // atmosphere
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.38);
      halo.addColorStop(0, `rgba(${c.glow},0.22)`);
      halo.addColorStop(1, `rgba(${c.glow},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.38, 0, Math.PI * 2);
      ctx.fill();

      // body
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, `rgba(${c.glow},0.18)`);
      body.addColorStop(1, `rgba(${c.glow},0.03)`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(${c.glow},0.35)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // dotted surface
      ctx.fillStyle = `rgb(${c.dot})`;
      for (const p of DOTS) {
        const [x, y, z] = rotate(p, yaw, pitch);
        if (z <= 0) continue;
        const size = 0.7 + z * 1.15;
        ctx.globalAlpha = 0.12 + z * 0.68;
        ctx.fillRect(sx(x) - size / 2, sy(y) - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      // routes
      const strokeRange = (proj, vis, to) => {
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= to; i += 1) {
          if (!vis[i]) {
            pen = false;
            continue;
          }
          const [x, y] = proj[i];
          if (pen) ctx.lineTo(sx(x), sy(y));
          else ctx.moveTo(sx(x), sy(y));
          pen = true;
        }
        ctx.stroke();
      };

      ctx.font = `600 10px "JetBrains Mono", monospace`;
      ctx.lineCap = 'round';

      for (const arc of ARCS) {
        const proj = arc.pts.map((p) => rotate(p, yaw, pitch));
        const vis = proj.map(([x, y, z]) => z > 0 || x * x + y * y > 1);
        const last = proj.length - 1;

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${c.arc},0.16)`;
        strokeRange(proj, vis, last);

        const cycle = reduce ? 1 : (t * 0.2 + arc.offset) % 1.5;
        const head = Math.min(cycle, 1);
        const fade = cycle > 1 ? 1 - (cycle - 1) / 0.5 : 1;
        const idx = Math.floor(head * last);
        ctx.lineWidth = 1.7;
        ctx.strokeStyle = `rgba(${c.arc},${0.9 * fade})`;
        strokeRange(proj, vis, idx);

        if (cycle < 1 && vis[idx]) {
          const [x, y] = proj[idx];
          ctx.fillStyle = `rgba(${c.arc},1)`;
          ctx.shadowColor = `rgba(${c.arc},0.9)`;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(sx(x), sy(y), 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        const [ex, ey, ez] = rotate(arc.end, yaw, pitch);
        if (ez > 0) {
          ctx.fillStyle = `rgba(${c.arc},${0.5 + ez * 0.5})`;
          ctx.beginPath();
          ctx.arc(sx(ex), sy(ey), 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${c.label},${ez * 0.85})`;
          ctx.fillText(arc.code, sx(ex) + 6, sy(ey) - 6);
        }
      }

      // home base with pulse
      const [hx, hy, hz] = rotate(HOME_VEC, yaw, pitch);
      if (hz > 0) {
        const phase = reduce ? 0.4 : (t * 0.9) % 1;
        ctx.strokeStyle = `rgba(${c.arc},${(1 - phase) * 0.9})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx(hx), sy(hy), 4 + phase * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(${c.arc},1)`;
        ctx.beginPath();
        ctx.arc(sx(hx), sy(hy), 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${c.label},${hz})`;
        ctx.font = `700 11px "JetBrains Mono", monospace`;
        ctx.fillText(`${HOME.code} · HOME`, sx(hx) + 9, sy(hy) + 4);
      }
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const loop = (now) => {
      if (!drag.active) {
        vel += (autoSpeed - vel) * 0.03;
        yaw += vel;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    redrawRef.current = () => draw(performance.now());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
    io.observe(canvas);

    const onDown = (e) => {
      drag.active = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag.active) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      yaw += dx * 0.006;
      pitch = Math.max(-0.5, Math.min(0.95, pitch + dy * 0.004));
      vel = dx * 0.006;
      if (reduce) draw(performance.now());
    };
    const onUp = () => {
      drag.active = false;
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      redrawRef.current = null;
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="globe-canvas"
      data-cursor="Drag"
      role="img"
      aria-label="Interactive globe showing flight routes from Tumkur, India to cities around the world. Drag to spin."
    />
  );
};

export default Globe;
