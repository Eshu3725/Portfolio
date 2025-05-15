import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// TypeWriter effect component
const TypeWriter = ({ texts, speed = 100, delay = 1000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentFullText = texts[currentTextIndex];

      if (!isDeleting) {
        // Typing
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        setTypingSpeed(speed);

        if (currentText === currentFullText) {
          // Finished typing, wait before deleting
          setIsDeleting(true);
          setTypingSpeed(delay);
        }
      } else {
        // Deleting
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        setTypingSpeed(speed / 2);

        if (currentText === '') {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, delay, typingSpeed]);

  return (
    <span className="typewriter">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

const Hero = () => {
  // Skills to display in the typewriter effect
  const skills = [
    "Web Developer",
    "UI/UX Designer",
    "Full Stack Developer",
    "AI/ML Enthusiast"
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 0.5,
        boxShadow: { duration: 0.3 },
        rotate: { repeat: Infinity, repeatType: "mirror", duration: 2 }
      }
    }
  };

  return (
    <section id="home" className="hero">
      {/* Animated background */}
      <div className="hero-background">
        <div className="gradient-bg"></div>
        <div className="particles"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>
            Eshaan A V
          </motion.h1>

          <motion.h2 variants={itemVariants} className="typewriter-container">
            I'm a <TypeWriter texts={skills} speed={100} delay={2000} />
          </motion.h2>

          <motion.p
            className="hero-description"
            variants={itemVariants}
          >
            Creating <span className="accent-text">innovative</span> digital experiences
            with <span className="accent-text">modern</span> technologies
          </motion.p>

          <motion.div
            className="hero-cta"
            variants={containerVariants}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary"
              variants={buttonVariants}
              whileHover="hover"
            >
              View My Work
            </motion.a>

            <motion.a
              href="#contact"
              className="btn btn-secondary"
              variants={buttonVariants}
              whileHover="hover"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <div className="profile-image">
            <img src="/port_pic.jpg" alt="Eshaan A V" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
          transition: {
            opacity: { delay: 1.5, duration: 1 },
            y: { repeat: Infinity, duration: 1.5 }
          }
        }}
      >
        <div className="mouse">
          <div className="wheel" />
        </div>
        <div>
          <span className="scroll-arrow" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
