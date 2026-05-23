import { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';

export default function Footer() {
  const [melbourneTime, setMelbourneTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMelbourneTime(
        now.toLocaleString('en-AU', {
          timeZone: 'Australia/Melbourne',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className='border-t border-black bg-[#f4f2e8] text-black'>
      <Container>
        <div className='flex flex-col items-center justify-between gap-4 py-8 font-mono text-xs uppercase text-black/60 sm:flex-row'>
          <p>(c) 2025 RichieKosasihDev</p>
          <p>Melbourne: {melbourneTime}</p>
        </div>
      </Container>
    </footer>
  );
}
