import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { company } from '../data/site';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar__group">
          <a href={`tel:${company.phones[0].tel}`}><Phone size={15} /> {company.phones[0].display}</a>
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> {company.phones[1].display}</a>
          <a className="topbar__hide-sm" href={`mailto:${company.email}`}><Mail size={15} /> {company.email}</a>
        </div>
        <div className="topbar__group topbar__promo topbar__hide-md" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--star)' }}>
          Call us today for a quote on your Home Renovation and enjoy our exclusive discount!
        </div>
        <div className="topbar__group topbar__hide-sm">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem' }}><MapPin size={15} /> Deira, Dubai, U.A.E</span>
        </div>
      </div>
    </div>
  );
}
