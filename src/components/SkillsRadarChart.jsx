import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadarChart = ({ theme }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    // Define the skills data
    const programmingSkills = {
      label: 'Programming Languages',
      data: [80, 50, 10, 70],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    };
    
    const frontendSkills = {
      label: 'Frontend Development',
      data: [90, 70, 30, 50, 10],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    };
    
    const backendSkills = {
      label: 'Backend Development',
      data: [10, 10, 50, 10],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgb(255, 206, 86)',
      pointBackgroundColor: 'rgb(255, 206, 86)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 206, 86)'
    };
    
    // Set the chart data
    setChartData({
      labels: [
        'Python', 'JavaScript', 'Flutter', 'C/C++',
        'HTML5', 'CSS3', 'React', 'UI/UX', 'Tailwind',
        'Node.js', 'Express', 'Firebase', 'MongoDB'
      ],
      datasets: [
        {
          ...programmingSkills,
          data: [80, 50, 10, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          ...frontendSkills,
          data: [0, 0, 0, 0, 90, 70, 30, 50, 10, 0, 0, 0, 0]
        },
        {
          ...backendSkills,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 50, 10]
        }
      ]
    });
  }, []);

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          color: isDarkMode ? '#ffffff' : '#232323',
          font: {
            size: 12
          }
        },
        ticks: {
          backdropColor: 'transparent',
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#ffffff' : '#232323',
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? '#ffffff' : '#232323',
        bodyColor: isDarkMode ? '#ffffff' : '#232323',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <motion.div 
      className="skills-radar-chart"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Skills Overview</h3>
      <div className="chart-container">
        <Radar data={chartData} options={chartOptions} />
      </div>
      <p className="chart-description">
        Interactive visualization of my skills across different domains. 
        Hover over data points to see specific skill levels.
      </p>
    </motion.div>
  );
};

export default SkillsRadarChart;
