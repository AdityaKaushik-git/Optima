import { motion, useReducedMotion } from 'framer-motion';

/** A seamless, horizontally drifting wave. Place inside a positioned container. */
export default function Wave({ fill = '#eef0ee', duration = 9, amplitude = 18, opacity = 1, reverse = false, className }) {
  const reduce = useReducedMotion();
  const a = amplitude;
  // Two identical periods side by side so a -50% shift loops seamlessly.
  const d = `M0 ${40} C 150 ${40 - a}, 350 ${40 + a}, 500 40 S 850 ${40 - a}, 1000 40 S 1350 ${40 + a}, 1500 40 S 1850 ${40 - a}, 2000 40 V 120 H 0 Z`;
  return (
    <motion.svg
      className={className}
      viewBox="0 0 2000 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity }}
      animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      <path d={d} fill={fill} />
    </motion.svg>
  );
}
