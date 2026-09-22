import { useState, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

const ProjectCard = forwardRef(function ProjectCard({ p }, ref) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [lb, setLb] = useState(null);
  const n = p.images.length;
  const go = (d) => { setDir(d); setIdx((i) => (i + d + n) % n); };

  return (
    <motion.article
      ref={ref}
      className="project"
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project__media">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={p.images[idx]}
            src={p.images[idx]}
            alt={`${p.title}, photo ${idx + 1} of ${n}`}
            loading="lazy"
            custom={dir}
            variants={{
              enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
              center: { x: '0%' },
              exit: (d) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0.4 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
            onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
          />
        </AnimatePresence>
        <button className="icon-btn project__zoom" onClick={() => setLb(idx)} aria-label="View photo full screen"><Maximize2 size={18} /></button>
        <div className="project__nav">
          <span className="project__count">{idx + 1} / {n}</span>
          <div className="project__arrows">
            <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft size={20} /></button>
            <button className="icon-btn" onClick={() => go(1)} aria-label="Next photo"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      <div className="project__body">
        <span className="project__loc"><MapPin size={16} /> {p.location}</span>
        <h2 className="project__title">{p.title}</h2>
        <dl className="project__facts">
          <div><dt>Scope of work</dt><dd>{p.scope}</dd></div>
          <div><dt>System used</dt><dd>{p.system}</dd></div>
          <div><dt>Main contractor</dt><dd>{p.contractor}</dd></div>
        </dl>
        <div className="project__cs">
          <div><h4>The challenge</h4><p>{p.challenge}</p></div>
          <div><h4>Our solution</h4><p>{p.solution}</p></div>
        </div>
        <div className="tags">{p.categories.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
      </div>

      <Lightbox images={p.images} index={lb} onClose={() => setLb(null)} onChange={setLb} />
    </motion.article>
  );
});

export default ProjectCard;
