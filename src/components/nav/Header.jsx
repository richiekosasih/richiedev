import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RotatingText from '@/components/ui/RotatingText';
import StaggeredMenu from '@/components/ui/StaggeredMenu';
import LogoR from '@/assets/images/LogoR.svg';
import { usePreloader } from '@/app/providers/PreloaderProvider';

const Header = () => {
  const { restart } = usePreloader();

  const handleLogoClick = () => {
    restart();
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    console.log('scrollToSection called with:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('Element found:', element);
    if (element) {
      // Simple scroll with offset for fixed header
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth',
      });
      console.log('Scrolling to:', sectionId, 'at position:', elementPosition);
    } else {
      console.error('Element not found with ID:', sectionId);
    }
  };
  const menuItems = [
    { label: 'Home', ariaLabel: 'Home page', link: '#home' },
    { label: 'About', ariaLabel: 'About me', link: '#about' },
    { label: 'Experience', ariaLabel: 'Experience', link: '#experience' },
    { label: 'Projects', ariaLabel: 'Projects', link: '#projects' },
    { label: 'Contact', ariaLabel: 'Contact me', link: '#contact' },
  ];

  const socialItems = [
    {
      label: 'Instagram',
      link: 'https://instagram.com/richie_kosasih',
      hoverColor: '#FA58B6',
    },
    {
      label: 'GitHub',
      link: 'https://github.com/richiekosasih',
      hoverColor: '#B33791',
    },
    {
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/richiekosasih',
      hoverColor: '#476EAE',
    },
    {
      label: 'Resume',
      link: '/Resume_RichieKosasih.pdf',
      hoverColor: '#EF7722',
    },
  ];

  const professions = [
    'Frontend Developer',
    'UI/UX Designer',
    'AI Enthusiast',
    'Coding with Coffee',
  ];

  return (
    <>
      {/* Mobile header background - only visible on mobile */}
      <div className='md:hidden fixed top-0 left-0 w-full h-20 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-[35]' />

      {/* Mobile Logo Only */}
      <div className='md:hidden fixed top-4 left-4 z-[50] pointer-events-auto'>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='text-white cursor-pointer flex items-center gap-3'
          onClick={handleLogoClick}
        >
          <img src={LogoR} alt='Richie Kosasih Logo' className='w-8 h-8' />
        </motion.div>
      </div>

      {/* Desktop Header Bar - Logo + Navigation + Resume */}
      <div className='hidden md:block fixed top-0 left-0 w-full z-[50] pointer-events-auto bg-black/50 backdrop-blur-sm'>
        <div className='relative flex items-center px-5 md:px-8 py-4'>
          {/* Left: Logo + Profession */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='text-white cursor-pointer flex items-center gap-3'
            onClick={handleLogoClick}
          >
            <img
              src={LogoR}
              alt='Richie Kosasih Logo'
              className='w-8 h-8 md:w-10 md:h-10'
            />
            <div className='hidden md:block'>
              <div className='text-sm text-white font-mono tracking-wide'>
                <RotatingText texts={professions} interval={2500} />
              </div>
            </div>
          </motion.div>

          {/* Center: Desktop Navigation - Absolutely centered */}
          <nav className='hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2'>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Home clicked - starting scroll to home section');
                console.log('Current URL:', window.location.href);
                console.log('Current pathname:', window.location.pathname);
                scrollToSection('home');
              }}
              className='text-[10px] md:text-xs tracking-widest text-white font-black font-mono uppercase hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-1'
            >
              [ Home ]
            </button>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('About clicked');
                scrollToSection('about');
              }}
              className='text-[10px] md:text-xs tracking-widest text-white font-black font-mono uppercase hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-1'
            >
              [ About Me ]
            </button>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Experience clicked');
                scrollToSection('experience');
              }}
              className='text-[10px] md:text-xs tracking-widest text-white font-black font-mono uppercase hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-1'
            >
              [ Experience ]
            </button>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Projects clicked');
                scrollToSection('projects');
              }}
              className='text-[10px] md:text-xs tracking-widest text-white font-black font-mono uppercase hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-1'
            >
              [ Projects ]
            </button>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Contact clicked');
                scrollToSection('contact');
              }}
              className='text-[10px] md:text-xs tracking-widest text-white font-black font-mono uppercase hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-1'
            >
              [ Contact Me ]
            </button>
          </nav>

          {/* Right: Resume Link */}
          <div className='hidden md:block ml-auto'>
            <a
              href='/Resume_RichieKosasih.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[10px] md:text-xs tracking-widest text-white font-black font-mono uppercase hover:text-gray-300 transition-colors px-4 py-2 border border-white/30 rounded-md hover:border-white/50 hover:bg-white/10'
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* StaggeredMenu - Mobile Only */}
      <div
        className='md:hidden fixed top-0 left-0 w-full h-screen z-[40]'
        style={{ pointerEvents: 'none' }}
      >
        <StaggeredMenu
          position='right'
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor='#fff'
          openMenuButtonColor='#000'
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF']}
          accentColor='#ff6b6b'
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </>
  );
};

export default Header;
