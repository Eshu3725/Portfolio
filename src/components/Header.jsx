import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when location changes
  useEffect(() => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="accent-text">Eshaan A V</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Desktop navigation */}
        <div className="header-right desktop-nav">
          <nav>
            <ul>
              {location.pathname === '/' ? (
                <>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#travel">Travel</a></li>
                  <li><a href="#contact">Contact</a></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/#about">About</Link></li>
                  <li><Link to="/#skills">Skills</Link></li>
                  <li><Link to="/#projects">Projects</Link></li>
                  <li><Link to="/#travel">Travel</Link></li>
                  <li><Link to="/#contact">Contact</Link></li>
                </>
              )}
            </ul>
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile navigation overlay */}
        <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <ul>
              {location.pathname === '/' ? (
                <>
                  <li>
                    <a href="#home" onClick={closeMobileMenu}>Home</a>
                  </li>
                  <li>
                    <a href="#about" onClick={closeMobileMenu}>About</a>
                  </li>
                  <li>
                    <a href="#skills" onClick={closeMobileMenu}>Skills</a>
                  </li>
                  <li>
                    <a href="#projects" onClick={closeMobileMenu}>Projects</a>
                  </li>
                  <li>
                    <a href="#travel" onClick={closeMobileMenu}>Travel</a>
                  </li>
                  <li>
                    <a href="#contact" onClick={closeMobileMenu}>Contact</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={closeMobileMenu}>Home</Link>
                  </li>
                  <li>
                    <Link to="/#about" onClick={closeMobileMenu}>About</Link>
                  </li>
                  <li>
                    <Link to="/#skills" onClick={closeMobileMenu}>Skills</Link>
                  </li>
                  <li>
                    <Link to="/#projects" onClick={closeMobileMenu}>Projects</Link>
                  </li>
                  <li>
                    <Link to="/#travel" onClick={closeMobileMenu}>Travel</Link>
                  </li>
                  <li>
                    <Link to="/#contact" onClick={closeMobileMenu}>Contact</Link>
                  </li>
                </>
              )}
            </ul>
            <div className="mobile-theme-toggle">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
