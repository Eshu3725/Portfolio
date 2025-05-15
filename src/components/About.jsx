import { motion } from 'framer-motion';

const About = () => {
  // Timeline data
  const timelineItems = [
    {
      year: "2023",
      title: "Started Learning Web Development",
      description: "Began my journey in web development, focusing on HTML, CSS, and JavaScript fundamentals."
    },
    {
      year: "2023",
      title: "First Project: Portfolio Website",
      description: "Created my first complete web project - a personal portfolio website using React."
    },
    {
      year: "2024",
      title: "Expanded to Full Stack Development",
      description: "Started learning backend technologies including Node.js, Express, and MongoDB."
    },
    {
      year: "2024",
      title: "Exploring AI/ML",
      description: "Currently expanding my skills into AI and Machine Learning to create more innovative solutions."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="about" className="about">
      <div className="container about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="about-intro" variants={itemVariants}>
              <h3>Hello, I'm <span className="accent-text">Eshaan A V</span></h3>
              <p className="about-tagline">
                A passionate Full Stack Developer with a focus on creating innovative solutions to real-world problems.
              </p>
              <p>
                I'm currently expanding my skills in AI/ML to develop more intelligent and impactful applications.
                My approach combines technical expertise with creative problem-solving to build seamless digital experiences.
              </p>
              <p>
                Beyond coding, I love traveling and exploring new cultures. Traveling isn't just a hobby—it's a way to gain
                new perspectives, meet diverse people, and find inspiration that fuels my creativity and motivation.
              </p>
              <div className="quote-container">
                <p className="quote">
                  <i className="fas fa-quote-left quote-icon"></i>
                  <span>"LIFE IS BORN TO LIVE NOT TO SURVIVE"</span>
                  <i className="fas fa-quote-right quote-icon"></i>
                </p>
                <p className="quote-author">- Albert Einstein</p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-container"
              variants={itemVariants}
            >
              <h3>My Journey</h3>
              <div className="timeline">
                {timelineItems.map((item, index) => (
                  <motion.div
                    className="timeline-item"
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <div className="timeline-marker"></div>
                    <div className="timeline-content card-border">
                      <span className="timeline-year">{item.year}</span>
                      <h4 className="timeline-title">{item.title}</h4>
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-stats"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="stat-item card-border"
              variants={statVariants}
              whileHover="hover"
            >
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <span className="stat-number">1.5+</span>
              <span className="stat-label">Years Experience</span>
            </motion.div>

            <motion.div
              className="stat-item card-border"
              variants={statVariants}
              whileHover="hover"
            >
              <div className="stat-icon">
                <i className="fas fa-code-branch"></i>
              </div>
              <span className="stat-number">1+</span>
              <span className="stat-label">Projects Completed</span>
            </motion.div>

            <motion.div
              className="stat-item card-border"
              variants={statVariants}
              whileHover="hover"
            >
              <div className="stat-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <span className="stat-number">4+</span>
              <span className="stat-label">Technologies</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
