import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import Wave from './Wave';

export default function PageHeader({ title, lede, image, crumb }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section className="phead" ref={ref}>
      {image && <motion.img className="phead__bg" src={image} alt="" style={{ y }} initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }} />}
      <div className="wrap">
        <motion.nav className="phead__crumbs" aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Link to="/">Home</Link><ChevronRight size={14} /><span>{crumb || title}</span>
        </motion.nav>
        <h1 aria-label={title}>
          {title.split(' ').map((w, i) => (
            <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '.06em' }}>
              <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.35 + i * 0.08, ease }}>
                {w}{'\u00A0'}
              </motion.span>
            </span>
          ))}
        </h1>
        {lede && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}>{lede}</motion.p>}
      </div>
      <div className="phead__water">
        <Wave fill="var(--water)" opacity={0.35} duration={11} amplitude={12} reverse />
        <Wave fill="#eef0ee" duration={8} amplitude={10} />
      </div>
    </section>
  );
}
