import React from 'react';

const SkipToContent = () => {
  return (
    <a
      href='#content'
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200'
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
