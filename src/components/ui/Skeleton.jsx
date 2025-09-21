import React from 'react';

const Skeleton = ({ className = '', variant = 'default', ...props }) => {
  const variantClasses = {
    default: 'bg-gray-200 dark:bg-gray-700',
    text: 'bg-gray-200 dark:bg-gray-700 h-4 rounded',
    circle: 'bg-gray-200 dark:bg-gray-700 rounded-full',
    rectangular: 'bg-gray-200 dark:bg-gray-700 rounded-md',
  };

  const classes = `animate-pulse ${variantClasses[variant]} ${className}`;

  return <div className={classes} {...props} />;
};

export default Skeleton;
export { Skeleton };
