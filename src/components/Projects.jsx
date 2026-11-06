import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { featuredProject, projects } from '../data/content';
import '../styles/projects.css';

const EASE = [0.2, 0.8, 0.2, 1];

const Postmark = ({ label }) => {
  const pathId = `pm-${label.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg className="pc-postmark" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id={pathId} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="60" r="32" />
      <text textLength="268" lengthAdjust="spacing">
        <textPath href={`#${pathId}`}>{`${label} · VIA THE WEB · `}</textPath>
      </text>
      <text x="60" y="66" textAnchor="middle" className="pm-center">
        ✈
      </text>
    </svg>
  );
};

/* ---------------------------------------------------------------------------
   Flagship: SECT
   --------------------------------------------------------------------------- */
const FeaturedProject = ({ project }) => (
  <motion.article
    className="flagship"
    initial={{ opacity: 0, y: 70 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, ease: EASE }}
  >
    <div className="flagship-main">
      <div className="flagship-top">
        <span className="flagship-badge">
          <i className="fas fa-star" /> Flagship destination
        </span>
        <span className="flagship-code">{project.code}</span>
      </div>

      <div className="flagship-route" aria-hidden="true">
        <span>Idea</span>
        <span className="flagship-path">
          <i className="fas fa-plane" />
        </span>
        <span>Live product</span>
      </div>

      <h3 className="flagship-title">{project.title}</h3>
      <p className="flagship-subtitle">{project.subtitle}</p>
      <p className="flagship-desc">{project.description}</p>

      <ul className="flagship-features">
        {project.features.map((f, i) => (
          <motion.li
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: EASE }}
          >
            <span className="feature-icon">
              <i className={f.icon} />
            </span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>

    <div className="flagship-perf" aria-hidden="true" />

    <aside className="flagship-side">
      <span className="side-label">
        <i className="fas fa-person-walking-luggage" /> Next stops · in progress
      </span>
      <ol className="roadmap">
        {project.roadmap.map((r, i) => (
          <motion.li
            key={r.text}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
          >
            <span className="roadmap-dot">
              <i className={r.icon} />
            </span>
            {r.text}
          </motion.li>
        ))}
      </ol>
      <a href="#contact" className="btn btn-primary flagship-cta" data-cursor="Ask">
        Ask for a walkthrough <i className="fas fa-arrow-right" />
      </a>
      <div className="stub-barcode flagship-barcode" aria-hidden="true" />
    </aside>
  </motion.article>
);

/* ---------------------------------------------------------------------------
   Postcards
   --------------------------------------------------------------------------- */
const PosterArt = ({ project }) => {
  const [p1, p2, p3] = project.palette;
  return (
    <div className="pc-poster" style={{ '--p1': p1, '--p2': p2, '--p3': p3 }} aria-hidden="true">
      <span className="poster-rays" />
      <span className="poster-sun">
        <i className={project.icon} />
      </span>
      <svg className="poster-hills" viewBox="0 0 600 200" preserveAspectRatio="none">
        <path d="M0 200V120c80-40 150-50 230-20s150 40 230 0 110-50 140-40v140z" />
        <path d="M0 200v-40c100-30 200-20 300 5s200 25 300-10v45z" />
      </svg>
    </div>
  );
};

const Postcard = ({ project, index }) => {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 160, damping: 16 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 55%)`;

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = tiltRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const tilt = index % 2 ? 1.5 : -1.5;
  const hasLinks = project.github || project.live;

  return (
    <motion.div
      className="postcard-wrap"
      initial={{ opacity: 0, y: 80, rotate: tilt * 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: EASE }}
    >
      <motion.div
        ref={tiltRef}
        className="postcard-tilt"
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <motion.div
          className="postcard"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* front */}
          <div className="pc-face pc-front" inert={flipped || undefined}>
            {project.image ? (
              <img src={project.image} alt="" className="pc-img" loading="lazy" />
            ) : (
              <PosterArt project={project} />
            )}
            <div className="pc-shade" />
            <motion.div className="pc-glare" style={{ background: glare }} />
            <div className="pc-stamp">
              <div className="pc-stamp-inner">
                <i className={project.icon} />
                <span>{project.code}</span>
              </div>
            </div>
            <Postmark label={project.title.toUpperCase()} />
            <div className="pc-front-text">
              <span className="pc-greet">Greetings from</span>
              <h3>{project.title}</h3>
              <span className="pc-category">{project.category}</span>
            </div>
            <button
              type="button"
              className="pc-hit"
              onClick={() => setFlipped(true)}
              aria-label={`Flip the ${project.title} postcard to read about it`}
              data-cursor="Flip"
            />
            <span className="pc-hint" aria-hidden="true">
              <i className="fas fa-rotate" /> Tap to flip
            </span>
          </div>

          {/* back */}
          <div className="pc-face pc-back" inert={!flipped || undefined}>
            <div className="pc-back-left">
              <span className="pc-dear">Dear visitor,</span>
              <p className="pc-hand">{project.description}</p>
              <ul className="pc-tech" aria-label="Highlights">
                {project.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="pc-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="Code">
                    <i className="fab fa-github" /> Source
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                    <i className="fas fa-arrow-up-right-from-square" /> Live
                  </a>
                )}
                {!hasLinks && (
                  <a href="#contact" data-cursor="Ask">
                    <i className="fas fa-comment-dots" /> Ask for a demo
                  </a>
                )}
              </div>
            </div>
            <div className="pc-divider" aria-hidden="true" />
            <div className="pc-back-right">
              <div className="pc-stamp small" aria-hidden="true">
                <div className="pc-stamp-inner">
                  <i className={project.icon} />
                </div>
              </div>
              <div className="pc-address" aria-hidden="true">
                <span>To: You, curious traveller</span>
                <span>Somewhere on the Internet</span>
                <span>Planet Earth 🌍</span>
              </div>
              <button type="button" className="pc-flip-back" onClick={() => setFlipped(false)} data-cursor="Flip">
                <i className="fas fa-rotate-left" /> Flip back
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="section projects">
    <div className="container">
      <SectionHeader
        code="04"
        kicker="Projects"
        title="Visited"
        accent="Destinations"
        subtitle="Every project is a place I've been. Start with the flagship, then flip a postcard to read the story on the back."
      />

      <FeaturedProject project={featuredProject} />

      <div className="postcards">
        {projects.map((p, i) => (
          <Postcard key={p.id} project={p} index={i} />
        ))}

        <motion.a
          href="#contact"
          className={`postcard-ghost ${projects.length % 2 ? 'is-cell' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          data-cursor="Plan"
        >
          <i className="fas fa-compass ghost-compass" aria-hidden="true" />
          <div>
            <span className="ghost-kicker">Next destination · Uncharted</span>
            <h3>New routes are being charted right now.</h3>
            <p>Have an idea worth travelling for? Let&apos;s plan the route together.</p>
          </div>
          <i className="fas fa-arrow-right ghost-arrow" aria-hidden="true" />
        </motion.a>
      </div>
    </div>
  </section>
);

export default Projects;
