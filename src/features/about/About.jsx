import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import portrait from '@/assets/images/aboutphoto.jpg';

export default function About() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });

  // Enhanced parallax and float for the portrait
  const y = reduce ? 0 : useTransform(scrollYProgress, [0, 1], [20, -20]);
  const r = reduce ? 0 : useTransform(scrollYProgress, [0, 1], [-2, 2]);

  // Easing shortcut - smoother curve for longer transitions
  const ease = [0.16, 1, 0.3, 1];

  // Variants
  const fadeUp = reduce
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 2, ease } },
      };

  const headline = reduce
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0.001, scale: 0.96, skewY: 6 },
        whileInView: {
          opacity: 1,
          scale: 1,
          skewY: 0,
          transition: { duration: 2, ease },
        },
      };

  return (
    <section
      id='about'
      ref={ref}
      className='relative w-full px-6 py-20 md:py-28'
      style={{ position: 'relative' }}
    >
      {/* Beige canvas background with rounded corners like paper */}
      <div
        className='absolute inset-6 rounded-3xl shadow-2xl'
        style={{ backgroundColor: '#f5f5dc' }}
      />

      {/* Content container */}
      <div className='relative mx-auto w-full max-w-4xl lg:max-w-5xl px-6 text-[#1b1b1b]'>
        {/* Giant editorial headline */}
        <motion.h2
          {...headline}
          viewport={{ once: true, amount: 0.5 }}
          className='text-[56px] leading-none md:text-[120px] md:leading-none font-black tracking-tight uppercase'
          style={{ letterSpacing: '-0.02em' }}
        >
          About <span className='inline-block md:block'>Me</span>
        </motion.h2>

        {/* Copy blocks + portrait */}
        <div className='mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start'>
          {/* Left column: copy */}
          <div className='space-y-6'>
            <motion.p
              variants={fadeUp}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.8 }}
              className='font-mono text-[13px] md:text-[14px] leading-7 tracking-wide text-[#2a2a2a]'
            >
              Hi, I'm Richie. I'm a frontend-focused developer with a curiosity
              for design and interaction. I build modern, responsive interfaces
              with React and Tailwind, aiming for clarity, speed, and a sense of
              calm motion.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.8 }}
              className='font-mono text-[13px] md:text-[14px] leading-7 tracking-wide text-[#2a2a2a]'
            >
              I enjoy crafting simple interactions that feel intentional: smooth
              reveals, tidy layouts, and type that communicates. Beyond the
              editor, I explore design ideas, play games, music, and look for
              inspiration in everyday details.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.8 }}
              className='font-mono text-[13px] md:text-[14px] leading-7 tracking-wide text-[#2a2a2a]'
            >
              I believe that learning is an ongoing process—every project is a
              chance to sharpen skills, experiment, and create something
              meaningful. What excites me most is turning small ideas into
              digital experiences that others can see, touch, and use.
            </motion.p>

            {/* Social media icons - Desktop only */}
            <motion.div
              variants={fadeUp}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 1 }}
              className='pt-4 hidden md:block'
            >
              <div className='flex items-center gap-4'>
                {/* LinkedIn */}
                <a
                  href='https://linkedin.com/in/richiekosasih'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative w-10 h-10 rounded-full ring-1 ring-black/20 bg-black/5 flex items-center justify-center transition-all duration-300 hover:bg-black/10 hover:ring-black/30'
                >
                  <FaLinkedin className='w-5 h-5 text-[#1b1b1b]' />
                </a>

                {/* GitHub */}
                <a
                  href='https://github.com/richiekosasih'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative w-10 h-10 rounded-full ring-1 ring-black/20 bg-black/5 flex items-center justify-center transition-all duration-300 hover:bg-black/10 hover:ring-black/30'
                >
                  <FaGithub className='w-5 h-5 text-[#1b1b1b]' />
                </a>

                {/* Instagram */}
                <a
                  href='https://instagram.com/richie_kosasih'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative w-10 h-10 rounded-full ring-1 ring-black/20 bg-black/5 flex items-center justify-center transition-all duration-300 hover:bg-black/10 hover:ring-black/30'
                >
                  <FaInstagram className='w-5 h-5 text-[#1b1b1b]' />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right column: portrait with parallax + soft frame */}
          <motion.figure
            initial={reduce ? {} : { opacity: 0, scale: 0.9, y: 30 }}
            whileInView={reduce ? {} : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease, delay: 0.6 }}
            className='relative mx-auto w-[260px] h-[320px] md:w-[360px] md:h-[440px] rounded-xl overflow-hidden'
            style={{ y, rotate: r }}
          >
            <img
              src={portrait}
              alt='Richie Kosasih portrait'
              className='w-full h-full object-cover grayscale'
              loading='lazy'
            />
            {/* Soft paper tint + border */}
            <div className='absolute inset-0 ring-1 ring-black/15' />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent' />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
