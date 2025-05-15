import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import SkillsRadarChart from './SkillsRadarChart';

const Skills = () => {
  // Get theme from context
  const { theme } = useContext(ThemeContext);
  // State to track which skill is being hovered
  const [activeSkill, setActiveSkill] = useState(null);

  // Categorized skills with proficiency levels and descriptions
  const skillCategories = {
    programmingLanguages: [
      {
        name: 'Python',
        level: 80,
        icon: 'fab fa-python',
        color: '#3776AB',
        description: 'Proficient in Python for data analysis, automation, and backend development.'
      },
      {
        name: 'JavaScript',
        level: 50,
        icon: 'fab fa-js',
        color: '#F7DF1E',
        description: 'Experience with modern JavaScript for web development and interactive applications.'
      },
      {
        name: 'Flutter',
        level: 10,
        icon: 'fas fa-mobile-alt',
        color: '#02569B',
        description: 'Beginning to explore Flutter for cross-platform mobile app development.'
      },
      {
        name: 'C/C++',
        level: 70,
        icon: 'fas fa-code',
        color: '#00599C',
        description: 'Strong foundation in C/C++ for system programming and algorithm implementation.'
      }
    ],
    backend: [
      {
        name: 'Node.js',
        level: 10,
        icon: 'fab fa-node-js',
        color: '#339933',
        description: 'Starting to build server-side applications with Node.js.'
      },
      {
        name: 'Express',
        level: 10,
        icon: 'fas fa-server',
        color: '#000000',
        description: 'Learning to create RESTful APIs using Express framework.'
      },
      {
        name: 'Firebase',
        level: 50,
        icon: 'fas fa-fire',
        color: '#FFCA28',
        description: 'Experience with Firebase for authentication, database, and hosting.'
      },
      {
        name: 'MongoDB',
        level: 10,
        icon: 'fas fa-database',
        color: '#47A248',
        description: 'Beginning to work with MongoDB for NoSQL database solutions.'
      }
    ],
    frontend: [
      {
        name: 'HTML5',
        level: 90,
        icon: 'fab fa-html5',
        color: '#E34F26',
        description: 'Expert in HTML5 for structuring web content and applications.'
      },
      {
        name: 'CSS3',
        level: 70,
        icon: 'fab fa-css3-alt',
        color: '#1572B6',
        description: 'Strong skills in CSS3 for styling and responsive design.'
      },
      {
        name: 'React',
        level: 30,
        icon: 'fab fa-react',
        color: '#61DAFB',
        description: 'Building interactive UIs with React and its ecosystem.'
      },
      {
        name: 'UI/UX Design',
        level: 50,
        icon: 'fas fa-paint-brush',
        color: '#FF7F50',
        description: 'Creating user-centered designs with focus on usability and aesthetics.'
      },
      {
        name: 'Tailwind CSS',
        level: 10,
        icon: 'fab fa-css3',
        color: '#38B2AC',
        description: 'Starting to use Tailwind CSS for utility-first styling approach.'
      }
    ],
    tools: [
      {
        name: 'Git',
        level: 80,
        icon: 'fab fa-git-alt',
        color: '#F05032',
        description: 'Proficient with Git for version control and collaboration.'
      },
      {
        name: 'Android Studio',
        level: 90,
        icon: 'fab fa-android',
        color: '#3DDC84',
        description: 'Expert in using Android Studio for mobile app development.'
      },
      {
        name: 'AI/ML',
        level: 20,
        icon: 'fas fa-brain',
        color: '#9C27B0',
        description: 'Exploring artificial intelligence and machine learning concepts.'
      },
      {
        name: 'TensorFlow',
        level: 10,
        icon: 'fas fa-cogs',
        color: '#FF6F00',
        description: 'Beginning to implement machine learning models with TensorFlow.'
      },
      {
        name: 'Scikit-learn',
        level: 10,
        icon: 'fas fa-chart-line',
        color: '#F7931E',
        description: 'Learning to use Scikit-learn for data analysis and modeling.'
      }
    ]
  };

  // Category titles with icons and descriptions
  const categoryTitles = {
    programmingLanguages: {
      title: 'Programming Languages',
      icon: 'fa-code',
      description: 'Core programming languages I use to build software solutions.'
    },
    frontend: {
      title: 'Frontend Development',
      icon: 'fa-laptop-code',
      description: 'Technologies I use to create responsive and interactive user interfaces.'
    },
    backend: {
      title: 'Backend Development',
      icon: 'fa-server',
      description: 'Tools and frameworks I use for server-side application development.'
    },
    tools: {
      title: 'Tools & Technologies',
      icon: 'fa-tools',
      description: 'Additional technologies and tools I use in my development workflow.'
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const skillCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="skills" className="skills">
      <div className="container skills-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Skills & Technologies</h2>
          <div className="section-divider">
            <span className="section-line" />
          </div>
        </motion.div>

        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Render each skill category */}
          {Object.keys(skillCategories).map((category) => (
            <motion.div
              className="skill-category"
              key={category}
              variants={categoryVariants}
            >
              <div className="category-header">
                <i className={`fas ${categoryTitles[category].icon} category-icon`} />
                <div className="category-title-container">
                  <h3>{categoryTitles[category].title}</h3>
                  <p className="category-description">{categoryTitles[category].description}</p>
                </div>
              </div>

              {/* Modern skill cards for this category */}
              <div className="skill-cards">
                {skillCategories[category].map((skill) => (
                  <motion.div
                    className={`skill-card ${activeSkill === `${category}-${skill.name}` ? 'active' : ''}`}
                    key={`${category}-${skill.name}`}
                    variants={skillCardVariants}
                    whileHover="hover"
                    onMouseEnter={() => setActiveSkill(`${category}-${skill.name}`)}
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <div className="skill-card-header" style={{ backgroundColor: `${skill.color}20` }}>
                      <i className={`${skill.icon} skill-icon`} style={{ color: skill.color }} />
                      <h4 className="skill-name">{skill.name}</h4>
                    </div>

                    <div className="skill-card-body">
                      <div className="skill-level-container">
                        <div className="skill-level-bar">
                          <motion.div
                            className="skill-level-fill"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                          />
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>

                      <p className="skill-description">{skill.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Interactive Skills Radar Chart */}
          <motion.div
            className="skills-radar-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="section-subheader">
              <h3>Interactive Skills Visualization</h3>
              <p>Explore my skills across different domains in this interactive chart. Hover over data points for details.</p>
            </div>
            <SkillsRadarChart theme={theme} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
