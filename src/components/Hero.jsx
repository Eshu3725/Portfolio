import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Globe from './Globe';
import SplitFlap from './ui/SplitFlap';
import Magnetic from './ui/Magnetic';
import { profile } from '../data/content';
import '../styles/hero.css';

const EASE = [0.2, 0.8, 0.2, 1];
const FLIGHT_PATH = 'M -60 720 C 260 540 520 780 820 540 S 1280 200 1520 120';
const NAME_LINES = [
  { text: profile.firstName, cls: '' },
  { text: `${profile.surname}.`, cls: 'outline' },
];

const Hero = ({ ready, theme }) => {
  const sectionRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!ready) return undefined;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 3400);
    return () => clearInterval(id);
  }, [ready]);

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const backMtnY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const midMtnY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const near = { x: useTransform(smx, (v) => v * 34), y: useTransform(smy, (v) => v * 34) };
  const far = { x: useTransform(smx, (v) => v * -18), y: useTransform(smy, (v) => v * -18) };

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const enter = (delay) => ({
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { delay, duration: 0.85, ease: EASE },
  });

  return (
    <section id="home" className="hero" ref={sectionRef} onPointerMove={onPointerMove}>
      <svg className="hero-flightpath" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d={FLIGHT_PATH} className="flightpath-line" />
        <g className="flightpath-plane">
          <path
            transform="scale(1.5)"
            d="M14 0c0-1.2-1.5-1.8-3-1.8H4L-2-10h-3l4 8.2h-6l-2.5-3.2h-2L-10 0l-1.5 5h2l2.5-3.2h6L-5 10h3l6-8.2h7c1.5 0 3-.6 3-1.8z"
          />
          <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path={FLIGHT_PATH} />
        </g>
      </svg>

      <div className="container hero-inner">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div className="hero-kicker" {...enter(0.1)}>
            <span className="pulse-dot" />
            Now flying · {profile.currentRole.title} @ {profile.currentRole.company}
          </motion.div>

          <h1 className="hero-title" aria-label={profile.name}>
            {NAME_LINES.map((line, li) => (
              <span className={`line ${line.cls}`} key={line.text} aria-hidden="true">
                {line.text.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className={`char ${ch === '.' ? 'dot' : ''}`}
                    initial={{ y: '115%' }}
                    animate={{ y: ready ? '0%' : '115%' }}
                    transition={{ delay: 0.2 + li * 0.28 + ci * 0.05, duration: 0.95, ease: EASE }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div className="hero-role" {...enter(0.75)}>
            <span className="hero-role-label">
              <i className="fas fa-plane-departure" /> Cruising through
            </span>
            <SplitFlap text={ready ? profile.roles[roleIndex] : ''} length={14} />
          </motion.div>

          <motion.p className="hero-desc" {...enter(0.9)}>
            Final-year <em>AI &amp; Data Science</em> engineering student working across{' '}
            <em>data engineering</em>, <em>AI/ML</em> and <em>3D animation</em> — packing code, curiosity
            and a passport for every new destination.
          </motion.p>

          <motion.div className="hero-cta" {...enter(1.05)}>
            <Magnetic>
              <a href="#projects" className="btn btn-primary" data-cursor="Fly">
                Explore destinations <i className="fas fa-plane" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Send a postcard <i className="fas fa-paper-plane" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-ticket" {...enter(1.2)}>
            <div className="ticket-city">
              <span>From</span>
              <strong>{profile.homeCode}</strong>
              <span>Tumkur, IN</span>
            </div>
            <div className="ticket-path" aria-hidden="true">
              <i className="fas fa-plane" />
            </div>
            <div className="ticket-city right">
              <span>To</span>
              <strong>ANY</strong>
              <span>Anywhere w/ Wi-Fi</span>
            </div>
            <div className="ticket-meta">
              <span>Gate<b>01</b></span>
              <span>Seat<b>1A</b></span>
              <span>Class<b>Dev</b></span>
              <span className="ticket-barcode" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: visualY }}>
          <motion.div
            className="globe-wrap"
            style={far}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ delay: 0.35, duration: 1.3, ease: EASE }}
          >
            <Globe theme={theme} />
          </motion.div>

          <motion.div className="polaroid-pos" style={near}>
            <motion.figure
              className="polaroid"
              initial={{ opacity: 0, rotate: -22, y: 60 }}
              animate={ready ? { opacity: 1, rotate: -7, y: 0 } : { opacity: 0, rotate: -22, y: 60 }}
              transition={{ delay: 0.9, duration: 1, ease: EASE }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <span className="tape" aria-hidden="true" />
              <img src="/port_pic.jpg" alt="Portrait of Eshaan A V" />
              <figcaption>Eshaan · somewhere new</figcaption>
            </motion.figure>
          </motion.div>

          {[
            { cls: 'chip-coords', icon: 'fas fa-location-dot', text: profile.coords, d: 1.2 },
            { cls: 'chip-wifi', icon: 'fas fa-trophy', text: 'Top 10 · AI Brewery 2026', d: 1.35 },
            { cls: 'chip-alt', icon: 'fas fa-gauge-high', text: 'Alt. 35,000 ft of curiosity', d: 1.5 },
          ].map((chip) => (
            <motion.div key={chip.cls} className={`chip-pos ${chip.cls}`} style={near}>
              <motion.div
                className="float-chip"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{ delay: chip.d, duration: 0.6, ease: EASE }}
              >
                <i className={chip.icon} />
                {chip.text}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="hero-landscape" aria-hidden="true">
        <motion.svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ y: backMtnY }}>
          <path
            className="mtn-back"
            d="M0 320V190l90-40 80 35 90-75 80 50 80-40 100 55 90-80 90 55 90-25 90 55 100-80 90 50 90-35 90 50 90-35 100 40v150z"
          />
          <rect className="tower" x="608" y="62" width="3" height="34" />
          <rect className="tower-light" x="606" y="56" width="7" height="7" rx="3.5" />
        </motion.svg>
        <motion.svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ y: midMtnY }}>
          <path
            className="mtn-mid"
            d="M0 320v-90l120-30 90 35 110-50 110 45 110-25 120 40 100-45 120 40 120-30 110 35 120-40 110 30 100-20v105z"
          />
        </motion.svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            className="mtn-front"
            d="M0 320v-50c180-30 320 20 520-8s340 28 540 4 280 14 380-4v58z"
          />
        </svg>
      </div>

      <motion.a
        href="#about"
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        data-cursor="Takeoff"
      >
        <span>Scroll to take off</span>
        <span className="scroll-cue-line" />
      </motion.a>
    </section>
  );
};

export default Hero;
