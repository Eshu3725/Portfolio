const About = () => {
  return (
    <section id="about" className="about">
      <div className="container about-container">
        <div className="section-header">
          <h2>About Me</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Hello i am Eshaan A V , Full Stack developer ,Learning AI/ML currently to scale up my Skills
              I am passionate about creating Inovative projects ideas which can solve the actual real world problems.

              I also love to travel around the world and explore new cultures and places.
              Travelling is one of the best way to learn new things and broaden your horizons.
              Its a way to meet new people and learn new things.
              Its not just an hobby its a thing which keeps me motivated and keeps me going.
            </p>
            <p>
              <b>"LIFE IS BORN TO LIVE NOT TO SURVIVE"</b>
            </p>
            <p>
                                           -Albert Einstein
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-item card-border">
              <span className="stat-number">1.5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item card-border">
              <span className="stat-number">1+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
