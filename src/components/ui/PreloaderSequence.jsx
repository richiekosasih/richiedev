import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Put your 5 square photos in src/assets/images/preload/
import p1 from "@/assets/images/preload/p1.webp";
import p2 from "@/assets/images/preload/p2.webp";
import p3 from "@/assets/images/preload/p3.webp";
import p4 from "@/assets/images/preload/p4.webp";
import p5 from "@/assets/images/preload/p5.webp";

/**
 * PreloaderSequence — 2-phase editorial loader
 *
 * Phase A (Name only on beige card)
 *  - 0.0s–0.9s  : calm wipe + fade in "Richie Kosasih"
 *  - 0.9s–1.6s  : split gently (Richie up, Kosasih down) and hold
 *
 * Phase B (Richie / Photo / Kosasih layout)
 *  - 1.6s–4.8s  : morph to stacked layout (name-photo-name), slideshow 5 photos
 *
 * Exit
 *  - 4.8s–5.4s  : fade out the whole overlay
 *
 * Reduced motion: fast, static, ~1.2s total.
 */
export default function PreloaderSequence({ onDone }) {
  const reduce = useReducedMotion();

  // 0 = Phase A (name only), 1 = Phase B (stacked), 2 = fade out
  const [phase, setPhase] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const photos = useMemo(() => [p1, p2, p3, p4, p5], []);
  const slideTimer = useRef(null);

  // Preload images so slideshow does not flicker
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [photos]);

  // Timeline controller
  useEffect(() => {
    if (reduce) {
      // Short, low-motion path
      const t1 = setTimeout(() => setPhase(1), 400);
      const t2 = setTimeout(() => setPhase(2), 900);
      const t3 = setTimeout(() => onDone?.(), 1200);
      return () => [t1, t2, t3].forEach(clearTimeout);
    }

    // A→B transition (morph to stacked layout)
    const toB = setTimeout(() => setPhase(1), 1600); // after initial name reveal/hold
    // Start slideshow a bit after Phase B begins
    const startShow = setTimeout(() => {
      let i = 0;
      slideTimer.current = setInterval(() => {
        i = (i + 1) % photos.length;
        setPhotoIdx(i);
      }, 600); // gentle cadence
    }, 1700);
    // B→Exit
    const toExit = setTimeout(() => setPhase(2), 4800);
    const done = setTimeout(() => {
      if (slideTimer.current) clearInterval(slideTimer.current);
      onDone?.();
    }, 5400);

    return () => {
      clearTimeout(toB);
      clearTimeout(startShow);
      clearTimeout(toExit);
      clearTimeout(done);
      if (slideTimer.current) clearInterval(slideTimer.current);
    };
  }, [reduce, onDone, photos.length]);

  // ===== Variants =====
  const ease = [0.22, 1, 0.36, 1];

  // Beige canvas container (softer fade on exit)
  const canvasVariants = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 1, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.995, transition: { duration: 0.6 } },
      };

  // Horizontal wipe behind the name (Phase A only)
  const wipeVariants = reduce
    ? { initial: { scaleX: 1 }, animate: { scaleX: 1 } }
    : {
        initial: { scaleX: 0 },
        animate: { scaleX: 1, transition: { duration: 0.9, ease } },
      };

  // Name pieces
  const richieA = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      };
  const kosasihA = reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.05 } },
      };

  // When morphing to stacked layout (Phase B), separate movements
  const richieB = reduce
    ? {}
    : { y: -18, transition: { duration: 0.6, ease } };
  const kosasihB = reduce
    ? {}
    : { y: 18, transition: { duration: 0.6, ease } };

  // Photo fade/scale for slideshow
  const photoAnim = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.985 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease } },
      };

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] grid place-items-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 2 ? 0 : 1, transition: { duration: 0.5 } }}
      onAnimationComplete={() => {
        if (phase === 2) onDone?.();
      }}
    >
      {/* Beige editorial canvas */}
      <motion.div
        className="relative w-[92vw] max-w-5xl rounded-3xl bg-[#f5f5dc] text-neutral-900 shadow-2xl overflow-hidden px-6 py-10 md:px-10 md:py-12"
        variants={canvasVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Phase A — centered name only */}
        {phase === 0 && (
          <div className="relative grid place-items-center">
            {/* Subtle wipe line behind the name */}
            {!reduce && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 left-8 right-8 h-[2px] bg-neutral-400/40 origin-left"
                variants={wipeVariants}
                initial="initial"
                animate="animate"
              />
            )}

            <div className="relative flex flex-col items-center gap-2 py-16">
              <motion.span
                className="text-5xl md:text-7xl font-extrabold tracking-tight"
                variants={richieA}
                initial="initial"
                animate="animate"
              >
                Richie
              </motion.span>
              <motion.span
                className="text-5xl md:text-7xl font-extrabold tracking-tight"
                variants={kosasihA}
                initial="initial"
                animate="animate"
              >
                Kosasih
              </motion.span>
            </div>
          </div>
        )}

        {/* Phase B — stacked: Richie / Photo / Kosasih */}
        {phase >= 1 && (
          <div className="flex flex-col items-center">
            <motion.span
              className="text-3xl md:text-4xl font-bold tracking-tight"
              animate={richieB}
            >
              Richie
            </motion.span>

            <div className="mt-4 md:mt-6 w-44 h-44 md:w-60 md:h-60 rounded-xl overflow-hidden ring-1 ring-black/10 shadow-xl bg-neutral-200">
              <motion.img
                key={photoIdx} // change key to trigger cross-fade
                src={photos[photoIdx]}
                alt=""
                className="w-full h-full object-cover"
                {...photoAnim}
              />
            </div>

            <motion.span
              className="mt-4 md:mt-6 text-3xl md:text-4xl font-bold tracking-tight"
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
