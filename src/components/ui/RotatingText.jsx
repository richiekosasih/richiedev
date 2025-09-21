import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText = ({ texts = [], interval = 3000, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  if (texts.length === 0) return null;

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode='wait'>
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className='block'
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
