import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { company } from '../data/site';
import { useBooking } from './Booking';

export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 500 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setDrawer(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : ''; }, [drawer]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--solid' : 'nav--over'}`}
        animate={{ y: hidden && !drawer ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="wrap" aria-label="Main">
          <Link to="/" className="nav__logo" aria-label={`${company.name} home`}>
            <img src={scrolled ? company.logo : company.logoDark} alt={company.name} />
          </Link>
          <ul className="nav__links">
            {links.map((l) => {
              const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
              return (
                <li key={l.to} style={{ position: 'relative', isolation: 'isolate' }}>
                  <NavLink to={l.to} className={`nav__link${active ? ' is-active' : ''}`}>
                    {active && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    {l.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="nav__cta">
            <button className="btn btn--small" onClick={() => open()}><CalendarCheck size={17} /> Book appointment</button>
            <button className="nav__burger" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer}><Menu size={22} /></button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {drawer && (
          <motion.div
            className="drawer"
            initial={{ clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="drawer__head">
              <img src={company.logo} alt={company.name} />
              <button className="drawer__close" onClick={() => setDrawer(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <motion.ul className="drawer__links" initial="h" animate="s"
              variants={{ h: {}, s: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}>
              {links.map((l) => (
                <motion.li key={l.to} variants={{ h: { opacity: 0, x: -40 }, s: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>{l.label}</NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <div className="drawer__foot">
              <button className="btn" style={{ justifySelf: 'start', marginBottom: '1rem' }} onClick={() => { setDrawer(false); open(); }}>
                <CalendarCheck size={18} /> Book appointment
              </button>
              <a href={`tel:${company.phones[0].tel}`}>{company.phones[0].display}</a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
