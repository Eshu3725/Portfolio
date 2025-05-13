import { useState } from 'react';

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
      github: '#'
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

  return (
    <section id="projects" className="projects">
      <div className="container projects-container">
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </div>

        <div className="project-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web
          </button>
          <button
            className={`filter-btn ${filter === 'app' ? 'active' : ''}`}
            onClick={() => setFilter('app')}
          >
            Apps
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div className="project-card card-border" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-badge" key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
