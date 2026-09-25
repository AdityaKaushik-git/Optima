import { motion } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import { useMemo } from 'react';
import { Reveal } from './Reveal';
import { useBooking } from './Booking';
import { company } from '../data/site';

export default function CTABand({
  title = 'Keep water out for the life of the building',
  text = 'Send us your drawings or book a site visit. We’ll recommend the right system and prepare the submittals for your consultant.',
}) {
  const { open } = useBooking();
  const drops = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 37) % 100}%`, h: 30 + ((i * 13) % 50), d: 2.2 + ((i * 7) % 10) / 5, delay: (i * 0.37) % 3,
  })), []);

  return (
    <section className="wrap" style={{ paddingBlock: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <Reveal className="cta">
        <div className="cta__drops" aria-hidden="true">
          {drops.map((d, i) => (
            <motion.span key={i} style={{ left: d.left, height: d.h }}
              animate={{ y: ['0%', '900%'], opacity: [0, 1, 0] }}
              transition={{ duration: d.d, delay: d.delay, repeat: Infinity, ease: 'easeIn' }} />
          ))}
        </div>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta__actions">
          <button className="btn" onClick={() => open()}><CalendarCheck size={18} /> Book appointment</button>
          <a className="btn btn--ghost" href={`tel:${company.phones[0].tel}`}><Phone size={18} /> Call now</a>
        </div>
      </Reveal>
    </section>
  );
}
