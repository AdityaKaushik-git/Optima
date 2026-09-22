import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { BookingForm } from '../components/Booking';
import { Reveal, Stagger, item } from '../components/Reveal';
import { company, heroSlides } from '../data/site';

export default function Contact() {
  const cards = [
    ...company.phones.map((p) => ({ icon: Phone, label: `Call (${p.label.toLowerCase()})`, value: p.display, href: `tel:${p.tel}` })),
    { icon: MessageCircle, label: 'WhatsApp', value: company.phones[1].display, href: `https://wa.me/${company.whatsapp}` },
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: 'Office', value: company.address },
    { icon: Clock, label: 'Working hours', value: company.hours },
  ];

  return (
    <>
      <PageHeader title="Contact us" lede="Call, message or send a request. We'll arrange a site inspection at a time that suits you." image={heroSlides[2]} />
      <section className="section">
        <div className="wrap contact">
          <div>
            <Stagger className="contact__cards" gap={0.06}>
              {cards.map((c) => {
                const Tag = c.href ? 'a' : 'div';
                return (
                  <motion.div key={c.label + c.value} variants={item}>
                    <Tag className="ccard" {...(c.href ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}>
                      <span className="ccard__icon"><c.icon size={22} /></span>
                      <span><small>{c.label}</small><strong>{c.value}</strong></span>
                    </Tag>
                  </motion.div>
                );
              })}
            </Stagger>
            <Reveal className="map">
              <iframe title="Office location map" src={company.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </Reveal>
          </div>
          <Reveal delay={0.1}><BookingForm /></Reveal>
        </div>
      </section>
    </>
  );
}
