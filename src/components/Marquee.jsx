import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { services } from '../data/site';

export default function Marquee() {
  const reduce = useReducedMotion();
  const row = services.map((s) => s.title);
  return (
    <div className="marquee" aria-label="Our services">
      <motion.div
        className="marquee__track"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
      >
        {[...row, ...row].map((t, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= row.length}>
            {t} <Star size={20} fill="currentColor" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
