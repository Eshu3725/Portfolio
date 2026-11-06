import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SplitFlap from './ui/SplitFlap';

const EASE = [0.76, 0, 0.24, 1];

/** Check-in screen shown on first load. Curtains up once boarding is complete. */
const Loader = ({ onDone }) => {
  const reduce = useReducedMotion();
  const duration = reduce ? 0.5 : 2.1;

  useEffect(() => {
    const t = setTimeout(onDone, duration * 1000);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="status"
      aria-label="Loading portfolio"
    >
      <motion.div
        className="loader-card"
        initial={{ y: 40, opacity: 0, rotate: -2 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="loader-row">
          <span>Boarding pass</span>
          <span>Flight EAV-2026</span>
        </div>
        <SplitFlap text="CHECKING IN" length={11} className="loader-flap" />
        <div className="loader-route">
          <div className="loader-city">
            <strong>TUM</strong>
            <span>Tumkur</span>
          </div>
          <div className="loader-line">
            <motion.i
              className="fas fa-plane"
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: duration * 0.85, ease: 'easeInOut' }}
            />
          </div>
          <div className="loader-city right">
            <strong>WWW</strong>
            <span>The Web</span>
          </div>
        </div>
        <div className="loader-foot">
          <span>Gate 01</span>
          <span>Seat 1A</span>
          <span className="loader-status">Boarding</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
