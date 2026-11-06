import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1];

const SectionHeader = ({ code, kicker, title, accent, subtitle, align = 'left' }) => {
  const words = [
    ...title.split(' ').map((w) => ({ w, accent: false })),
    ...(accent ? [{ w: accent, accent: true }] : []),
  ];

  return (
    <div className={`section-header ${align === 'center' ? 'center' : ''}`}>
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="kicker-code">{code}</span>
        <span className="kicker-line" />
        {kicker}
      </motion.p>

      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      >
        {words.map(({ w, accent: isAccent }, i) => (
          <span className="word" key={i}>
            <motion.span
              className={isAccent ? 'accent' : undefined}
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
