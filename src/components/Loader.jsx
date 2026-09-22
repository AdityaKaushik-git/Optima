import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Wave from './Wave';
import { company } from '../data/site';

/** First-visit loader: water rises behind the logo, then the curtain lifts. */
export default function Loader() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('os-loaded'));

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem('os-loaded', '1'); } catch { /* ignore */ }
    }, 1900);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="loader__fill"
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="loader__wave"><Wave fill="var(--water-deep)" duration={2.4} /></div>
          </motion.div>
          <motion.img
            className="loader__logo"
            src={company.logoDark}
            alt=""
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
