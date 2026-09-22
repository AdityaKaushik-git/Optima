import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, index, onClose, onChange }) {
  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, index, images.length, onClose, onChange]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Project photo"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button className="modal__close" onClick={onClose} aria-label="Close"><X size={20} /></button>
          <AnimatePresence mode="wait">
            <motion.img key={images[index]} src={images[index]} alt=""
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }} />
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <button className="icon-btn lightbox__nav lightbox__nav--prev" aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }}><ChevronLeft size={22} /></button>
              <button className="icon-btn lightbox__nav lightbox__nav--next" aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length); }}><ChevronRight size={22} /></button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
