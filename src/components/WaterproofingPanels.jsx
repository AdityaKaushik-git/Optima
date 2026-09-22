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
          /* Outer div handles CSS transition — plain div, no framer-motion */
          <motion.div
            key={w.slug}
            className={`wp__panel${isOpen ? ' is-open' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            /* Pointer handling: mouse = hover, touch = tap */
            onPointerEnter={(e) => e.pointerType === 'mouse' && setOpenIdx(i)}
            onPointerUp={(e) => {
              if (e.pointerType !== 'mouse') {
                e.preventDefault();
                setOpenIdx(i);
              }
            }}
            onClick={() => setOpenIdx(i)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpenIdx(i))}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <img src={w.image} alt="" loading="lazy" />
            <span className="wp__label">{w.title}</span>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  className="wp__content"
                  key={w.slug + '-content'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <div>
                    <button
                      className="btn btn--small"
                      onClick={(e) => { e.stopPropagation(); open(w.title); }}
                    >
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
