import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import { profile, skillGates } from '../data/content';
import '../styles/skills.css';

const ALL_SKILLS = skillGates.flatMap((g) => g.skills.map((s) => ({ ...s, gate: g.id })));

const BaggageBelt = ({ items, reverse }) => (
  <div className={`belt ${reverse ? 'reverse' : ''}`}>
    {[...items, ...items].map((s, i) => (
      <span
        key={`${s.name}-${i}`}
        className="sticker"
        style={{ '--brand': s.color, '--r': `${((i * 37) % 9) - 4}deg` }}
        aria-hidden={i >= items.length}
      >
        <i className={s.icon} />
        {s.name}
      </span>
    ))}
  </div>
);

const LuggageTag = ({ skill, index, gate }) => (
  <motion.li
    className="tag-wrap"
    style={{ '--brand': skill.color }}
    initial={{ opacity: 0, y: -30, rotate: -10 }}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
    transition={{ delay: index * 0.07, type: 'spring', stiffness: 140, damping: 11 }}
    whileHover={{ rotate: [0, -6, 4, -2, 0], transition: { duration: 0.9 } }}
  >
    <span className="tag-string" aria-hidden="true" />
    <div className="tag">
      <span className="tag-eyelet" aria-hidden="true" />
      <div className="tag-top">
        <i className={`${skill.icon} tag-icon`} aria-hidden="true" />
        <span className="tag-tier">{skill.note}</span>
      </div>
      <h4 className="tag-name">{skill.name}</h4>
      <div className="tag-foot">
        <span>
          <i className="fas fa-check" aria-hidden="true" /> Checked in
        </span>
        <span>
          {gate}-{String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  </motion.li>
);

const Skills = () => {
  const [gateId, setGateId] = useState(skillGates[0].id);
  const gate = skillGates.find((g) => g.id === gateId);
  const half = Math.ceil(ALL_SKILLS.length / 2);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeader
          code="03"
          kicker="Skills"
          title="The"
          accent="Travel Kit"
          subtitle="Everything I pack for the journey — from Python and PySpark to Kafka, Azure and Blender, sorted by gate."
        />
      </div>

      <div className="carousel" aria-hidden="true">
        <BaggageBelt items={ALL_SKILLS.slice(0, half)} />
        <BaggageBelt items={ALL_SKILLS.slice(half)} reverse />
      </div>

      <div className="container">
        <div className="gates" role="tablist" aria-label="Skill categories">
          {skillGates.map((g) => {
            const active = g.id === gateId;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                id={`gate-tab-${g.id}`}
                aria-selected={active}
                aria-controls="gate-panel"
                className={`gate ${active ? 'is-active' : ''}`}
                onClick={() => setGateId(g.id)}
              >
                {active && (
                  <motion.span
                    layoutId="gate-pill"
                    className="gate-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="gate-code">Gate {g.id}</span>
                <span className="gate-name">
                  <i className={g.icon} /> {g.short}
                </span>
                <span className="gate-count">{g.skills.length} items</span>
              </button>
            );
          })}
        </div>

        <div className="kit-layout">
          <div
            id="gate-panel"
            className="tags-panel"
            role="tabpanel"
            aria-labelledby={`gate-tab-${gateId}`}
          >
            <AnimatePresence mode="wait">
              <motion.ul key={gateId} className="tags-grid">
                {gate.skills.map((s, i) => (
                  <LuggageTag key={s.name} skill={s} index={i} gate={gateId} />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <motion.aside
            className="manifest"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="manifest-head">
              <span>Baggage manifest</span>
              <i className="fas fa-suitcase-rolling" />
            </div>
            <dl>
              <div className="manifest-row">
                <dt>Items packed</dt>
                <dd>{ALL_SKILLS.length}</dd>
              </div>
              <div className="manifest-row">
                <dt>Compartments</dt>
                <dd>{skillGates.length}</dd>
              </div>
              <div className="manifest-row">
                <dt>Now boarding</dt>
                <dd>{gate.title}</dd>
              </div>
            </dl>

            <div className="phrasebook">
              <span className="phrasebook-title">
                <i className="fas fa-language" /> Phrasebook
              </span>
              <ul>
                {profile.languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
            </div>
            <div className="barcode" aria-hidden="true" />
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;
