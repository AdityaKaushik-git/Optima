import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Check, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CrossSection from '../components/CrossSection';
import Warranty from '../components/Warranty';
import CTABand from '../components/CTABand';
import { Reveal, WordReveal } from '../components/Reveal';
import { useBooking } from '../components/Booking';
import { services, heroSlides } from '../data/site';

export default function Services() {
  const [current, setCurrent] = useState(services[0].slug);

  useEffect(() => {
    const els = services.map((s) => document.getElementById(`svc-${s.slug}`)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id.replace('svc-', ''))),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (slug) => document.getElementById(`svc-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <PageHeader
        title="Waterproofing services"
        crumb="Services"
        lede="Five waterproofing systems, from the pile heads to the roof. Each one installed by manufacturer-approved applicators and inspected layer by layer."
        image={heroSlides[0]}
      />

      <div className="svc-tabs">
        <div className="wrap">
          <nav className="svc-tabs__inner glass-card" aria-label="Services on this page">
            {services.map((s) => (
              <button key={s.slug} className={current === s.slug ? 'is-on' : undefined} onClick={() => jump(s.slug)} aria-current={current === s.slug ? 'true' : undefined}>
                <s.icon size={17} /> <span>{s.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {services.map((s, i) => (
        <Fragment key={s.slug}>
          <ServiceDetail s={s} flip={i % 2 === 1} />
          {s.slug === 'substructure' && <CrossSection />}
        </Fragment>
      ))}

      <section className="section" style={{ paddingTop: 0 }}>
        <Warranty />
      </section>

      <CTABand title="Not sure which system you need?" text="Send us your drawings or book a site visit. We'll recommend the right system and prepare the submittals for your consultant." />
    </>
  );
}

function SafeImg({ src, alt, Icon }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <div className="img-fallback" role="img" aria-label={alt}><Icon size={96} strokeWidth={1} /></div>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} />;
}

function ServiceDetail({ s, flip }) {
  const { open } = useBooking();
  return (
    <section id={`svc-${s.slug}`} className="section svc-detail">
      <div className={`wrap svc-detail__grid${flip ? ' is-flip' : ''}`}>
        <Reveal className="svc-detail__media" y={50}>
          <div className="svc-detail__main">
            <SafeImg src={s.image} alt={s.title} Icon={s.icon} />
            <span className="svc-detail__icon glass-card"><s.icon size={26} /></span>
          </div>
          {s.gallery.length > 0 && (
            <div className="svc-detail__thumbs">
              {s.gallery.map((g) => <img key={g} src={g} alt="" loading="lazy" />)}
            </div>
          )}
        </Reveal>

        <div className="svc-detail__body">
          <WordReveal className="svc-detail__title" text={s.title} />
          <Reveal delay={0.05}><p className="svc-detail__intro">{s.intro}</p></Reveal>

          {s.warranty && (
            <Reveal delay={0.08}>
              <p className="svc-detail__warranty"><ShieldCheck size={18} /> 10 to 20 years’ written warranty, depending on the structure</p>
            </Reveal>
          )}

          <Reveal delay={0.1} className="svc-block">
            <h3>Where we use it</h3>
            <ul className="chips">{s.usedFor.map((u) => <li key={u}>{u}</li>)}</ul>
          </Reveal>

          <Reveal delay={0.12} className="svc-block">
            <h3>How the system is built</h3>
            <ol className="buildup">
              {s.steps.map((st, n) => (
                <motion.li key={st}
                  initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: n * 0.06 }}>
                  <span>{n + 1}</span>{st}
                </motion.li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.14} className="svc-block">
            <h3>Approved materials we install</h3>
            <ul className="ticks">{s.materials.map((m) => <li key={m}><Check size={16} /> {m}</li>)}</ul>
          </Reveal>

          <Reveal delay={0.16}>
            <button className="btn" onClick={() => open(s.title)}><CalendarCheck size={18} /> Book a site visit</button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
