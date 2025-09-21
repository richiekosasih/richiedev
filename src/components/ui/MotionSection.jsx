import { motion, useReducedMotion } from 'framer-motion';

const MotionSection = ({
  as: Tag = 'section',
  variants,
  className = '',
  ...props
}) => {
  const reduce = useReducedMotion();
  const safeVariants = reduce
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : variants;

  // dynamic tag (default: section)
  const Comp = motion[Tag] || motion.section;

  return <Comp variants={safeVariants} {...props} className={className} />;
};

export default MotionSection;
