import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_CHARS = "10101010101010010110001";

export default function DecryptedText({
  text = "",
  duration = 800,          // total durasi animasi (ms)
  fps = 30,                // frame per detik
  scrambleChars = DEFAULT_CHARS,
  revealOnce = true,       // true = tidak re-animate setelah terungkap
  className = "",
  // Props lama (mis. speed/animateOn/characters) tetap diterima supaya tidak error,
  // tapi kita abaikan agar komponen ini tetap simpel.
  ...rest
}) {
  const safeText = typeof text === "string" ? text : String(text ?? "");
  const [output, setOutput] = useState(safeText);
  const [revealed, setRevealed] = useState(false);

  const ref = useRef(null);
  const frameRef = useRef(0);
  const startedRef = useRef(false);

  const letters = useMemo(() => safeText.split(""), [safeText]);
  const totalFrames = useMemo(
    () => Math.max(1, Math.round((duration / 1000) * fps)),
    [duration, fps]
  );

  // Trigger animasi saat elemen terlihat (±20% masuk viewport)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!revealOnce || !startedRef.current)) {
          startedRef.current = true;
          animate();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealOnce, totalFrames, safeText]);

  const animate = () => {
    setRevealed(false);
    frameRef.current = 0;

    const tick = () => {
      frameRef.current += 1;
      const progress = Math.min(1, frameRef.current / totalFrames);
      const lockCount = Math.floor(progress * letters.length);

      const next = letters
        .map((ch, i) => {
          if (ch === " ") return " ";       // jaga spasi
          if (i < lockCount) return ch;     // huruf sudah "terkunci"
          const rnd = Math.floor(Math.random() * scrambleChars.length);
          return scrambleChars[rnd];
        })
        .join("");

      setOutput(next);

      if (progress < 1) {
        setTimeout(tick, 1000 / fps);
      } else {
        setOutput(safeText);
        setRevealed(true);
      }
    };

    tick();
  };

  return (
    <span ref={ref} className={className} aria-live="polite" {...rest}>
      {/* Aksesibilitas: screen reader selalu mendapat teks final */}
      <span className="sr-only">{safeText}</span>
      {/* Visual: sebelum reveal tampil scramble, sesudah reveal tampil teks asli */}
      <span aria-hidden="true">{revealed ? safeText : output}</span>
    </span>
  );
}