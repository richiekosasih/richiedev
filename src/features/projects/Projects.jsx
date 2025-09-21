import React, { useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Github,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import MotionSection from '@/components/ui/MotionSection';
import projectImage1 from '@/assets/images/ProjectPhoto/projectrichiedev.jpg';
import inProgressImage from '@/assets/images/ProjectPhoto/InProgress.jpg';

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  // Touch and mouse handlers for mobile swipe
  const handleTouchStart = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsSwiping(false);
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    console.log('Touch swipe:', { distance, isLeftSwipe, isRightSwipe });

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  // Mouse handlers for desktop simulation
  const handleMouseDown = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsSwiping(true);
  };

  const handleMouseMove = (e) => {
    if (!isSwiping) return;
    e.preventDefault();
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsSwiping(false);
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    console.log('Mouse swipe:', { distance, isLeftSwipe, isRightSwipe });

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  // Global mouse event listeners for desktop simulation
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isSwiping) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = (e) => {
      if (isSwiping) {
        handleMouseUp(e);
      }
    };

    if (isSwiping) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isSwiping, touchStart, touchEnd]);

  const projects = [
    {
      id: 1,
      title: ' This Website',
      description:
        'Modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, and optimized performance for both desktop and mobile.',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      github: 'https://github.com/richiekosasih/portfolio',
      demo: 'https://richiekosasih.com',
      status: 'In Development',
      statusDescription: 'Currently working on this project',
      featured: true,
      preview: projectImage1,
    },
    {
      id: 2,
      title: 'Cybersecurity Assessment Tool',
      description:
        'Web-based security assessment dashboard for analyzing network vulnerabilities and access control policies. Built as part of IT coursework.',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Node.js', 'Security APIs', 'Chart.js'],
      github: '#',
      demo: '#',
      status: 'Concept',
      statusDescription: 'Planning and design phase',
      featured: false,
      preview: inProgressImage,
    },
    {
      id: 3,
      title: 'AI-Powered Code Assistant',
      description:
        'Exploring AI integration in web development through a code suggestion and optimization tool. Focuses on improving developer productivity.',
      image: '/api/placeholder/400/250',
      tech: ['React', 'TypeScript', 'AI APIs', 'Monaco Editor'],
      github: '#',
      demo: '#',
      status: 'Planning',
      statusDescription: 'In early planning stages',
      featured: false,
      preview: inProgressImage,
    },
    {
      id: 4,
      title: 'Responsive E-Commerce UI',
      description:
        'Modern e-commerce interface design with focus on user experience, accessibility, and mobile-first approach. Clean and intuitive shopping experience.',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Stripe API'],
      github: '#',
      demo: '#',
      status: 'Concept',
      statusDescription: 'Planning and design phase',
      featured: false,
      preview: inProgressImage,
    },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Section id='projects' className='relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-stone-500/5 to-neutral-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      {/* Enhanced Header */}
      <motion.div
        className='text-center mb-16'
        variants={titleVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className='mb-4'
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className='text-sm font-mono text-gray-400 uppercase tracking-wider'>
            Projects
          </span>
        </motion.div>

        <h2
          className='text-[40px] leading-none sm:text-[50px] sm:leading-none lg:text-[120px] lg:leading-none font-black tracking-tight uppercase text-white mb-4'
          style={{ letterSpacing: '-0.02em' }}
        >
          WHAT I BUILT
        </h2>

        <div className='w-16 h-0.5 bg-white mx-auto mb-8 sm:mb-12'></div>
      </motion.div>

      {/* Mobile Grid Layout - Show All Projects */}
      <div className='lg:hidden mb-16'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 gap-8'
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className='relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl border border-stone-300/40 overflow-hidden group'
            >
              {/* Project Image */}
              <div className='relative h-48 sm:h-56'>
                <img
                  src={project.preview}
                  alt={project.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

                {/* Project Title Overlay */}
                <div className='absolute bottom-4 left-4 right-4'>
                  <h3 className='text-white font-black text-xl tracking-tight'>
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Info */}
              <div className='p-6 space-y-4'>
                {/* Description */}
                <p className='text-gray-300 text-sm leading-6 font-mono'>
                  {project.description}
                </p>

                {/* Status */}
                <div className='flex items-center justify-between'>
                  <div>
                    <span className='text-white font-mono text-sm font-semibold'>
                      {project.status}
                    </span>
                    <p className='text-gray-400 font-mono text-xs mt-1'>
                      {project.statusDescription}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className='flex flex-wrap gap-2'>
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className='px-2 py-1 text-xs font-mono bg-white/10 text-white rounded-full border border-white/20'
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <div className='pt-2'>
                  {project.github !== '#' ? (
                    <motion.a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm font-mono'
                      >
                        <Github className='w-4 h-4 mr-2' />
                        VIEW PROJECT
                      </Button>
                    </motion.a>
                  ) : (
                    <Button
                      variant='outline'
                      size='sm'
                      disabled
                      className='w-full bg-transparent border-2 border-white/20 text-white/50 cursor-not-allowed backdrop-blur-sm font-mono'
                    >
                      <Github className='w-4 h-4 mr-2' />
                      COMING SOON
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Layout - Single Project with Navigation */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        className='hidden lg:grid lg:grid-cols-2 gap-12 mb-16 min-h-[600px]'
      >
        {/* Project Info - Desktop */}
        <motion.div
          variants={cardVariants}
          className='flex flex-col justify-center space-y-8 relative'
        >
          {/* Beige accent box */}
          <div className='absolute -left-4 -top-4 w-32 h-32 bg-amber-100/20 rounded-2xl blur-sm'></div>
          <div className='absolute -right-8 -bottom-8 w-24 h-24 bg-amber-200/30 rounded-xl blur-sm'></div>
          <div className='space-y-6'>
            {/* Project Title */}
            <motion.h3
              className='text-5xl font-black text-white tracking-tight'
              key={currentProjectIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {projects[currentProjectIndex].title}
            </motion.h3>

            {/* Project Description */}
            <motion.p
              className='text-lg text-gray-300 leading-7 tracking-wide font-mono'
              key={`desc-${currentProjectIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {projects[currentProjectIndex].description}
            </motion.p>

            {/* Divider Line with Beige Accent */}
            <div className='relative'>
              <div className='w-20 h-1 bg-amber-200/40 rounded-full'></div>
              <div className='absolute top-0 left-0 w-16 h-0.5 bg-white rounded-full'></div>
            </div>

            {/* Project Status */}
            <motion.div
              key={`status-${currentProjectIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className='text-lg font-mono text-white'>
                {projects[currentProjectIndex].status}
              </span>
              <p className='text-sm text-gray-400 font-mono mt-1'>
                {projects[currentProjectIndex].statusDescription}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className='relative p-4 bg-amber-100/10 rounded-2xl border border-amber-200/20'
              key={`tech-${currentProjectIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className='flex flex-wrap gap-2'>
                {projects[currentProjectIndex].tech.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className='px-3 py-1 text-xs font-mono bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Project Links */}
          <motion.div
            className='flex items-center space-x-4'
            key={`links-${currentProjectIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {projects[currentProjectIndex].github !== '#' ? (
              <motion.a
                href={projects[currentProjectIndex].github}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant='outline'
                  size='lg'
                  className='flex items-center space-x-2 bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm font-mono px-6 py-3'
                >
                  <Github className='w-5 h-5' />
                  <span>VIEW PROJECT</span>
                </Button>
              </motion.a>
            ) : (
              <Button
                variant='outline'
                size='lg'
                disabled
                className='flex items-center space-x-2 bg-transparent border-2 border-white/20 text-white/50 cursor-not-allowed backdrop-blur-sm font-mono px-6 py-3'
              >
                <Github className='w-5 h-5' />
                <span>COMING SOON</span>
              </Button>
            )}
          </motion.div>

          {/* Project Counter */}
          <motion.div
            className='text-sm text-gray-400 font-mono'
            key={`counter-${currentProjectIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {currentProjectIndex + 1} of {projects.length} projects
          </motion.div>
        </motion.div>

        {/* Project Visual - Desktop */}
        <motion.div
          variants={cardVariants}
          className='relative flex items-center justify-center'
        >
          {/* Beige accent elements */}
          <div className='absolute -top-8 -right-4 w-20 h-20 bg-stone-300/15 rounded-3xl blur-sm'></div>
          <div className='absolute -bottom-6 -left-6 w-16 h-16 bg-stone-400/20 rounded-2xl blur-sm'></div>
          <motion.div
            className='relative w-full max-w-md h-96 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm flex items-center justify-center border-2 border-stone-300/40 cursor-pointer group overflow-hidden'
            key={`visual-${currentProjectIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.02,
              borderColor: 'rgba(180, 83, 9, 0.4)',
              boxShadow: '0 0 20px rgba(180, 83, 9, 0.15)',
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              hover: { duration: 0.3 },
            }}
          >
            {/* Project Preview Image */}
            <div className='relative w-full h-full'>
              {/* Preview Image */}
              <motion.img
                src={projects[currentProjectIndex].preview}
                alt={projects[currentProjectIndex].title}
                className='w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500'
                key={`preview-${currentProjectIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                loading='lazy'
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />

              {/* Fallback when image fails to load */}
              <div className='absolute inset-0 bg-gradient-to-br from-gray-700/60 to-gray-800/80 rounded-xl items-center justify-center hidden'>
                <div className='text-center'>
                  <div className='text-white font-black text-lg tracking-tight'>
                    {projects[currentProjectIndex].title}
                  </div>
                </div>
              </div>

              {/* Overlay Gradient */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl'></div>

              {/* Project Title Overlay */}
              <div className='absolute bottom-4 left-4 right-4'>
                <div className='text-white font-black text-lg tracking-tight group-hover:text-stone-200 transition-colors duration-300'>
                  {projects[currentProjectIndex].title
                    .split(' ')
                    .map((word, index) => (
                      <div
                        key={index}
                        className='group-hover:translate-y-[-2px] transition-transform duration-300'
                        style={{ transitionDelay: `${index * 0.05}s` }}
                      >
                        {word}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation Buttons - Desktop Only */}
      <motion.div
        className='hidden lg:flex items-center justify-center space-x-4 mb-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.button
          onClick={prevProject}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300'
        >
          <ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6' />
        </motion.button>

        <div className='flex space-x-1.5 sm:space-x-2'>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProjectIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentProjectIndex
                  ? 'bg-orange-400'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        <motion.button
          onClick={nextProject}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300'
        >
          <ChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
        </motion.button>
      </motion.div>
    </Section>
  );
};

export default Projects;
