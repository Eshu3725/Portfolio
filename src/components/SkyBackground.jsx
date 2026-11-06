import { useEffect, useRef } from 'react';

const CLOUDS = [
  { w: 320, top: '8%', d: 95, delay: -10 },
  { w: 220, top: '22%', d: 70, delay: -45 },
  { w: 380, top: '46%', d: 120, delay: -80 },
  { w: 260, top: '64%', d: 85, delay: -20 },
  { w: 300, top: '82%', d: 105, delay: -60 },
];

/** Fixed sky layer: twinkling stars + shooting stars at night, drifting clouds by day. */
const SkyBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (theme !== 'dark') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return undefined;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let stars = [];
    let raf = 0;
    let shooting = null;
    let nextShoot = performance.now() + 2500;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(320, Math.floor((w * h) / 5200));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + 0.2,
        a: Math.random() * 0.6 + 0.25,
        s: Math.random() * 1.6 + 0.3,
        p: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.85,
      }));
    };

    const draw = (now) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * st.s + st.p);
        ctx.globalAlpha = st.a * twinkle;
        ctx.fillStyle = st.warm ? '#ffd9a0' : '#dfe8ff';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (reduce) return;
      if (!shooting && now > nextShoot) {
        shooting = {
          x: w * (0.3 + Math.random() * 0.7),
          y: h * Math.random() * 0.35,
          vx: -(7 + Math.random() * 4),
          vy: 2.6 + Math.random() * 2,
          life: 0,
        };
      }
      if (shooting) {
        const s = shooting;
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        const tailX = s.x - s.vx * 14;
        const tailY = s.y - s.vy * 14;
        const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if (s.life > 70 || s.x < -120 || s.y > h + 120) {
          shooting = null;
          nextShoot = now + 4000 + Math.random() * 8000;
        }
      }
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      init();
      if (reduce) draw(performance.now());
    };

    init();
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return (
    <div className="sky" aria-hidden="true">
      <canvas ref={canvasRef} className="sky-stars" />
      <div className="sky-grid" />
      <div className="sky-clouds">
        {CLOUDS.map((c, i) => (
          <span
            key={i}
            className="cloud"
            style={{ '--w': `${c.w}px`, '--top': c.top, '--d': `${c.d}s`, '--delay': `${c.delay}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkyBackground;
