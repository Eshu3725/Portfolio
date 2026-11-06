import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { navItems } from '../data/content';

const DEPART_TIMES = ['08:05', '09:40', '11:15', '13:30', '16:45'];

const Header = ({ active }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="header-inner">
        <a href="#home" className="brand" data-cursor="Home" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <i className="fas fa-plane-departure" />
          </span>
          <span className="brand-text">
            Eshaan<span>.av</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={isActive ? 'is-active' : undefined}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="nav-code">{item.code}</span>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className={`menu-btn ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="departures-board"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="departures-board"
            className="mobile-board"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="board-title">
              <i className="fas fa-plane-departure" /> Departures
            </div>
            <div className="board-head" aria-hidden="true">
              <span>Time</span>
              <span>Destination</span>
              <span className="board-gate">Gate</span>
              <span>Status</span>
            </div>
            <nav aria-label="Mobile">
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.4 }}
                  >
                    <a href={`#${item.id}`} className="board-row" onClick={() => setOpen(false)}>
                      <span className="board-time">{DEPART_TIMES[i]}</span>
                      <span className="board-dest">{item.label}</span>
                      <span className="board-gate">{item.code}</span>
                      <span className={`board-status ${active === item.id ? 'boarding' : ''}`}>
                        {active === item.id ? 'Boarding' : 'On time'}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <p className="board-foot">Tap a destination to fly there ✈</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
