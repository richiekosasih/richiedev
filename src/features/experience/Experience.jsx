import React from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import SkillTicker from '@/components/ui/SkillTicker';

const Experience = ({ categories = null }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Subtle parallax effect for background (disabled on mobile for performance)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  // Check if we should disable parallax on mobile
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;

  // Default categories data
  const defaultCategories = [
    {
      dot: 'rose',
      title: 'Web Development',
      items: [
        'Responsive Web Apps',
        'Frontend Development (React, Vite, Tailwind)',
        'UI/UX Implementation',
      ],
    },
    {
      dot: 'emerald',
      title: 'Design & Interaction',
      items: [
        'Wireframing & Prototyping',
        'Motion & Micro-Interaction',
        'Clean Layouts',
      ],
    },
    {
      dot: 'indigo',
      title: 'Tools & Tech',
      items: [
        'React, Tailwind, JavaScript',
        'Git & GitHub, VSCode, Cursor',
        'Figma, Canva, Framer',
      ],
    },
    {
      dot: 'amber',
      title: 'Interests',
      items: [
        'AI Tools & Automation',
        'Gaming & Visual Exploration',
        'Building side projects',
      ],
    },
  ];

  const data = categories || defaultCategories;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const headlineVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      skewY: shouldReduceMotion ? 0 : 2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      skewY: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.035,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const scrollHintVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1,
        delay: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Color mapping for dots
  const dotColors = {
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-500',
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
  };

  return (
    <section
      id='experience'
      className='w-full py-10 md:py-14 lg:py-16 relative bg-white'
      aria-labelledby='experience-title'
    >
      {/* Subtle grid background */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Paper texture overlay */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,0,0,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px, 30px 30px',
        }}
      />

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.25 }}
          className='max-w-7xl mx-auto'
        >
          {/* Header */}
          <div className='text-center mb-8 md:mb-12 lg:mb-16'>
            <motion.div variants={headlineVariants}>
              <div className='text-xs font-mono tracking-wider text-black/60 mb-2 uppercase'>
                EXPERIENCE
              </div>
              <h2
                id='experience-title'
                className='text-4xl md:text-6xl lg:text-7xl font-black text-black mb-4 tracking-tight uppercase'
                style={{ letterSpacing: '-0.02em' }}
              >
                What I do
              </h2>
            </motion.div>

            {/* Animated horizontal line below title */}
            <motion.div
              variants={scrollHintVariants}
              className='w-24 md:w-32 h-px bg-black mx-auto origin-center mt-6'
            />
          </div>

          {/* Main content card */}
          <motion.div
            variants={columnVariants}
            className='rounded-3xl shadow-2xl px-5 py-10 md:px-8 md:py-14 lg:px-12 lg:py-16 relative overflow-hidden'
            style={{
              background: `radial-gradient(ellipse at center, #E9E7E1 0%, #E0DDD7 100%)`,
            }}
          >
            {/* Subtle radial vignette overlay */}
            <div
              className='absolute inset-0 rounded-3xl pointer-events-none'
              style={{
                background: `radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(0,0,0,0.02) 100%)`,
              }}
            />
            {/* Grid content */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 relative'>
              {/* Vertical rules for desktop only */}
              <div className='hidden lg:block absolute inset-0 pointer-events-none'>
                <div className='h-full w-px bg-black/10 absolute left-1/4 transform -translate-x-px'></div>
                <div className='h-full w-px bg-black/10 absolute left-2/4 transform -translate-x-px'></div>
                <div className='h-full w-px bg-black/10 absolute left-3/4 transform -translate-x-px'></div>
              </div>
              {data.map((category, columnIndex) => (
                <motion.div
                  key={columnIndex}
                  variants={columnVariants}
                  className='space-y-4 md:space-y-6 relative z-10'
                >
                  {/* Category header */}
                  <div className='flex items-center space-x-3 mb-4 md:mb-6 min-h-[44px]'>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        dotColors[category.dot] || 'bg-gray-400'
                      }`}
                    />
                    <h3 className='text-base md:text-lg font-black text-black tracking-tight uppercase'>
                      {category.title}
                    </h3>
                  </div>

                  {/* Category items */}
                  <ul className='space-y-2 md:space-y-3'>
                    {category.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        variants={itemVariants}
                        className='font-mono text-[13px] leading-7 md:text-[14px] md:leading-7 tracking-wide text-[#2a2a2a]'
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Horizontal line separator for mobile (hidden on desktop) */}
                  {columnIndex < data.length - 1 && (
                    <div className='md:hidden mt-6 pt-6'>
                      <div className='w-full h-px bg-black/20'></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skill Ticker */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: shouldReduceMotion ? 0.3 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: shouldReduceMotion ? 0 : 0.4,
                },
              },
            }}
            className='mt-8 md:mt-12'
          >
            <SkillTicker
              items={[
                'React',
                'JavaScript',
                'Tailwind',
                'Vite',
                'GitHub',
                'Figma',
                'Canva',
                'Framer Motion',
              ]}
              direction='left'
              speedSeconds={24}
              className='py-4'
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
