import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import portrait from '@/assets/images/aboutphoto.jpg';

const links = [
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
  {
    label: 'Instagram',
    href: 'https://instagram.com/richie_kosasih',
    icon: FaInstagram,
  },
];

const ease = [0.16, 1, 0.3, 1];

export default function About() {
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
      id='about'
      className='relative overflow-hidden bg-[#f4f2e8] px-4 py-16 text-black sm:px-6 md:px-10 md:py-24'
      aria-labelledby='about-title'
    >
      <div className='mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
        <div>
          <motion.p
            {...reveal}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
            className='font-mono text-xs uppercase text-black/45'
          >
            About me
          </motion.p>
          <motion.h2
            id='about-title'
            {...reveal}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.05 }}
            className='mt-4 font-display text-[clamp(5rem,16vw,17rem)] uppercase leading-[0.78] tracking-normal'
          >
            Build with
            <span className='block'>context.</span>
          </motion.h2>
        </div>

        <motion.div
          {...reveal}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.15 }}
          className='grid gap-7'
        >
          <p className='text-xl leading-8 md:text-2xl md:leading-9'>
            I solve business problems through practical technology.
          </p>
          <p className='font-mono text-sm leading-7 text-black/65'>
          My strength is connecting user needs, business processes, and practical technology. 
          I enjoy improving workflows, supporting users, and exploring AI-assisted automation to make work clearer and more efficient.
          </p>
          <div className='flex flex-wrap gap-3'>
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center gap-2 border border-black px-4 py-3 font-mono text-xs uppercase transition-colors hover:bg-black hover:text-[#f4f2e8]'
              >
                <Icon className='h-4 w-4 transition-transform group-hover:-translate-y-0.5' />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className='mx-auto mt-12 grid max-w-[1500px] gap-6 border-t border-black pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end'>
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 24, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className='relative max-w-sm overflow-hidden border border-black bg-black lg:max-w-md'
        >
          <img
            src={portrait}
            alt='Richie Kosasih standing outdoors'
            className='aspect-[4/5] w-full object-cover grayscale'
            loading='lazy'
          />
        </motion.figure>

        <motion.div
          {...reveal}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.1 }}
          className='grid gap-4 font-mono text-xs uppercase leading-6 text-black/65 md:grid-cols-3'
        >
          <p>
            Practical IT experience in ICT support, business operations, and web development.
          </p>
          <p>
            Hands-on with React, Tailwind, JavaScript, Azure, Entra ID, Cisco
            Meraki, and business documentation.
          </p>
          <p>
            Looking for junior roles where technical learning, operations
            context, and problem solving all matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
