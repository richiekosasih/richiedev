'use client';
import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export const CometCard = ({
  rotateDepth = 25,
  translateDepth = 15,
  className,
  children,
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`]
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn('comet-card-container relative', className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        className='comet-card-inner relative rounded-2xl cursor-pointer'
      >
        <div
          className='relative rounded-2xl overflow-hidden'
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px, rgba(0, 0, 0, 0.12) 0px 8px 16px -8px',
          }}
        >
          {children}

          {/* Glare effect overlay */}
          <motion.div
            className='pointer-events-none absolute inset-0 z-50 h-full w-full rounded-2xl'
            style={{
              background: glareBackground,
              opacity: 0.4,
              mixBlendMode: 'overlay',
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Subtle border glow */}
          <div className='absolute inset-0 rounded-2xl border border-white/20 pointer-events-none' />
        </div>
      </motion.div>
    </div>
  );
};
