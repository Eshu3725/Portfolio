import { useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Loader from './components/Loader';
import SkyBackground from './components/SkyBackground';
import Cursor from './components/Cursor';
import FlightProgress from './components/FlightProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { useActiveSection } from './hooks/useActiveSection';
import { navItems } from './data/content';
import './styles/chrome.css';

const SECTION_IDS = navItems.map((n) => n.id);

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" onDone={finishLoading} />}</AnimatePresence>

      <SkyBackground theme={theme} />
      <div className="overlay-grain" aria-hidden="true" />
      <div className="overlay-vignette" aria-hidden="true" />
      <Cursor />
      <FlightProgress />

      <Header active={active} />
      <main>
        <Hero ready={!loading} theme={theme} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
