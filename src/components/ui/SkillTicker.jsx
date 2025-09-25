import React from 'react';
import { useReducedMotion } from 'framer-motion';

const SkillTicker = ({
  items = [],
  direction = 'left',
  speedSeconds = 24,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Default skills if none provided
  const defaultSkills = [
    'React',
    'JavaScript',
    'Tailwind',
    'Vite',
    'GitHub',
    'Figma',
    'Canva',
    'Framer Motion',
  ];

  const skills = items.length > 0 ? items : defaultSkills;

  // Duplicate items multiple times for seamless infinite loop
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  // CSS animation styles
  const animationStyle = shouldReduceMotion
    ? {}
    : {
        animation: `ticker-${direction} ${speedSeconds}s linear infinite`,
      };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* CSS Keyframes */}
      <style jsx='true'>{`
        @keyframes ticker-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        @keyframes ticker-right {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-content {
            animation: none !important;
          }
        }

        .ticker-content {
          width: max-content;
        }
      `}</style>

      {/* Ticker content */}
      <div
        className={`ticker-content flex items-center gap-4 md:gap-6 whitespace-nowrap ${
          shouldReduceMotion ? 'flex-wrap justify-start' : ''
        }`}
        style={animationStyle}
      >
        {shouldReduceMotion
          ? // Static display for reduced motion
            skills.map((skill, index) => (
              <span
                key={index}
                className='inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full ring-1 ring-black/10 bg-white/70 text-black/80 text-sm md:text-base font-mono tracking-wide'
              >
                {skill}
              </span>
            ))
          : // Animated ticker
            duplicatedSkills.map((skill, index) => (
              <span
                key={index}
                className='inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full ring-1 ring-black/10 bg-white/70 text-black/80 text-sm md:text-base font-mono tracking-wide flex-shrink-0'
              >
                {skill}
              </span>
            ))}
      </div>
    </div>
  );
};

export default SkillTicker;
