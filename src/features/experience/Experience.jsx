import { motion, useReducedMotion } from 'framer-motion';
import SkillTicker from '@/components/ui/SkillTicker';

const categories = [
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'Tailwind CSS', 'Vite', 'Responsive UI'],
  },
  {
    title: 'IT Support',
    items: ['Ticket handling', 'User support', 'Azure', 'Microsoft Entra ID', 'Cisco Meraki'],
  },
  {
    title: 'Business Analyst',
    items: ['Requirements', 'Process mapping', 'Excel', 'SQL basics', 'KPI tracking'],
  },
  {
    title: 'Tools',
    items: ['GitHub', 'Figma', 'Jira', 'Trello', 'Google Workspace'],
  },
];

const tickerItems = [
  'React',
  'JavaScript',
  'Tailwind',
  'Azure',
  'Entra ID',
  'Cisco Meraki',
  'Mimecast',
  'SQL basics',
  'Excel',
  'Figma',
  'GitHub',
];

const ease = [0.16, 1, 0.3, 1];

export default function Experience() {
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
      id='experience'
      className='relative overflow-hidden border-y border-black/10 bg-white px-4 py-16 text-black sm:px-6 md:px-10 md:py-24'
      aria-labelledby='experience-title'
    >
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.08]'
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className='relative mx-auto max-w-[1500px]'>
        <div className='grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
          <div>
            <motion.p
              {...reveal}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease }}
              className='font-mono text-xs uppercase text-black/45'
            >
              Capabilities
            </motion.p>
            <motion.h2
              id='experience-title'
              {...reveal}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.05 }}
              className='mt-4 font-display text-[clamp(4.5rem,14vw,15rem)] uppercase leading-[0.82] tracking-normal'
            >
              What I
              <span className='block'>bring</span>
            </motion.h2>
          </div>
          <motion.p
            {...reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.1 }}
            className='max-w-2xl text-xl leading-8 text-black/70 md:text-2xl md:leading-9'
          >
            A hybrid profile for teams that need someone who can understand the
            workflow, support the system, and build the interface.
          </motion.p>
        </div>

        <motion.div
          className='mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4'
          initial='initial'
          whileInView='whileInView'
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            whileInView: {
              transition: { staggerChildren: reduce ? 0 : 0.08 },
            },
          }}
        >
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              variants={
                reduce
                  ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
                  : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.7, ease }}
              className='group border border-black bg-[#f4f2e8] p-5 transition-colors hover:bg-black hover:text-[#f4f2e8]'
            >
              <div className='flex items-center justify-between border-b border-black pb-4 transition-colors group-hover:border-white/30'>
                <h3 className='font-display text-4xl uppercase leading-none tracking-normal'>
                  {category.title}
                </h3>
                <span className='font-mono text-xs text-black/45 transition-colors group-hover:text-white/45'>
                  0{index + 1}
                </span>
              </div>
              <ul className='mt-5 space-y-3 font-mono text-sm leading-6 text-black/70 transition-colors group-hover:text-white/70'>
                {category.items.map((item) => (
                  <li key={item} className='flex gap-3'>
                    <span aria-hidden='true'>/</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          {...reveal}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.15 }}
          className='mt-10 border-y border-black py-4'
        >
          <SkillTicker
            items={tickerItems}
            speedSeconds={28}
            className='py-2'
          />
        </motion.div>
      </div>
    </section>
  );
}
