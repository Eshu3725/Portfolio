import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.-';

const Flap = ({ target, delay, reduce }) => {
  const [char, setChar] = useState(target);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) {
      setChar(target);
      return undefined;
    }
    let steps = 4 + Math.floor(Math.random() * 6);
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        steps -= 1;
        setTick((t) => t + 1);
        if (steps <= 0) {
          setChar(target);
          clearInterval(interval);
        } else {
          setChar(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        }
      }, 55);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target, delay, reduce]);

  return (
    <span className="flap" aria-hidden="true">
      <span className="flap-char" key={tick}>
        {char === ' ' ? ' ' : char}
      </span>
    </span>
  );
};

/** Airport departure-board style text that flips letter by letter. */
const SplitFlap = ({ text, length, className = '' }) => {
  const reduce = useReducedMotion();
  const size = length ?? text.length;
  const padded = text.toUpperCase().padEnd(size, ' ').slice(0, size);

  return (
    <span className={`splitflap ${className}`}>
      <span className="sr-only">{text}</span>
      {padded.split('').map((ch, i) => (
        <Flap key={i} target={ch} delay={i * 38} reduce={reduce} />
      ))}
    </span>
  );
};

export default SplitFlap;
