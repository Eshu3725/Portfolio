const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="accent-text">Eshaan A V</span>
          </div>

          <div className="footer-links">
            <div className="footer-nav">
              <h3>Navigation</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-social">
              <h3>Connect</h3>
              <div className="social-icons">
                <a href="https://github.com/Eshu3725" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/eshaan-a-v-62068028a/" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://x.com/Eshaan9320" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://dribbble.com/Eshu3725" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-dribbble"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Eshaan A V. All Rights Reserved.</p>
          <p>Designed with <span className="heart">❤</span> and code</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
