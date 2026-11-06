import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { passportFields, profile, stats, timeline } from '../data/content';
import '../styles/about.css';

const EASE = [0.65, 0, 0.35, 1];
const MRZ = [
  'P<INDA<V<<ESHAAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
  'AIDS2027<4IND<SIT<TUMKUR<DATA<AIML<3D<<<<<<<',
];

const STATUS_LABEL = { landed: 'Landed', live: 'In flight', scheduled: 'Scheduled' };

const IdentityPage = () => (
  <div className="passport-page id-page">
    <div className="page-head">
      <span>Republic of Code</span>
      <span>Passport · Page 01</span>
    </div>
    <div className="id-body">
      <div className="id-photo">
        <img src="/port_pic.jpg" alt="" loading="lazy" />
        <span className="id-holo" aria-hidden="true" />
      </div>
      <dl className="id-fields">
        {passportFields.map((f) => (
          <div key={f.label} className={f.wide ? 'wide' : undefined}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
    <div className="id-signature" aria-hidden="true">
      {profile.firstName}
    </div>
    <div className="mrz" aria-hidden="true">
      {MRZ.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  </div>
);

const BioPage = ({ stamped, className = '' }) => (
  <div className={`passport-page bio-page ${className}`}>
    <div className="page-head">
      <span>Visas &amp; Entries</span>
      <span>Page 02</span>
    </div>
    <h3>
      Hello, I&apos;m <span className="hl">{profile.name}</span>
    </h3>
    <p className="bio-lead">{profile.tagline}</p>
    {profile.bio.map((p) => (
      <p key={p.slice(0, 24)}>{p}</p>
    ))}
    <div className="stamps">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className={`stamp stamp-${s.shape}`}
          style={{ '--c': s.color }}
          initial={{ opacity: 0, scale: 2.6, rotate: s.rotate - 25 }}
          animate={
            stamped
              ? { opacity: 0.9, scale: 1, rotate: s.rotate }
              : { opacity: 0, scale: 2.6, rotate: s.rotate - 25 }
          }
          transition={{ delay: stamped ? 0.9 + i * 0.28 : 0, duration: 0.45, ease: [0.3, 1.4, 0.5, 1] }}
        >
          <span className="stamp-label">{s.label}</span>
          <span className="stamp-num">{s.value}</span>
          <span className="stamp-sub">{s.sub}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const Passport = () => {
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { amount: 0.35, once: true });
  const stacked = useMediaQuery('(max-width: 860px)');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    const t = setTimeout(() => setOpen(true), 450);
    return () => clearTimeout(t);
  }, [inView]);

  if (stacked) {
    return (
      <div className="passport-stack" ref={stageRef}>
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <IdentityPage />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <BioPage stamped={inView} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="passport-stage" ref={stageRef}>
      <motion.div
        className="passport"
        initial={false}
        animate={{ x: open ? '0%' : '-25%' }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <div className="passport-slot" aria-hidden="true" />
        <BioPage stamped={open} className="page-right" />
        <motion.div
          className="passport-cover"
          initial={false}
          animate={{ rotateY: open ? -180 : 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <button
            type="button"
            className="cover-face cover-front"
            onClick={() => setOpen(true)}
            tabIndex={open ? -1 : 0}
            aria-hidden={open}
            aria-label="Open passport"
            data-cursor="Open"
          >
            <span className="cover-title">Passport</span>
            <span className="cover-emblem" aria-hidden="true">
              <i className="fas fa-globe-asia" />
            </span>
            <span className="cover-sub">Republic of Code</span>
            <span className="cover-name">{profile.name}</span>
            <span className="cover-chip" aria-hidden="true">
              <i className="fas fa-microchip" />
            </span>
          </button>
          <div className="cover-face cover-back" aria-hidden={!open}>
            <IdentityPage />
          </div>
        </motion.div>
      </motion.div>

      <button type="button" className="passport-toggle" onClick={() => setOpen((o) => !o)}>
        <i className={`fas ${open ? 'fa-book' : 'fa-book-open'}`} />
        {open ? 'Close passport' : 'Open passport'}
      </button>
    </div>
  );
};

const FlightLog = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });
  const planeTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="flightlog" ref={ref}>
      <div className="flightlog-head">
        <h3>
          <i className="fas fa-route" /> Flight Log
        </h3>
        <p>Every leg of the journey so far, the one I&apos;m on right now, and the next stop.</p>
      </div>

      <div className="flightlog-track">
        <div className="route-line" aria-hidden="true">
          <motion.div className="route-fill" style={{ scaleY: progress }} />
          <motion.div className="route-plane" style={{ top: planeTop }}>
            <i className="fas fa-plane" />
          </motion.div>
        </div>

        {timeline.map((leg, i) => (
          <motion.article
            key={leg.title}
            className={`leg ${i % 2 ? 'leg-right' : 'leg-left'}`}
            initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="leg-pin" aria-hidden="true" />
            <div className="leg-card">
              <div className="leg-meta">
                <span>Leg {String(i + 1).padStart(2, '0')}</span>
                <span>{leg.year}</span>
              </div>
              <h4>{leg.title}</h4>
              <p>{leg.description}</p>
              <span className={`leg-status ${leg.status}`}>{STATUS_LABEL[leg.status]}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="section about">
    <div className="container">
      <SectionHeader
        code="02"
        kicker="About me"
        title="The"
        accent="Passport"
        subtitle="Identity, origin story and the stamps collected along the way."
      />
      <Passport />
      <FlightLog />

      <motion.blockquote
        className="captain-note"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <span className="note-label">
          <i className="fas fa-headset" /> A note from the captain
        </span>
        <p>“{profile.quote.text}”</p>
        <cite>— {profile.quote.author}</cite>
      </motion.blockquote>
    </div>
  </section>
);

export default About;
