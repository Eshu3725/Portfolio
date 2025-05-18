import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Portfolio ',
      description: 'Its a project which tells about myself and my projects',
      image: '/portfolio_bg.jpg',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      github: 'https://github.com/Eshu3725/Portfolio.git'
    },
    {
      id: 2,
      title: 'MindEase ',
      description: 'Its an AI based mood detection and syllabus generation web application which recommend syllabus based on the mood of the Student.',
      image: '/MindEase_bg.jpg',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Fire Base', 'Tailwind CSS' , 'AI/ML/DL'],
      link: '#',
      github: 'https://github.com/Eshu3725/MindEase.git'
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  // Animation variants
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Tilt options
  const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 1000,
    glare: true,
    "max-glare": 0.5,
    perspective: 1000
  };

  return (
    <section id="projects" className="projects">
      <div className="container projects-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2>My Projects</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </motion.div>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          <motion.button
            type="button"
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Web
          </motion.button>
          <motion.button
            type="button"
            className={`filter-btn ${filter === 'app' ? 'active' : ''}`}
            onClick={() => setFilter('app')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apps
          </motion.button>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map(project => (
            <motion.div
              variants={itemVariants}
              key={project.id}
              className="project-card-wrapper"
            >
              <Tilt options={tiltOptions} className="tilt-container">
                <div className={`project-card card-border ${project.id === 2 ? 'mindease-card' : ''}`}>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-links">
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fas fa-external-link-alt"></i> Live Demo
                        </motion.a>
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fab fa-github"></i> GitHub
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech) => (
                        <motion.span
                          className="tech-badge"
                          key={`${project.id}-${tech}`}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: 'var(--primary)',
                            color: 'white'
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
