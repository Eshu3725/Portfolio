import { useState, useEffect, useContext } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Travel from './components/Travel';
import TravelDetail from './components/TravelDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import './App.css';

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // We don't need to add Google Fonts here as they're already in index.html

    // Add Font Awesome for icons if not already in index.html
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const script = document.createElement('script');
      script.src = 'https://kit.fontawesome.com/a076d05399.js';
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  // Loading screen animation variants
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  return (
    <>
      {isLoading ? (
        <motion.div
          className="loading-screen"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="loader">
            <div className="loader-circle" />
            <div className="loader-text">Loading...</div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="app"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <CustomCursor />
          <ParticlesBackground theme={theme} />
          <motion.div className="progress-bar" style={{ scaleX }} />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/travel/:location" element={<TravelDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />

          <button
            type="button"
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll to top"
          >
            <i className="fas fa-arrow-up" />
          </button>
        </motion.div>
      )}
    </>
  );
};

// HomePage component that contains all the main sections
const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Travel />
      <Contact />
    </main>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
