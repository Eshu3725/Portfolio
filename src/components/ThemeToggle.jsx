import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to day flight (light theme)' : 'Switch to night flight (dark theme)'}
      title={isDark ? 'Day flight' : 'Night flight'}
      data-cursor={isDark ? 'Day' : 'Night'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.i
          key={theme}
          className={isDark ? 'fas fa-moon' : 'fas fa-sun'}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
