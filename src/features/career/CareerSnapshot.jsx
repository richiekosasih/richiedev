import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Code2, Network } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';

const signals = [
  {
    icon: Network,
    number: '01',
    title: 'ICT Support Intern',
    meta: 'Rodd & Gunn, Melbourne',
    summary:
      'Supported users, tickets, network devices, and security controls across a retail IT environment.',
    details: ['Azure', 'Microsoft Entra ID', 'Cisco Meraki', 'Mimecast'],
  },
  {
    icon: Briefcase,
    number: '02',
    title: 'Operations Lead',
    meta: '40 drivers across western Melbourne',
    summary:
      'Coordinated daily delivery operations, route issues, KPI tracking, and warehouse communication.',
    details: ['On-time delivery', 'Route allocation', 'Issue resolution', 'KPI monitoring'],
  },
  {
    icon: Code2,
    number: '03',
    title: 'React Business Dashboard',
    meta: 'Yummom Dashboard project',
    summary:
      'Built a practical dashboard for products, inventory, orders, expenses, and stock alerts.',
    details: ['React', 'Vite', 'Tailwind', 'LocalStorage CRUD'],
  },
];

const ease = [0.16, 1, 0.3, 1];

export default function CareerSnapshot() {
  const reduce = useReducedMotion();

  const itemMotion = reduce
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
      id='career'
      className='relative overflow-hidden border-y border-white/15 bg-black px-4 py-16 text-[#f4f2e8] sm:px-6 md:px-10 md:py-24'
      aria-labelledby='career-title'
    >
      <div className='mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.75fr_1.25fr]'>
        <div className='lg:sticky lg:top-28 lg:h-fit'>
          <motion.p
            {...itemMotion}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
            className='font-mono text-xs uppercase text-white/45'
          >
            Recruiter scan
          </motion.p>
          <motion.h2
            id='career-title'
            {...itemMotion}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.05 }}
            className='mt-4 font-display text-[clamp(4.5rem,13vw,13rem)] uppercase leading-[0.82] tracking-normal'
          >
            Career
            <span className='block'>Signals</span>
          </motion.h2>
          <motion.p
            {...itemMotion}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.1 }}
            className='mt-6 max-w-md font-mono text-sm leading-7 text-white/65'
          >
            A quick proof section: what I have handled, what tools I have used,
            and how that connects to junior frontend, IT support, and business
            systems roles.
          </motion.p>
        </div>

        <motion.div
          className='grid gap-4'
          initial='initial'
          whileInView='whileInView'
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            whileInView: {
              transition: { staggerChildren: reduce ? 0 : 0.1 },
            },
          }}
        >
          {signals.map(({ icon: Icon, number, title, meta, summary, details }) => (
            <TiltCard
              as='article'
              key={title}
              variants={
                reduce
                  ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
                  : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.7, ease }}
              className='group grid gap-6 border border-white/20 bg-white/[0.03] p-5 transition-colors hover:bg-[#f4f2e8] hover:text-black sm:p-6 md:grid-cols-[90px_1fr]'
            >
              <div className='flex items-center justify-between md:block'>
                <span className='font-display text-6xl leading-none text-white/30 transition-colors group-hover:text-black/25'>
                  {number}
                </span>
                <Icon className='h-6 w-6 text-white/60 transition-colors group-hover:text-black md:mt-8' />
              </div>

              <div>
                <div className='flex flex-col gap-2 border-b border-white/15 pb-4 transition-colors group-hover:border-black/20 sm:flex-row sm:items-end sm:justify-between'>
                  <h3 className='font-display text-4xl uppercase leading-none tracking-normal md:text-5xl'>
                    {title}
                  </h3>
                  <p className='font-mono text-xs uppercase text-white/45 transition-colors group-hover:text-black/55'>
                    {meta}
                  </p>
                </div>
                <p className='mt-5 max-w-2xl text-base leading-7 text-white/70 transition-colors group-hover:text-black/70'>
                  {summary}
                </p>
                <div className='mt-5 flex flex-wrap gap-2'>
                  {details.map((detail) => (
                    <span
                      key={detail}
                      className='border border-white/20 px-3 py-2 font-mono text-[11px] uppercase text-white/65 transition-colors group-hover:border-black/25 group-hover:text-black/70'
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
