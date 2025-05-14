import { useEffect, useRef } from 'react';

const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Simple animation for the title
    const title = titleRef.current;
    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(20px)';

      setTimeout(() => {
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content" ref={titleRef}>
          <h1>Eshaan A V</h1>
          <h2>Web Developer & Designer</h2>
          <p className="hero-description">
            Creating <span className="accent-text">professional</span> digital experiences with code
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-image">
            <img src="/port_pic.jpg" alt="Eshaan A V" />
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="mouse">
          <div className="wheel" />
        </div>
        <div>
          <span className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
