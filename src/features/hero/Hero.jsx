import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FileText } from 'lucide-react';
import KineticMarquee from '@/components/ui/KineticMarquee';
import photorichiemono from '@/assets/images/photorichiemono.jpg';

const roles = [
  'Frontend Development',
  'ICT Support',
  'Business Analyst',
];

const proofPoints = [
  { label: 'Location', value: 'Melbourne, Australia' },
  { label: 'Focus', value: 'React + IT Operations' },
  { label: 'Status', value: 'Open to junior roles' },
];

const links = [
  {
    label: 'Resume',
    href: '/RichiePKosasih_Resume.pdf',
    icon: FileText,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/richiekosasih',
    icon: FaLinkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/richiekosasih',
    icon: FaGithub,
  },
];

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const [showEmailCopied, setShowEmailCopied] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const reveal = reduce
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 34 },
        animate: { opacity: 1, y: 0 },
      };

  const copyEmail = async (e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });

    try {
      await navigator.clipboard.writeText('richiekosasihdev@gmail.com');
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 1700);
    } catch {
      window.location.href = 'mailto:richiekosasihdev@gmail.com';
    }
  };

  return (
    <section
      ref={sectionRef}
      id='home'
      className='relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#f4f2e8] text-black'
    >
      <motion.div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-px bg-black'
        initial={reduce ? false : { scaleX: 0 }}
        animate={reduce ? false : { scaleX: 1 }}
        transition={{ duration: 1, ease }}
      />

      <div className='mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1500px] flex-col px-4 py-5 sm:px-6 md:px-10 md:py-8'>
        <motion.div
          className='grid grid-cols-2 items-start gap-4 text-[11px] font-mono uppercase leading-5 text-black/70 md:grid-cols-4'
          variants={{
            animate: {
              transition: { staggerChildren: reduce ? 0 : 0.08 },
            },
          }}
          initial='initial'
          animate='animate'
        >
          {proofPoints.map((item) => (
            <motion.div
              key={item.label}
              variants={reveal}
              transition={{ duration: 0.7, ease }}
              className='border-t border-black/20 pt-2'
            >
              <p className='text-black/45'>{item.label}</p>
              <p className='mt-1 text-black'>{item.value}</p>
            </motion.div>
          ))}
          <motion.button
            type='button'
            onClick={copyEmail}
            variants={reveal}
            transition={{ duration: 0.7, ease }}
            className='border-t border-black/20 pt-2 text-left uppercase transition-colors hover:text-black/60'
          >
            <span className='block text-black/45'>Email</span>
            <span className='mt-1 block underline decoration-black/30 underline-offset-4'>
              richiekosasihdev@gmail.com
            </span>
          </motion.button>
        </motion.div>

        <div className='grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1fr_360px] lg:py-8 xl:grid-cols-[1fr_420px]'>
          <div className='min-w-0'>
            <motion.p
              {...reveal}
              transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.1 }}
              className='font-mono text-xs uppercase text-black/55 md:text-sm'
            >
              Richie Phinardi Kosasih
            </motion.p>

            <motion.h1
              className='mt-4 max-w-6xl font-display text-[clamp(5.2rem,18vw,18rem)] uppercase leading-[0.82] tracking-normal'
              initial={reduce ? false : 'initial'}
              animate='animate'
              style={reduce ? undefined : { y: titleY }}
              variants={{
                animate: {
                  transition: { staggerChildren: reduce ? 0 : 0.08 },
                },
              }}
              aria-label='Richie Kosasih'
            >
              {['Richie', 'Kosasih'].map((word) => (
                <motion.span
                  key={word}
                  className='block overflow-hidden'
                  variants={reveal}
                  transition={{ duration: 0.9, ease }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              {...reveal}
              transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.35 }}
              className='mt-6 grid gap-3 border-y border-black py-5 md:grid-cols-[1fr_1.2fr]'
            >
              <div className='font-mono text-xs uppercase leading-6 text-black/65'>
                Available for entry-level opportunities in web, IT support, and
                business analyst.
              </div>
              <div className='flex flex-wrap gap-2'>
                {roles.map((role) => (
                  <span
                    key={role}
                    className='rounded-full border border-black px-3 py-2 font-mono text-[11px] uppercase leading-none text-black md:text-xs'
                  >
                    / {role}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 24, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: reduce ? 0 : 0.25 }}
            className='relative mx-auto w-full max-w-[340px] lg:max-w-none'
          >
            <motion.div
              className='relative aspect-[4/5] overflow-hidden border border-black bg-black shadow-[10px_10px_0_#000]'
              style={reduce ? undefined : { y: portraitY }}
            >
              <img
                src={photorichiemono}
                alt='Richie Kosasih portrait'
                className='h-full w-full object-cover grayscale'
                loading='eager'
              />
              <div className='absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-4 font-mono text-[11px] uppercase text-white'>
                <span>Recent focus</span>
                <span>React dashboard</span>
              </div>
            </motion.div>
            <div className='mt-5 grid grid-cols-3 gap-2'>
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-center gap-2 border border-black px-3 py-3 font-mono text-[11px] uppercase transition-colors hover:bg-black hover:text-[#f4f2e8]'
                >
                  <Icon className='h-4 w-4 transition-transform group-hover:-translate-y-0.5' />
                  <span className='hidden sm:inline lg:hidden xl:inline'>
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.45 }}
          className='-mx-4 border-y border-black bg-black py-3 text-[#f4f2e8] sm:-mx-6 md:-mx-10'
        >
          <KineticMarquee
            items={[
              'Frontend',
              'IT Support',
              'Business Analyst',
            ]}
            speedSeconds={26}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {showEmailCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.2, ease }}
            className='fixed z-[9999] pointer-events-none'
            style={{
              left: popupPosition.x,
              top: popupPosition.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className='border border-[#f4f2e8] bg-black px-3 py-2 shadow-lg'>
              <p className='whitespace-nowrap font-mono text-xs uppercase text-[#f4f2e8]'>
                Email copied
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
