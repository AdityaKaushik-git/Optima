import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { waterproofing } from '../data/site';
import { useBooking } from './Booking';

export default function WaterproofingPanels() {
  const [openIdx, setOpenIdx] = useState(0);
  const { open } = useBooking();

  return (
    <div className="wp">
      {waterproofing.map((w, i) => {
        const isOpen = i === openIdx;
        return (
          <motion.div
            key={w.slug}
            className={`wp__panel${isOpen ? ' is-open' : ''}`}
            onMouseEnter={() => setOpenIdx(i)}
            onClick={() => setOpenIdx(i)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpenIdx(i))}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={w.image} alt="" loading="lazy" />
            <span className="wp__label">{w.title}</span>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div className="wp__content"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <div>
                    <button className="btn btn--small" onClick={(e) => { e.stopPropagation(); open(w.title); }}>
                      <CalendarCheck size={16} /> Book this service
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
