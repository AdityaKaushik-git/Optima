import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { WordReveal, Reveal } from './Reveal';

/*
  A section through a basement wall and slab, the way an engineer would draw it.
  As the visitor scrolls, groundwater rises in the soil and is stopped by the
  membrane system. Hovering a legend item isolates that layer in the drawing.
*/

const LAYERS = [
  { id: 'water', name: 'Groundwater', color: '#00aee7', desc: 'Dubai’s high water table puts constant pressure on basements and foundations.' },
  { id: 'board', name: 'Protection board', color: '#8c96a0', desc: 'Shields the membrane from damage during backfilling and soil movement.' },
  { id: 'membrane', name: 'SBS membrane', color: '#00aee7', desc: 'Modified bitumen sheets, torch-bonded in one or two layers. The watertight barrier.' },
  { id: 'primer', name: 'Bitumen primer', color: '#5b4a3a', desc: 'Seals the concrete surface so the membrane bonds fully.' },
  { id: 'concrete', name: 'Concrete structure', color: '#c9cfcc', desc: 'The basement wall and slab you’re protecting, with its steel reinforcement.' },
  { id: 'pile', name: 'Pile head treatment', color: '#e2733b', desc: 'Non-shrink grout seals the weakest point: where the pile meets the slab.' },
];

const ease = [0.22, 1, 0.36, 1];

export default function CrossSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [active, setActive] = useState(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const waterY = useTransform(smooth, [0, 1], [470, 120]);

  const dim = (id) => ({ opacity: active && active !== id ? 0.18 : 1, transition: 'opacity .4s' });
  const draw = (delay, axis = 'x') => ({
    initial: { [axis === 'x' ? 'scaleY' : 'scaleX']: 0 },
    animate: inView ? { [axis === 'x' ? 'scaleY' : 'scaleX']: 1 } : {},
    transition: { duration: 1, delay, ease },
  });

  return (
    <section className="section section--ink" ref={ref}>
      <div className="wrap xsec">
        <div>
          <WordReveal className="section__title" text="How we keep water out" />
          <Reveal delay={0.15}>
            <p className="section__lede" style={{ marginTop: '1.2rem' }}>
              Every system we install is built in layers. Here's a typical basement: scroll to raise
              the groundwater, and select a layer to see what it does.
            </p>
          </Reveal>
          <ul className="xsec__legend">
            {LAYERS.map((l, n) => (
              <motion.li key={l.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + n * 0.08, ease }}>
                <button
                  className={active === l.id ? 'is-on' : ''}
                  onMouseEnter={() => setActive(l.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(l.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === l.id ? null : l.id))}
                  aria-pressed={active === l.id}
                >
                  <span className="xsec__swatch" style={{ background: l.color }} />
                  <span>
                    <strong>{l.name}</strong>
                    <AnimatePresence initial={false}>
                      {active === l.id && (
                        <motion.span className="desc-wrap" style={{ display: 'block' }}
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}>
                          <span className="desc">{l.desc}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal y={60}>
          <svg className="xsec__svg" viewBox="0 0 600 560" role="img" aria-label="Cross-section of a waterproofed basement wall and slab with groundwater held back by the membrane">
            <defs>
              <pattern id="soil" width="18" height="18" patternUnits="userSpaceOnUse">
                <rect width="18" height="18" fill="#3a3025" />
                <circle cx="4" cy="5" r="1.4" fill="#57483a" />
                <circle cx="13" cy="12" r="1.8" fill="#4b3e31" />
                <circle cx="9" cy="16" r="1" fill="#6a5846" />
              </pattern>
              <pattern id="concrete" width="22" height="22" patternUnits="userSpaceOnUse">
                <rect width="22" height="22" fill="#c9cfcc" />
                <circle cx="5" cy="6" r="1.3" fill="#aab1ae" />
                <circle cx="16" cy="14" r="1.8" fill="#b6bcb9" />
                <path d="M9 18 l3 -2 l2 3 z" fill="#a4aba8" />
              </pattern>
              <clipPath id="soilClip">
                <path d="M0 0 H316 V496 H600 V560 H0 Z" />
              </clipPath>
            </defs>

            {/* Soil */}
            <path d="M0 0 H316 V496 H600 V560 H0 Z" fill="url(#soil)" />
            <text x="24" y="60" fill="#b7a58f" fontSize="13" fontFamily="Public Sans, sans-serif">Backfill soil</text>

            {/* Groundwater, rising with scroll */}
            <g clipPath="url(#soilClip)" style={dim('water')}>
              <motion.g style={{ y: waterY }}>
                <motion.path
                  d="M0 2 C75 -12 225 16 300 2 S525 -12 600 2 S825 16 900 2 S1125 -12 1200 2 V10 H0 Z"
                  fill="rgba(0,174,231,0.8)"
                  animate={{ x: [0, -600] }}
                  transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
                />
                <rect x="0" y="0" width="600" height="600" fill="rgba(0,174,231,0.8)" />
                {[40, 110, 180, 250].map((x, n) => (
                  <motion.g key={x}
                    animate={{ x: [0, 22, 0] }}
                    transition={{ duration: 2.4, delay: n * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
                    <path d={`M${x} 60 h40 m-10 -8 l10 8 l-10 8`} stroke="#e9f7fd" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.g>
                ))}
              </motion.g>
            </g>

            {/* Protection board */}
            <g style={dim('board')}>
              <motion.rect x="316" y="30" width="10" height="478" fill="#8c96a0" style={{ transformOrigin: '321px 508px' }} {...draw(0.9)} />
              <motion.rect x="316" y="496" width="284" height="12" fill="#8c96a0" style={{ transformOrigin: '316px 502px' }} {...draw(1.1, 'y')} />
            </g>

            {/* SBS membrane (two layers) */}
            <g style={dim('membrane')}>
              <motion.rect x="326" y="30" width="6" height="466" fill="#00aee7" style={{ transformOrigin: '329px 496px' }} {...draw(0.6)} />
              <motion.rect x="332" y="30" width="6" height="460" fill="#008fbf" style={{ transformOrigin: '335px 490px' }} {...draw(0.7)} />
              <motion.rect x="326" y="484" width="274" height="6" fill="#008fbf" style={{ transformOrigin: '326px 487px' }} {...draw(0.8, 'y')} />
              <motion.rect x="326" y="490" width="274" height="6" fill="#00aee7" style={{ transformOrigin: '326px 493px' }} {...draw(0.9, 'y')} />
            </g>

            {/* Primer */}
            <g style={dim('primer')}>
              <motion.rect x="338" y="30" width="4" height="450" fill="#5b4a3a" style={{ transformOrigin: '340px 480px' }} {...draw(0.4)} />
              <motion.rect x="338" y="480" width="262" height="4" fill="#5b4a3a" style={{ transformOrigin: '338px 482px' }} {...draw(0.5, 'y')} />
            </g>

            {/* Concrete wall + slab */}
            <g style={dim('concrete')}>
              <motion.path d="M342 30 H430 V400 H600 V480 H342 Z" fill="url(#concrete)"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, ease }} />
              {/* rebar */}
              {[362, 410].map((x) => <line key={x} x1={x} y1="40" x2={x} y2="460" stroke="#6f7a80" strokeWidth="3" strokeDasharray="2 0" opacity=".55" />)}
              <line x1="352" y1="420" x2="592" y2="420" stroke="#6f7a80" strokeWidth="3" opacity=".55" />
              <line x1="352" y1="462" x2="592" y2="462" stroke="#6f7a80" strokeWidth="3" opacity=".55" />
            </g>

            {/* Pile + pile head treatment */}
            <g style={dim('pile')}>
              <rect x="470" y="508" width="60" height="52" fill="url(#concrete)" />
              <motion.rect x="462" y="496" width="76" height="20" rx="3" fill="#e2733b"
                initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                style={{ transformOrigin: '500px 506px' }} transition={{ duration: 0.8, delay: 1.3, ease }} />
            </g>

            {/* Dry interior */}
            <rect x="430" y="30" width="170" height="370" fill="#16364d" />
            <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.6, duration: 0.8 }}>
              <text x="515" y="210" textAnchor="middle" fill="#9fdcf2" fontSize="15" fontWeight="700" fontFamily="Archivo, sans-serif">Dry basement</text>
              <text x="515" y="232" textAnchor="middle" fill="#9fdcf2" fontSize="12" opacity=".7" fontFamily="Public Sans, sans-serif">B1 – B3</text>
            </motion.g>

            {/* Ground line */}
            <rect x="0" y="0" width="600" height="30" fill="#0f2635" />
            <line x1="0" y1="30" x2="430" y2="30" stroke="#6f7a80" strokeWidth="2" strokeDasharray="8 6" />
            <text x="24" y="21" fill="#8c9aa3" fontSize="12" fontFamily="Public Sans, sans-serif">Ground level</text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
