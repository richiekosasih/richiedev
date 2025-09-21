import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import { slideUp } from '@/lib/motion';

const Section = ({
  children,
  title,
  subtitle,
  id,
  className = '',
  containerSize = 'default',
  background = 'default',
  animate = true,
  ...props
}) => {
  const backgroundClasses = {
    default: '',
    gray: 'bg-gray-50 dark:bg-gray-900/50',
    white: 'bg-white dark:bg-gray-900',
    transparent: 'bg-transparent',
  };

  const sectionClasses = `py-16 sm:py-20 ${backgroundClasses[background]} ${className}`;

  const SectionComponent = animate ? motion.section : 'section';
  const motionProps = animate ? slideUp : {};

  return (
    <SectionComponent
      id={id}
      className={sectionClasses}
      {...motionProps}
      {...props}
    >
      <Container size={containerSize}>
        {(title || subtitle) && (
          <div className='text-center mb-12'>
            {title && (
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </SectionComponent>
  );
};

export default Section;
