import { motion, useScroll, useSpring } from 'framer-motion';
import RotatingText from '@/components/ui/RotatingText';
import StaggeredMenu from '@/components/ui/StaggeredMenu';
import LogoR from '@/assets/images/LogoR.svg';
import { usePreloader } from '@/app/providers/PreloaderProvider';

const navItems = [
  { label: 'Home', ariaLabel: 'Home', link: '#home' },
  { label: 'Signals', ariaLabel: 'Recruiter signals', link: '#career' },
  { label: 'About', ariaLabel: 'About me', link: '#about' },
  { label: 'Skills', ariaLabel: 'Capabilities and skills', link: '#experience' },
  { label: 'Work', ariaLabel: 'Selected projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Contact me', link: '#contact' },
];

const socialItems = [
  {
    label: 'GitHub',
    link: 'https://github.com/richiekosasih',
    hoverColor: '#111111',
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/richiekosasih',
    hoverColor: '#111111',
  },
  {
    label: 'Resume',
    link: '/RichiePKosasih_Resume.pdf',
    hoverColor: '#111111',
  },
];

const professions = [
  'Frontend Developer',
  'ICT Support',
  'Business Systems',
  'React Builder',
];

export default function Header() {
  const { restart } = usePreloader();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  const scrollToSection = (link) => {
    const sectionId = link.replace('#', '');
    const element = document.getElementById(sectionId);

    if (!element) return;

    const headerOffset = window.innerWidth >= 768 ? 88 : 72;
    const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    });
  };

  return (
    <>
      <header className='fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 text-white backdrop-blur-md'>
        <motion.div
          aria-hidden='true'
          className='absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#f4f2e8]'
          style={{ scaleX: progress }}
        />
        <div className='flex h-20 items-center px-4 sm:px-6 md:px-8'>
          <motion.button
            type='button'
            whileHover={{ scale: 1.02 }}
            onClick={restart}
            className='flex items-center gap-3 text-left'
            aria-label='Replay intro'
          >
            <img
              src={LogoR}
              alt='Richie Kosasih logo'
              className='h-9 w-9 md:h-10 md:w-10'
            />
            <span className='hidden font-mono text-xs md:block'>
              <RotatingText texts={professions} interval={2500} />
            </span>
          </motion.button>

          <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7'>
            {navItems.map((item) => (
              <button
                key={item.link}
                type='button'
                onClick={() => scrollToSection(item.link)}
                className='font-mono text-[11px] uppercase text-white/75 transition-colors hover:text-white'
                aria-label={item.ariaLabel}
              >
                [ {item.label} ]
              </button>
            ))}
          </nav>

          <div className='ml-auto hidden items-center gap-3 md:flex'>
            <a
              href='mailto:richiekosasihdev@gmail.com'
              className='font-mono text-[11px] uppercase text-white/65 transition-colors hover:text-white'
            >
              Email
            </a>
            <a
              href='/RichiePKosasih_Resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='border border-white/30 px-4 py-2 font-mono text-[11px] uppercase text-white transition-colors hover:border-white hover:bg-white hover:text-black'
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <div className='fixed inset-x-0 top-0 z-[55] h-screen lg:hidden pointer-events-none'>
        <StaggeredMenu
          position='right'
          items={navItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor='#fff'
          openMenuButtonColor='#000'
          changeMenuColorOnOpen={true}
          colors={['#f4f2e8', '#ffffff']}
          accentColor='#111111'
        />
      </div>
    </>
  );
}
