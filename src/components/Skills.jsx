const Skills = () => {
  // Categorized skills with proficiency levels
  const skillCategories = {
    programmingLanguages: [
      { name: 'Python', level: 80 },
      { name: 'JavaScript', level: 50 },
      { name: 'Flutter', level: 10 },
      { name: 'C/C++', level: 70 }
    ],
    backend: [
      { name: 'Node.js', level: 10 },
      { name: 'Express', level: 10 },
      { name: 'Firebase', level: 50 },
      { name: 'MongoDB', level: 10 }
    ],
    frontend: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 70 },
      { name: 'React', level: 30 },
      { name: 'UI/UX Design', level: 50 },
      { name: 'Tailwind CSS', level: 10 }
    ],
    tools: [
      { name: 'Git', level: 80 },
      { name: 'Android Studio', level: 90 },
      { name: 'AI/ML', level: 20 },
      { name: 'TensorFlow', level: 10 },
      { name: 'Scikit-learn', level: 10 }
    ]
  };

  // Technologies by category for the tags
  const technologies = {
    programmingLanguages: ['Python', 'Java Script', 'Flutter', 'C/C++'],
    frontend: ['HTML5', 'CSS3', 'React', 'Tailwind CSS', 'Responsive Design'],
    backend: ['Node.js', 'Express', 'Firebase', 'MongoDB'],
    tools: ['Git', 'VS Code', 'Android Studio', 'Flutter', 'AI/ML','sklearn','Tensorflow']
  };

  // Category titles with icons
  const categoryTitles = {
    programmingLanguages: { title: 'Programming Languages', icon: 'fa-code' },
    frontend: { title: 'Frontend Development', icon: 'fa-laptop-code' },
    backend: { title: 'Backend Development', icon: 'fa-server' },
    tools: { title: 'Tools & Technologies', icon: 'fa-tools' }
  };

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
          {/* Render each skill category */}
          {Object.keys(skillCategories).map((category) => (
            <div className="skill-category" key={category}>
              <div className="category-header">
                <i className={`fas ${categoryTitles[category].icon} category-icon`} />
                <h3>{categoryTitles[category].title}</h3>
              </div>

              {/* Skill bars for this category */}
              <div className="skill-bars">
                {skillCategories[category].map((skill) => (
                  <div className="skill-item" key={`${category}-${skill.name}`}>
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

              {/* Technology tags for this category */}
              <div className="tech-tags">
                {technologies[category].map((tech) => (
                  <span className="tech-tag" key={`${category}-tag-${tech}`}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
