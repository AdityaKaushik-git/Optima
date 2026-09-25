import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { warranty } from '../data/site';

/** Warranty band: 10 to 20 years on SBS membrane systems, depending on the structure. */
export default function Warranty() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const ticks = Array.from({ length: 21 }, (_, i) => i);
  const pct = (v) => `${(v / 20) * 100}%`;

  return (
    <section className="wrap warranty-wrap" ref={ref}>
      <div className="warranty glass-panel">
        <div className="warranty__copy">
          <span className="warranty__seal"><ShieldCheck size={30} strokeWidth={1.8} /></span>
          <h2>{warranty.title}</h2>
          <p>{warranty.text}</p>
        </div>

        <div className="warranty__meter" aria-label={`Warranty from ${warranty.min} to ${warranty.max} years`}>
          <div className="warranty__big" aria-hidden="true">
            <span>{warranty.min}</span><i>–</i><span>{warranty.max}</span>
            <small>years</small>
          </div>
          <div className="warranty__track" aria-hidden="true">
            {ticks.map((t) => (
              <b key={t} style={{ left: pct(t) }} className={t % 5 === 0 ? 'is-major' : undefined} />
            ))}
            <motion.div className="warranty__fill"
              style={{ left: pct(warranty.min), right: 0, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
          </div>
          <div className="warranty__scale" aria-hidden="true">
            <span style={{ left: 0 }}>0</span>
            <span style={{ left: pct(10) }}>10 yrs</span>
            <span style={{ left: '100%' }}>20 yrs</span>
          </div>
          <p className="warranty__note">Starting term 10 years. Longer terms depend on the structure, the system specified and its exposure.</p>
        </div>
      </div>
    </section>
  );
}
