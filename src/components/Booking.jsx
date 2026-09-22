import { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';
import { company, services } from '../data/site';

const BookingCtx = createContext({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

export function BookingProvider({ children }) {
  const [state, setState] = useState({ open: false, service: '' });
  const open = (service = '') => setState({ open: true, service });
  const close = () => setState((s) => ({ ...s, open: false }));

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [state.open]);

  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div className="modal" role="dialog" aria-modal="true" aria-label="Book an appointment"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="modal__scrim" onClick={close} />
            <motion.div className="modal__box"
              initial={{ y: 60, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <button className="modal__close" onClick={close} aria-label="Close"><X size={20} /></button>
              <BookingForm defaultService={state.service} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookingCtx.Provider>
  );
}

const empty = { name: '', phone: '', email: '', service: '', location: '', message: '' };

/**
 * No backend is required: on submit the request opens in WhatsApp with every
 * detail pre-filled, with email as an alternative. To receive submissions
 * directly, post `values` to Formspree, EmailJS or your own API in `handleSubmit`.
 */
export function BookingForm({ defaultService = '' }) {
  const [values, setValues] = useState({ ...empty, service: defaultService });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const buildMessage = () =>
    [
      'New appointment request',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.service && `Service: ${values.service}`,
      values.location && `Location: ${values.location}`,
      values.message && `Details: ${values.message}`,
    ].filter(Boolean).join('\n');

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = 'Enter your name so we know who to ask for.';
    if (!/^[+\d][\d\s-]{6,}$/.test(values.phone.trim())) e.phone = 'Enter a phone number, for example +971 50 123 4567.';
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'This email address looks incomplete.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(buildMessage())}`, '_blank', 'noopener');
    setSent(true);
  };

  const mailto = `mailto:${company.email}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(buildMessage())}`;

  if (sent) {
    return (
      <div className="form">
        <motion.div className="form__done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
            <CheckCircle2 size={56} />
          </motion.div>
          <h2>Request ready to send</h2>
          <p style={{ color: 'rgba(255,255,255,.75)' }}>
            WhatsApp has opened with your details. Press send there and our team will call you back to arrange a site visit.
            If WhatsApp didn't open, send the same details by email.
          </p>
          <div className="form__actions">
            <a className="btn" href={mailto}><Mail size={18} /> Send by email</a>
            <button className="btn btn--ghost" onClick={() => { setValues(empty); setSent(false); }}>Start a new request</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Book an appointment</h2>
      <p>Tell us what needs fixing. We'll call you to arrange a site inspection and a written quote.</p>
      <div className="form__row">
        <Field label="Full name" error={errors.name}><input id="f-name" value={values.name} onChange={set('name')} placeholder=" " autoComplete="name" /></Field>
        <Field label="Phone number" error={errors.phone}><input id="f-phone" type="tel" value={values.phone} onChange={set('phone')} placeholder=" " autoComplete="tel" /></Field>
      </div>
      <div className="form__row">
        <Field label="Email (optional)" error={errors.email}><input id="f-email" type="email" value={values.email} onChange={set('email')} placeholder=" " autoComplete="email" /></Field>
        <Field label="Service needed">
          <select id="f-service" value={values.service} onChange={set('service')}>
            <option value="">Not sure yet</option>
            {services.map((s) => <option key={s.title}>{s.title}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Area or community in the UAE"><input id="f-loc" value={values.location} onChange={set('location')} placeholder=" " /></Field>
      <Field label="Describe the problem or project"><textarea id="f-msg" value={values.message} onChange={set('message')} placeholder=" " /></Field>
      <div className="form__actions">
        <button className="btn" type="submit"><Send size={18} /> Send request on WhatsApp</button>
        <span className="form__note">Opens WhatsApp with your details filled in.</span>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  const id = children.props.id;
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      {children}
      <label htmlFor={id}>{label}</label>
      <AnimatePresence>
        {error && (
          <motion.span className="field__err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
