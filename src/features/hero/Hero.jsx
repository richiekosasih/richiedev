import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightRays from '@/components/ui/LightRays';
import { useReducedMotion } from 'framer-motion';

const Hero = () => {
  // guard LightRays from reduced motion
  const reduce = useReducedMotion();
  const [enableRays, setEnableRays] = useState(false);
  const [showEmailCopied, setShowEmailCopied] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    setEnableRays(!reduce && !isSmall);
  }, [reduce]);

  // Copy email function
  const copyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get cursor position for popup
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });

    const email = 'richiekosasih@gmail.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      // Show success popup
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      // Still show popup even if copy failed
      setShowEmailCopied(true);
      setTimeout(() => setShowEmailCopied(false), 2000);
    }
  };

  return (
    // Semantic HTML: Using <section> with proper heading hierarchy
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-black'
    >
      {enableRays ? (
        <div className='absolute inset-0'>
          <LightRays
            raysOrigin='top-center'
            raysColor='#ffffff'
            raysSpeed={0.6}
            lightSpread={0.6}
            rayLength={3}
            followMouse={false}
          />
        </div>
      ) : (
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),_transparent_60%)] pointer-events-none' />
      )}

      {/* Canvas: the beige "page" inside a black frame */}
      <div
        className='relative w-full max-w-7xl rounded-3xl bg-canvas text-neutral-900 shadow-2xl overflow-hidden'
        style={{ pointerEvents: 'auto' }}
      >
        {/* Giant editorial headline */}
        <h1
          className='px-4 md:px-8 mt-4 md:mt-2 text-center
                     font-black uppercase leading-none
                     text-[64px] md:text-[144px] lg:text-[200px]
                     tracking-tight'
          style={{ letterSpacing: '-0.02em' }}
        >
          Creative <span className='block'>Developer</span>
        </h1>

        {/* Middle area: side notes + square photo + latest work */}
        <div className='relative grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-10 px-6 md:px-10 py-10'>
          {/* Left quotes list */}
          <div className='hidden md:block font-mono text-[10px] leading-5 tracking-widest uppercase text-neutral-700'>
            <div>Ideas into action</div>
            <div>Design. Build. Repeat (UI/UX)</div>
            <div>From sketch to screen</div>
          </div>

          {/* Square portrait */}
          <div className='mx-auto w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-md overflow-hidden ring-1 ring-black/10 shadow-lg bg-neutral-200'>
            <img
              src='/src/assets/images/photorichiemono.jpg'
              alt='Richie Kosasih portrait'
              className='w-full h-full object-cover'
              loading='eager'
            />
          </div>

          {/* Right tiny "introduce myself" label - Desktop (vertical) */}
          <div className='hidden md:flex flex-col items-start justify-center'>
            <span className='font-mono text-[10px] tracking-widest uppercase text-neutral-700'>
              Hi I'm
            </span>
            <span className='mt-2 font-black text-3xl tracking-tight uppercase'>
              Richie
            </span>
          </div>

          {/* Mobile "introduce myself" label - Horizontal layout */}
          <div className='md:hidden flex items-center gap-3 justify-center'>
            <span className='font-mono text-[10px] tracking-widest uppercase text-neutral-700'>
              Hi I'm
            </span>
            <span className='font-black text-2xl tracking-tight uppercase'>
              Richie
            </span>
          </div>
        </div>

        {/* Bottom meta line */}
        <div className='px-5 md:px-8 pb-6 font-mono text-[10px] md:text-[11px] leading-relaxed tracking-widest uppercase text-neutral-700 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div
            className='hidden md:block'
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
          >
            Based in Melbourne, Australia
            <br />
            <span
              onClick={copyEmail}
              className='hover:text-neutral-900 transition-colors cursor-pointer underline decoration-dotted underline-offset-2 inline-block'
              style={{ pointerEvents: 'auto', userSelect: 'none' }}
            >
              richiekosasihde@gmail.com
            </span>
          </div>
          <div className='text-center'>
            I design and develop modern, responsive web applications that
            combine performance, clean UI, and lasting user experiences.
          </div>
          <div className='text-right'>[ RPKDEV 2025 ]</div>
        </div>
      </div>

      {/* Email Copied Popup - appears near cursor */}
      <AnimatePresence>
        {showEmailCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='fixed z-[9999] pointer-events-none'
            style={{
              left: popupPosition.x,
              top: popupPosition.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className='bg-black border border-[#f5f5dc] rounded-lg px-3 py-2 shadow-lg'>
              <p className='text-[#f5f5dc] font-semibold text-sm whitespace-nowrap'>
                Email Copied
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
