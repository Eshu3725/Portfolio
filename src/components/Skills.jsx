const Skills = () => {
  const skills = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 60 },
    { name: 'JavaScript', level: 30 },
    { name: 'React', level: 20 },
    { name: 'Node.js', level: 20 },
    { name: 'UI/UX Design', level: 30 },
    { name: 'Responsive Design', level: 30 },
    { name: 'Git', level: 90 }
  ];

  const technologies = [
    'React', 'Next.js', 'Vue.js', 'Node.js', 'Express',
    'MongoDB', 'PostgreSQL', 'Firebase', 'Tailwind CSS',
    'SASS', 'Redux', 'GraphQL', 'REST API', 'Figma',
    'Adobe XD', 'Webpack', 'Jest', 'GitHub'
  ];

  return (
    <section id="skills" className="skills">
      <div className="container skills-container">
        <div className="section-header">
          <h2>Skills & Technologies</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </div>

        <div className="skills-content">
          <div className="skill-bars">
            {skills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-level"
                    style={{ width: `${skill.level}%` }}
                    data-level={skill.level}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="technologies">
            <h3>Technologies I Work With</h3>
            <div className="tech-tags">
              {technologies.map((tech, index) => (
                <span className="tech-tag" key={index}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
