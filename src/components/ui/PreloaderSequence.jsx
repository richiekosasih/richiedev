import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import p1 from '@/assets/images/preload/p1.webp';
import p2 from '@/assets/images/preload/p2.webp';
import p3 from '@/assets/images/preload/p3.webp';
import p4 from '@/assets/images/preload/p4.webp';
import p5 from '@/assets/images/preload/p5.webp';

export default function PreloaderSequence({ onDone }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const photos = useMemo(() => [p1, p2, p3, p4, p5], []);
  const slideTimer = useRef(null);

  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [photos]);

  useEffect(() => {
    if (reduce) {
      const t1 = setTimeout(() => setPhase(1), 250);
      const t2 = setTimeout(() => setPhase(2), 550);
      const t3 = setTimeout(() => onDone?.(), 700);
      return () => [t1, t2, t3].forEach(clearTimeout);
    }

    const toB = setTimeout(() => setPhase(1), 700);
    const startShow = setTimeout(() => {
      let i = 0;
      slideTimer.current = setInterval(() => {
        i = (i + 1) % photos.length;
        setPhotoIdx(i);
      }, 280);
    }, 760);
    const toExit = setTimeout(() => setPhase(2), 2100);
    const done = setTimeout(() => {
      if (slideTimer.current) clearInterval(slideTimer.current);
      onDone?.();
    }, 2400);

    return () => {
      clearTimeout(toB);
      clearTimeout(startShow);
      clearTimeout(toExit);
      clearTimeout(done);
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, [reduce, onDone, photos.length]);

  const ease = [0.22, 1, 0.36, 1];

  const wipeVariants = reduce
    ? { initial: { scaleX: 1 }, animate: { scaleX: 1 } }
    : {
        initial: { scaleX: 0 },
        animate: { scaleX: 1, transition: { duration: 0.55, ease } },
      };

  const richieA = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      };

  const kosasihA = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: -6 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease, delay: 0.04 },
        },
      };

  const richieB = reduce ? {} : { y: -14, transition: { duration: 0.45, ease } };
  const kosasihB = reduce ? {} : { y: 14, transition: { duration: 0.45, ease } };

  const photoAnim = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.985 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease } },
      };

  return (
    <motion.div
      aria-hidden='true'
      className='fixed inset-0 z-[9999] grid place-items-center bg-black'
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 2 ? 0 : 1, transition: { duration: 0.35 } }}
      onAnimationComplete={() => {
        if (phase === 2) onDone?.();
      }}
    >
      <motion.div className='relative w-[92vw] max-w-5xl overflow-hidden rounded-3xl bg-[#f4f2e8] px-6 py-10 text-neutral-900 shadow-2xl md:px-10 md:py-12'>
        {phase === 0 && (
          <div className='relative grid place-items-center'>
            {!reduce && (
              <motion.div
                className='absolute left-8 right-8 top-1/2 h-px origin-left -translate-y-1/2 bg-neutral-400/50'
                variants={wipeVariants}
                initial='initial'
                animate='animate'
              />
            )}

            <div className='relative flex flex-col items-center gap-2 py-14'>
              <motion.span
                className='text-5xl font-extrabold tracking-normal md:text-7xl'
                variants={richieA}
                initial='initial'
                animate='animate'
              >
                Richie
              </motion.span>
              <motion.span
                className='text-5xl font-extrabold tracking-normal md:text-7xl'
                variants={kosasihA}
                initial='initial'
                animate='animate'
              >
                Kosasih
              </motion.span>
            </div>
          </div>
        )}

        {phase >= 1 && (
          <div className='flex flex-col items-center'>
            <motion.span
              className='text-3xl font-bold tracking-normal md:text-4xl'
              animate={richieB}
            >
              Richie
            </motion.span>

            <div className='mt-4 h-44 w-44 overflow-hidden rounded-xl bg-neutral-200 shadow-xl ring-1 ring-black/10 md:mt-6 md:h-60 md:w-60'>
              <motion.img
                key={photoIdx}
                src={photos[photoIdx]}
                alt=''
                className='h-full w-full object-cover'
                {...photoAnim}
              />
            </div>

            <motion.span
              className='mt-4 text-3xl font-bold tracking-normal md:mt-6 md:text-4xl'
              animate={kosasihB}
            >
              Kosasih
            </motion.span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
