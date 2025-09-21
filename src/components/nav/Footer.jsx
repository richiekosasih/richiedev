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
          <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400 font-mono'>
              © 2025 RichieKosasihDev
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400 font-mono'>
              Melbourne: {melbourneTime}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
