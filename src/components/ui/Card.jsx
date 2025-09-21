import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  animate = true,
  ...props
}) => {
  const variantClasses = {
    default:
      'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    outlined: 'border border-gray-200 dark:border-gray-700 bg-transparent',
    elevated:
      'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
    glass:
      'bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20',
  };

  const hoverClasses = hover
    ? 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200'
    : '';

  const classes = `rounded-lg p-6 ${variantClasses[variant]} ${hoverClasses} ${className}`;

  const CardComponent = animate ? motion.div : 'div';
  const motionProps = animate
    ? {
        whileHover: hover ? { y: -2 } : {},
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <CardComponent className={classes} {...motionProps} {...props}>
      {children}
    </CardComponent>
  );
};

export default Card;
