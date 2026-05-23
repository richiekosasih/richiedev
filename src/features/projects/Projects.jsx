import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import KineticMarquee from '@/components/ui/KineticMarquee';
import TiltCard from '@/components/ui/TiltCard';
import portfolioPreview from '@/assets/images/ProjectPhoto/projectrichiedev.jpg';
import dashboardPreview from '@/assets/images/ProjectPhoto/yummomdashboard.png';
import inProgressPreview from '@/assets/images/ProjectPhoto/InProgress.jpg';

const projects = [
  {
    title: 'Yummom Dashboard',
    eyebrow: 'Featured build',
    description:
      'A business dashboard for a frozen food operation to manage products, inventory, orders, expenses, stock alerts, and daily summaries.',
    impact: 'Built around real operational workflows, not a generic UI demo.',
    tech: ['React', 'JavaScript', 'Tailwind', 'LocalStorage', 'CRUD'],
    github: 'https://github.com/richiekosasih/yummom-dashboard.git',
    demo: null,
    image: dashboardPreview,
  },
  {
    title: 'Personal Portfolio',
    eyebrow: 'Live site',
    description:
      'A responsive recruiter-facing portfolio built with React, Vite, Tailwind, Framer Motion, accessibility structure, and SEO metadata.',
    impact: 'Shows frontend craft, motion direction, component structure, and deployment readiness.',
    tech: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com/richiekosasih/richiedev.git',
    demo: 'https://richiekosasih.com',
    image: portfolioPreview,
  },
];

const explorations = [
  'AI-assisted developer tooling',
  'Responsive commerce interfaces',
  'Business process automation',
];

const ease = [0.16, 1, 0.3, 1];

export default function Projects() {
  const reduce = useReducedMotion();
  const [activeProject, setActiveProject] = useState(projects[0]);

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
      id='projects'
      className='relative overflow-hidden bg-black px-4 py-16 text-[#f4f2e8] sm:px-6 md:px-10 md:py-24'
      aria-labelledby='projects-title'
    >
      <div className='mx-auto max-w-[1500px]'>
        <div className='grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end'>
          <div>
            <motion.p
              {...reveal}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease }}
              className='font-mono text-xs uppercase text-white/45'
            >
              Selected work
            </motion.p>
            <motion.h2
              id='projects-title'
              {...reveal}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.05 }}
              className='mt-4 font-display text-[clamp(4.8rem,16vw,17rem)] uppercase leading-[0.78] tracking-normal'
            >
              What I
              <span className='block'>built</span>
            </motion.h2>
          </div>
          <motion.p
            {...reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.1 }}
            className='max-w-2xl font-mono text-sm leading-7 text-white/65'
          >
            Fewer projects, stronger evidence. Each featured item should tell a
            recruiter what problem it solves, what I built, and why it matters.
          </motion.p>
        </div>

        <div className='mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
          <TiltCard
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className='relative min-h-[360px] overflow-hidden border border-white/25 bg-white/[0.04] lg:min-h-[620px]'
          >
            <motion.img
              key={activeProject.title}
              src={activeProject.image}
              alt={`${activeProject.title} preview`}
              className='h-full min-h-[360px] w-full object-cover grayscale transition duration-500 hover:grayscale-0 lg:min-h-[620px]'
              initial={reduce ? false : { scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease }}
              loading='lazy'
            />
            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5'>
              <p className='font-mono text-xs uppercase text-white/55'>
                Preview
              </p>
              <h3 className='mt-1 font-display text-5xl uppercase leading-none tracking-normal'>
                {activeProject.title}
              </h3>
            </div>
          </TiltCard>

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
            {projects.map((project, index) => (
              <TiltCard
                as='article'
                key={project.title}
                onMouseEnter={() => setActiveProject(project)}
                onFocus={() => setActiveProject(project)}
                variants={
                  reduce
                    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
                    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }
                }
                transition={{ duration: 0.75, ease }}
                className='group border border-white/20 bg-white/[0.03] p-5 transition-colors hover:bg-[#f4f2e8] hover:text-black sm:p-6'
              >
                <div className='flex items-start justify-between gap-4 border-b border-white/15 pb-4 transition-colors group-hover:border-black/20'>
                  <div>
                    <p className='font-mono text-xs uppercase text-white/45 transition-colors group-hover:text-black/45'>
                      {project.eyebrow} / 0{index + 1}
                    </p>
                    <h3 className='mt-3 font-display text-5xl uppercase leading-none tracking-normal md:text-6xl'>
                      {project.title}
                    </h3>
                  </div>
                  <span className='hidden font-display text-6xl leading-none text-white/15 transition-colors group-hover:text-black/15 sm:block'>
                    0{index + 1}
                  </span>
                </div>

                <p className='mt-5 text-base leading-7 text-white/70 transition-colors group-hover:text-black/70'>
                  {project.description}
                </p>
                <p className='mt-3 font-mono text-xs uppercase leading-6 text-white/45 transition-colors group-hover:text-black/50'>
                  {project.impact}
                </p>

                <div className='mt-5 flex flex-wrap gap-2'>
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className='border border-white/20 px-3 py-2 font-mono text-[11px] uppercase text-white/65 transition-colors group-hover:border-black/25 group-hover:text-black/65'
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className='mt-6 flex flex-wrap gap-3'>
                  <a
                    href={project.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 border border-white/25 px-4 py-3 font-mono text-xs uppercase transition-colors hover:bg-black hover:text-[#f4f2e8] group-hover:border-black'
                  >
                    <Github className='h-4 w-4' />
                    GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 border border-white/25 px-4 py-3 font-mono text-xs uppercase transition-colors hover:bg-black hover:text-[#f4f2e8] group-hover:border-black'
                    >
                      <ExternalLink className='h-4 w-4' />
                      Live
                    </a>
                  )}
                </div>
              </TiltCard>
            ))}

            <motion.aside
              variants={
                reduce
                  ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
                  : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.75, ease }}
              className='border border-dashed border-white/25 p-5 sm:p-6'
            >
              <p className='font-mono text-xs uppercase text-white/45'>
                Explorations
              </p>
              <div className='mt-4 grid gap-3 sm:grid-cols-3'>
                {explorations.map((item) => (
                  <div
                    key={item}
                    className='min-h-28 border border-white/15 bg-white/[0.03] p-4'
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                      backgroundSize: '18px 18px',
                    }}
                  >
                    <img
                      src={inProgressPreview}
                      alt=''
                      className='mb-3 h-12 w-12 rounded-full object-cover opacity-50 grayscale'
                      loading='lazy'
                    />
                    <p className='font-mono text-xs uppercase leading-5 text-white/65'>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        </div>

        <motion.div
          {...reveal}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.15 }}
          className='mt-12 border-y border-white/20 py-3 text-white/80'
        >
          <KineticMarquee
            items={['Problem', 'Process', 'Interface', 'Outcome']}
            speedSeconds={20}
            reverse
          />
        </motion.div>
      </div>
    </section>
  );
}
