import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { WordReveal, Reveal } from './Reveal';

/*
  Section through a waterproofed pile cap, following the approved shop drawing
  (two layers of 4 mm SBS membrane, 6 mm protection board, epoxy-grouted pile heads).
  The legend follows the build sequence from the outside in:
  groundwater → pile head treatment → block work → primer → SBS membrane → protection → concrete.
  Scrolling raises the groundwater; selecting a layer isolates it in the drawing.
*/

const LAYERS = [
  { id: 'water', name: 'Groundwater', color: '#38bdf8', desc: 'Dubai’s high water table presses on every pile cap, beam and raft from below and from the sides.' },
  { id: 'pile', name: 'Pile head treatment', color: '#f59e0b', desc: '15–20 mm epoxy grout on the top and sides of each pile head seals the weakest point, where the pile enters the cap.' },
  { id: 'block', name: 'Block work', color: '#94a3b8', desc: 'Built around the pile cap on the blinding as a permanent shutter, giving the membrane a firm surface to bond to.' },
  { id: 'primer', name: 'Bitumen primer', color: '#a16207', desc: 'One coat on the blinding and block work so the membrane bonds fully, with no voids for water to travel along.' },
  { id: 'membrane', name: 'SBS membrane', color: '#0ea5e9', desc: 'Two layers of 4 mm SBS modified bitumen membrane, torch-applied with lapped joints. The watertight barrier.' },
  { id: 'board', name: 'Protection', color: '#e2e8f0', desc: '6 mm protection board on the walls and protection screed over polythene on the base, so steel fixing and the pour can’t damage the membrane.' },
  { id: 'concrete', name: 'Concrete structure', color: '#cbd5e1', desc: 'The pile cap and column neck are poured inside the finished tanking, fully enclosed and dry.' },
];

const ease = [0.22, 1, 0.36, 1];

/* geometry */
const G = {
  ground: 62, blockL: [96, 124], blockR: [476, 504], capTop: 150, blindTop: 430, blindBot: 448,
  piles: [[176, 246], [354, 424]], pileTop: 392, neck: [266, 334],
};

export default function CrossSection({ tone = 'ink' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [active, setActive] = useState(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const waterY = useTransform(smooth, [0, 1], [560, 110]);

  const dim = (id) => ({ opacity: active && active !== id ? 0.14 : 1, transition: 'opacity .35s' });
  const seq = (n) => 0.25 + n * 0.28;
  const grow = (n, origin, axis = 'y') => ({
    initial: { [axis === 'y' ? 'scaleY' : 'scaleX']: 0 },
    animate: inView ? { [axis === 'y' ? 'scaleY' : 'scaleX']: 1 } : {},
    transition: { duration: 0.8, delay: seq(n), ease },
    style: { transformOrigin: origin, transformBox: 'fill-box' },
  });
  const fade = (n) => ({ initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : {}, transition: { duration: 0.7, delay: seq(n) } });

  const { blockL, blockR, capTop, blindTop, blindBot, piles, pileTop, neck, ground } = G;
  const inL = blockL[1], inR = blockR[0];

  return (
    <section className={`section section--${tone}`} ref={ref}>
      <div className="wrap xsec">
        <div>
          <WordReveal className="section__title" text="How we waterproof a pile cap" />
          <Reveal delay={0.15}>
            <p className="section__lede" style={{ marginTop: '1.2rem' }}>
              Taken from our approved shop drawing. The system is built from the outside in, in this order.
              Scroll to raise the groundwater, and select a layer to see what it does.
            </p>
          </Reveal>
          <ol className="xsec__legend">
            {LAYERS.map((l, n) => (
              <motion.li key={l.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + n * 0.07, ease }}>
                <button
                  className={active === l.id ? 'is-on' : ''}
                  onMouseEnter={() => setActive(l.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(l.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === l.id ? null : l.id))}
                  aria-pressed={active === l.id}
                >
                  <span className="xsec__num" style={{ '--c': l.color }}>{n + 1}</span>
                  <span>
                    <strong>{l.name}</strong>
                    <AnimatePresence initial={false}>
                      {active === l.id && (
                        <motion.span className="desc-wrap" style={{ display: 'block' }}
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}>
                          <span className="desc">{l.desc}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal y={50} className="xsec__frame">
          <svg className="xsec__svg" viewBox="0 0 600 560" role="img"
            aria-label="Cross-section of a pile cap: epoxy-grouted pile heads, block work shutter, bitumen primer, two layers of SBS membrane, protection board and the concrete pile cap, with groundwater held outside">
            <defs>
              <pattern id="xs-soil" width="18" height="18" patternUnits="userSpaceOnUse">
                <rect width="18" height="18" fill="#2b2419" />
                <circle cx="4" cy="5" r="1.3" fill="#473b2d" />
                <circle cx="13" cy="12" r="1.7" fill="#3c3225" />
                <circle cx="9" cy="16" r="0.9" fill="#5a4a39" />
              </pattern>
              <pattern id="xs-conc" width="22" height="22" patternUnits="userSpaceOnUse">
                <rect width="22" height="22" fill="#cbd5e1" />
                <circle cx="5" cy="6" r="1.3" fill="#a9b4c2" />
                <circle cx="16" cy="14" r="1.7" fill="#b4bfcc" />
                <path d="M9 18 l3 -2 l2 3 z" fill="#9ba7b6" />
              </pattern>
              <pattern id="xs-pile" width="22" height="22" patternUnits="userSpaceOnUse">
                <rect width="22" height="22" fill="#b8c2cf" />
                <circle cx="7" cy="8" r="1.5" fill="#97a3b3" />
                <path d="M14 16 l3 -2 l2 3 z" fill="#8e9aab" />
              </pattern>
              <pattern id="xs-block" width="28" height="20" patternUnits="userSpaceOnUse">
                <rect width="28" height="20" fill="#94a3b8" />
                <path d="M0 0.5 H28 M0 10.5 H28 M14 0 V10 M0 10 V20 M28 10 V20" stroke="#64748b" strokeWidth="1" />
              </pattern>
              <clipPath id="xs-below"><rect x="0" y={ground} width="600" height={560 - ground} /></clipPath>
            </defs>

            {/* Soil */}
            <rect x="0" y={ground} width="600" height={560 - ground} fill="url(#xs-soil)" />

            {/* Groundwater rises with scroll (drawn under the structure) */}
            <g clipPath="url(#xs-below)" style={dim('water')}>
              <motion.g style={{ y: waterY }}>
                <motion.path
                  d="M0 2 C75 -10 225 14 300 2 S525 -10 600 2 S825 14 900 2 S1125 -10 1200 2 V10 H0 Z"
                  fill="rgba(56,189,248,0.75)"
                  animate={{ x: [0, -600] }}
                  transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
                />
                <rect x="0" y="6" width="600" height="600" fill="rgba(56,189,248,0.75)" />
                {[30, 520].map((x, n) => (
                  <motion.path key={x}
                    d={n === 0 ? `M${x} 70 h40 m-10 -8 l10 8 l-10 8` : `M${x + 40} 70 h-40 m10 -8 l-10 8 l10 8`}
                    stroke="#e0f2fe" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ x: n === 0 ? [0, 14, 0] : [0, -14, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
                ))}
              </motion.g>
            </g>

            {/* Concrete blinding */}
            <rect x={blockL[0] - 8} y={blindTop} width={blockR[1] - blockL[0] + 16} height={blindBot - blindTop} fill="#7c8796" />

            {/* 2 — Block work shutter */}
            <g style={dim('block')}>
              <motion.rect x={blockL[0]} y={capTop} width={blockL[1] - blockL[0]} height={blindTop - capTop} fill="url(#xs-block)" {...grow(2, 'bottom')} />
              <motion.rect x={blockR[0]} y={capTop} width={blockR[1] - blockR[0]} height={blindTop - capTop} fill="url(#xs-block)" {...grow(2, 'bottom')} />
            </g>

            {/* 3 — Primer (inner face of block work + blinding) */}
            <g style={dim('primer')}>
              <motion.rect x={inL} y={capTop} width="3" height={blindTop - capTop} fill="#a16207" {...grow(3, 'bottom')} />
              <motion.rect x={inR - 3} y={capTop} width="3" height={blindTop - capTop} fill="#a16207" {...grow(3, 'bottom')} />
              <motion.rect x={inL} y={blindTop - 3} width={inR - inL} height="3" fill="#a16207" {...grow(3, 'left', 'x')} />
            </g>

            {/* 4 — Two layers SBS membrane, turned up around the pile heads */}
            <g style={dim('membrane')}>
              {[[3, '#0ea5e9'], [8, '#0369a1']].map(([o, c], k) => (
                <g key={o}>
                  <motion.rect x={inL + o} y={capTop} width="5" height={blindTop - 3 - capTop} fill={c} {...grow(4 + k * 0.3, 'bottom')} />
                  <motion.rect x={inR - o - 5} y={capTop} width="5" height={blindTop - 3 - capTop} fill={c} {...grow(4 + k * 0.3, 'bottom')} />
                  <motion.rect x={inL + o} y={blindTop - 3 - o - 5 + 3} width={inR - inL - 2 * o} height="5" fill={c} {...grow(4 + k * 0.3, 'left', 'x')} />
                </g>
              ))}
            </g>

            {/* 5 — Protection board (walls) and screed (base) */}
            <g style={dim('board')}>
              <motion.rect x={inL + 13} y={capTop} width="6" height={blindTop - 13 - capTop} fill="#e2e8f0" {...grow(5, 'bottom')} />
              <motion.rect x={inR - 19} y={capTop} width="6" height={blindTop - 13 - capTop} fill="#e2e8f0" {...grow(5, 'bottom')} />
              <motion.rect x={inL + 13} y={blindTop - 22} width={inR - inL - 26} height="9" fill="#d6dde6" {...grow(5, 'left', 'x')} />
            </g>

            {/* 6 — Concrete pile cap + column neck */}
            <g style={dim('concrete')}>
              <motion.path
                d={`M${inL + 19} ${capTop} H${neck[0]} V${ground + 20} H${neck[1]} V${capTop} H${inR - 19} V${blindTop - 22} H${inL + 19} Z`}
                fill="url(#xs-conc)" {...fade(6)} />
              <motion.g {...fade(6.2)} stroke="#64748b" strokeWidth="3" opacity=".6">
                <line x1={inL + 30} y1="176" x2={inR - 30} y2="176" />
                <line x1={inL + 30} y1="380" x2={inR - 30} y2="380" />
                <line x1={neck[0] + 12} y1={ground + 24} x2={neck[0] + 12} y2="370" />
                <line x1={neck[1] - 12} y1={ground + 24} x2={neck[1] - 12} y2="370" />
              </motion.g>
            </g>

            {/* 1 — Piles + pile head treatment */}
            <g style={dim('pile')}>
              {piles.map(([a, b]) => (
                <g key={a}>
                  <rect x={a} y={pileTop} width={b - a} height={560 - pileTop} fill="url(#xs-pile)" />
                  <motion.path
                    d={`M${a - 8} ${blindTop - 2} V${pileTop - 8} H${b + 8} V${blindTop - 2} H${b} V${pileTop} H${a} V${blindTop - 2} Z`}
                    fill="#f59e0b" {...fade(1)} />
                  {[a + 14, a + 35, b - 14].map((x) => (
                    <line key={x} x1={x} y1={pileTop - 8} x2={x} y2="196" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
                  ))}
                </g>
              ))}
            </g>

            <g style={dim('membrane')}>
              {piles.map(([a, b]) => (
                <motion.path key={a} {...fade(4.3)}
                  d={`M${a - 18} ${blindTop - 13} V${pileTop + 8} H${a - 8} V${blindTop - 13} Z M${b + 8} ${blindTop - 13} V${pileTop + 8} H${b + 18} V${blindTop - 13} Z`}
                  fill="#0ea5e9" />
              ))}
            </g>

            {/* Grade slab + column neck upturn */}
            <rect x="0" y={ground} width={neck[0] - 12} height="20" fill="#475569" />
            <rect x={neck[1] + 12} y={ground} width={600 - neck[1] - 12} height="20" fill="#475569" />
            <g style={dim('membrane')}>
              <rect x={neck[0] - 6} y={ground + 20} width="6" height={capTop - ground - 20} fill="#0ea5e9" />
              <rect x={neck[1]} y={ground + 20} width="6" height={capTop - ground - 20} fill="#0ea5e9" />
              <rect x={inL} y={capTop - 6} width={neck[0] - inL} height="6" fill="#0ea5e9" />
              <rect x={neck[1]} y={capTop - 6} width={inR - neck[1]} height="6" fill="#0ea5e9" />
            </g>
            <g style={dim('board')}>
              <rect x={neck[0] - 12} y={ground + 20} width="6" height={capTop - ground - 26} fill="#e2e8f0" />
              <rect x={neck[1] + 6} y={ground + 20} width="6" height={capTop - ground - 26} fill="#e2e8f0" />
            </g>
            <rect x={neck[0]} y={ground} width={neck[1] - neck[0]} height="20" fill="url(#xs-conc)" />

            {/* Sky / ground line */}
            <rect x="0" y="0" width="600" height={ground} fill="#0b1b2e" />
            <line x1="0" y1={ground} x2="600" y2={ground} stroke="#64748b" strokeWidth="1.5" strokeDasharray="7 6" />
            <text x="20" y="40" fill="#94a3b8" fontSize="12" fontFamily="Public Sans, sans-serif">Grade slab</text>

            {/* Callouts */}
            <motion.g {...fade(7)} fontFamily="Public Sans, sans-serif" fontSize="11.5" fill="#e2e8f0">
              <text x={(inL + inR) / 2} y="286" textAnchor="middle" fill="#1e293b" fontWeight="700" fontSize="14" fontFamily="Archivo, sans-serif">Pile cap</text>
              <text x={(inL + inR) / 2} y="304" textAnchor="middle" fill="#334155" fontSize="11.5">Dry, fully tanked</text>
              <line x1={piles[0][0] - 8} y1={pileTop - 8} x2="120" y2="500" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="20" y="518" fill="#fbbf24">Epoxy grout 15–20 mm</text>
              <line x1={inR - 8} y1="250" x2="560" y2="214" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="585" y="200" textAnchor="end" fill="#7dd3fc">2 × 4 mm SBS</text>
            </motion.g>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
