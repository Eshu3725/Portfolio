import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/** Top-of-page scroll indicator: a plane flying left to right with a contrail. */
const FlightProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const width = useTransform(progress, (v) => `${v * 100}%`);
  const left = useTransform(progress, (v) => `calc(${v * 100}% - ${v * 16}px)`);

  return (
    <div className="flight-progress" aria-hidden="true">
      <motion.div className="fp-trail" style={{ width }} />
      <motion.i className="fas fa-plane fp-plane" style={{ left }} />
    </div>
  );
};

export default FlightProgress;
