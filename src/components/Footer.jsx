import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { company, services } from '../data/site';
import { links } from './Navbar';
import Wave from './Wave';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wave"><Wave fill="#0b1e2b" duration={14} amplitude={14} /></div>
      <div className="wrap">
        <div className="footer__big">
          Got a leak?<br />
          <Link to="/contact">Let's seal it <ArrowUpRight size="0.8em" strokeWidth={2.5} /></Link>
        </div>
        <div className="footer__grid">
          <div>
            <img src={company.logoDark} alt={company.name} />
            <p style={{ fontSize: '.95rem', maxWidth: '34ch' }}>
              Manufacturer-approved waterproofing applicator in Dubai: substructure, wet area, combo roof,
              injection and GRP lining.
            </p>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>{links.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>{services.map((s) => <li key={s.title}><Link to="/services">{s.title}</Link></li>)}</ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul className="footer__contact">
              <li><Phone size={16} /><span>{company.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} style={{ display: 'block' }}>{p.display}</a>)}</span></li>
              <li><Mail size={16} /><a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><MapPin size={16} /><span>{company.address}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom wrap">
        <span>© {new Date().getFullYear()} {company.legal} All rights reserved.</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--step--1)' }}>
          Designed &amp; built by <strong style={{ color: 'var(--star)', fontWeight: 600 }}>Aditya Kaushik</strong>
        </span>
        <span>Waterproofing specialists in Dubai, U.A.E. Licence No. {company.licence}</span>
      </div>
    </footer>
  );
}
