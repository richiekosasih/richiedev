import React, { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';

const Footer = () => {
  const [melbourneTime, setMelbourneTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const melbourneTime = now.toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setMelbourneTime(melbourneTime);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
      <Container>
        <div className='py-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
            <p className='text-sm text-gray-600 dark:text-gray-400 font-mono text-center sm:text-left'>
              © 2025 RichieKosasihDev
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400 font-mono text-center sm:text-right'>
              Melbourne: {melbourneTime}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
