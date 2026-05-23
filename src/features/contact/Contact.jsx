import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const contactLinks = [
  {
    label: 'Email',
    value: 'richiekosasihdev@gmail.com',
    href: 'mailto:richiekosasihdev@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/richiekosasih',
    href: 'https://linkedin.com/in/richiekosasih',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/richiekosasih',
    href: 'https://github.com/richiekosasih',
    icon: Github,
  },
];

const ease = [0.16, 1, 0.3, 1];

export default function Contact() {
  const reduce = useReducedMotion();

  const reveal = reduce
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <section
      id='contact'
      className='relative overflow-hidden bg-[#f4f2e8] px-4 py-16 text-black sm:px-6 md:px-10 md:py-24'
      aria-labelledby='contact-title'
    >
      <div className='mx-auto max-w-[1500px]'>
        <motion.p
          {...reveal}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className='font-mono text-xs uppercase text-black/45'
        >
          Connect
        </motion.p>
        <div className='mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end'>
          <motion.h2
            id='contact-title'
            {...reveal}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.05 }}
            className='font-display text-[clamp(5rem,17vw,18rem)] uppercase leading-[0.78] tracking-normal'
          >
            Let's
            <span className='block'>talk</span>
          </motion.h2>
          <motion.p
            {...reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.12 }}
            className='max-w-xl text-xl leading-8 text-black/70 md:text-2xl md:leading-9'
          >
            I am open to junior frontend, IT support, business systems, and
            graduate technology opportunities in Melbourne.
          </motion.p>
        </div>

        <motion.div
          className='mt-10 grid gap-4 md:grid-cols-3'
          initial='initial'
          whileInView='whileInView'
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            whileInView: {
              transition: { staggerChildren: reduce ? 0 : 0.08 },
            },
          }}
        >
          {contactLinks.map(({ label, value, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              variants={
                reduce
                  ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
                  : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.7, ease }}
              className='group flex min-h-36 flex-col justify-between border border-black bg-white p-5 transition-colors hover:bg-black hover:text-[#f4f2e8] sm:p-6'
            >
              <div className='flex items-center justify-between'>
                <span className='font-mono text-xs uppercase text-black/45 transition-colors group-hover:text-white/45'>
                  {label}
                </span>
                <Icon className='h-5 w-5' />
              </div>
              <p className='mt-8 break-words font-display text-3xl uppercase leading-none tracking-normal md:text-4xl'>
                {value}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
