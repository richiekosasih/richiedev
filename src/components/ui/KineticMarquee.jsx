import { useReducedMotion } from 'framer-motion';

export default function KineticMarquee({
  items = [],
  className = '',
  speedSeconds = 22,
  reverse = false,
}) {
  const reduce = useReducedMotion();
  const content = items.length ? items : ['Frontend', 'IT Support', 'Business Analyst'];
  const repeated = [...content, ...content, ...content, ...content];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden='true'>
      <style>{`
        @keyframes kinetic-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        @keyframes kinetic-marquee-right {
          from { transform: translateX(-25%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div
        className='flex w-max items-center whitespace-nowrap'
        style={
          reduce
            ? {}
            : {
                animation: `${
                  reverse ? 'kinetic-marquee-right' : 'kinetic-marquee-left'
                } ${speedSeconds}s linear infinite`,
              }
        }
      >
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className='mx-4 font-display text-[4.5rem] uppercase leading-none text-current sm:text-[7rem] lg:text-[10rem]'
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
