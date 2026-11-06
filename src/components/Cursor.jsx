import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [data-cursor], label, select';
const TEXT_FIELDS = 'input, textarea, [contenteditable="true"]';

const canUseCustomCursor = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Compass-ring cursor with contextual labels and a soft spotlight. */
const Cursor = () => {
  const [enabled] = useState(canUseCustomCursor);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });
  const spotX = useSpring(x, { stiffness: 50, damping: 18 });
  const spotY = useSpring(y, { stiffness: 50, damping: 18 });

  const [mode, setMode] = useState({ hover: false, label: '', hidden: true });
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(TEXT_FIELDS)) {
        setMode({ hover: false, label: '', hidden: true });
        return;
      }
      const el = t.closest(INTERACTIVE);
      const label = el?.getAttribute('data-cursor') || '';
      setMode((m) =>
        m.hover === !!el && m.label === label && !m.hidden ? m : { hover: !!el, label, hidden: false }
      );
    };
    const leave = () => setMode((m) => ({ ...m, hidden: true }));
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    root.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);

    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      root.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringClass = [
    'cursor-ring',
    mode.hover && 'is-hover',
    mode.label && 'has-label',
    mode.hidden && 'is-hidden',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <motion.div className="cursor-spot" style={{ x: spotX, y: spotY }} aria-hidden="true" />
      <motion.div
        className={ringClass}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: down ? 0.82 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      >
        <span className="cursor-ticks" />
        <span className="cursor-label">{mode.label}</span>
      </motion.div>
      <motion.div
        className={`cursor-dot ${mode.hidden || mode.label ? 'is-hidden' : ''}`}
        style={{ x, y }}
        aria-hidden="true"
      />
    </>
  );
};

export default Cursor;
