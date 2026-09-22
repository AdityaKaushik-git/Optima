import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarCheck, ArrowRight, Star } from 'lucide-react';
import { heroSlides } from '../data/site';
import { useBooking } from './Booking';
import Wave from './Wave';

const SLIDE_MS = 6000;
const ease = [0.22, 1, 0.36, 1];
const lines = ['Built on', 'expertise,', 'driven by', 'excellence.'];

export default function Hero() {
  const { open } = useBooking();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i]);

  // Delay the intro so it plays after the first-visit loader.
  const firstVisit = typeof window !== 'undefined' && !sessionStorage.getItem('os-loaded');
  const d = firstVisit ? 2.2 : 0.35;

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__slides" style={{ y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={i}
            className="hero__slide"
            src={heroSlides[i]}
            alt=""
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: reduce ? 1.05 : 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: SLIDE_MS / 1000 + 1.4, ease: 'linear' } }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="hero__shade" />

      <motion.div className="wrap hero__inner glass-dark" style={{ y: textY, opacity: textOpacity, padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '24px', maxWidth: '800px', margin: 'auto', marginTop: 'clamp(4rem, 10vh, 8rem)' }}>
        <motion.div className="hero__kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: d, ease }}>
          <span className="dot"><Star size={14} fill="currentColor" /></span>
          Waterproofing specialists in Dubai, U.A.E
        </motion.div>
        <h1 className="hero__title" aria-label="Built on expertise, driven by excellence.">
          {lines.map((l, n) => (
            <span className="hero__line" key={l} aria-hidden="true">
              <motion.span initial={{ y: '105%', rotate: 4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.1, delay: d + 0.12 + n * 0.1, ease }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero__lede" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: d + 0.6, ease }}>
          Premier waterproofing, specialised insulation and technical engineering services for homes,
          commercial buildings and industrial projects across the UAE.
        </motion.p>
        <motion.div className="hero__actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: d + 0.75, ease }}>
          <button className="btn" onClick={() => open()}><CalendarCheck size={18} /> Book appointment</button>
          <Link className="btn btn--ghost" to="/services">See our services <ArrowRight size={18} /></Link>
        </motion.div>
      </motion.div>



      <div className="hero__water" aria-hidden="true">
        <Wave fill="var(--water)" opacity={0.35} duration={12} amplitude={14} reverse />
        <Wave fill="var(--ink)" duration={8} amplitude={10} />
      </div>
    </section>
  );
}
