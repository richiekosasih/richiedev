import React from 'react';

const Container = ({
  children,
  size = 'default',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  const classes = `mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;
