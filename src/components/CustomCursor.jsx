import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .social-link').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      opacity: hidden ? 0 : 1,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      scale: 0.8,
      opacity: hidden ? 0 : 1,
    },
    hovered: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      opacity: hidden ? 0 : 0.6,
      backgroundColor: 'rgba(229, 57, 53, 0.3)',
      mixBlendMode: 'difference',
    }
  };

  const dotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      opacity: hidden ? 0 : 1,
    },
    clicked: {
      x: position.x - 4,
      y: position.y - 4,
      scale: 0.5,
      opacity: hidden ? 0 : 1,
    },
    hovered: {
      x: position.x - 4,
      y: position.y - 4,
      opacity: 0,
    }
  };

  return (
    <>
      <motion.div
        className="cursor-ring"
        variants={cursorVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      <motion.div
        className="cursor-dot"
        variants={dotVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 28,
          mass: 0.2
        }}
      />
    </>
  );
};

export default CustomCursor;
