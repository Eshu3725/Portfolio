import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Return flight — back to top"
          data-cursor="Return"
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.6 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-plane" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
