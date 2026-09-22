import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';
import { Reveal, Stagger, item, WordReveal } from '../components/Reveal';
import { about, heroSlides, teamImage, services, reasons } from '../data/site';

export default function About() {
  return (
    <>
      <PageHeader
        title="About us"
        lede="A UAE technical contracting company built around one specialisation: keeping water out of buildings."
        image={heroSlides[4]}
      />

      <section className="section">
        <div className="wrap intro">
          <motion.div
            style={{ borderRadius: 28, overflow: 'hidden' }}
            initial={{ clipPath: 'inset(0 100% 0 0 round 28px)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0 round 28px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <img className="intro__img" src={teamImage} alt="The Optima Star team on site" />
          </motion.div>
          <div className="intro__body">
            <WordReveal className="section__title" text="Optima Star Technical Services" />
            <Reveal><p>Optima Star Technical Services L.L.C. is a UAE-based technical contracting company providing waterproofing, civil, interior and engineering support services for residential, commercial and industrial projects.</p></Reveal>
            <Reveal delay={0.05}><p>With hands-on industry experience and a practical approach to project execution, we deliver reliable solutions tailored to modern construction requirements across the U.A.E. Our team is committed to high standards of workmanship, safety, technical accuracy and timely delivery.</p></Reveal>
            <Reveal delay={0.1}><p>Waterproofing is one of our core specialisations, including SBS membrane, wet area, injection, combo systems and pile head treatment for many structure types, designed for long-term protection against water ingress and structural deterioration.</p></Reveal>
            <Stagger as="ul" className="intro__list" gap={0.04}>
              {services.map((s) => <motion.li key={s.title} className={s.featured ? 'is-core' : undefined} variants={item}>{s.title}</motion.li>)}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section section--white" style={{ paddingTop: 'clamp(4rem,8vw,6rem)' }}>
        <div className="wrap">
          <Stagger className="mv" gap={0.15}>
            <motion.div className="mv__card mv__card--dark" variants={item}>
              <Target size={36} color="var(--star)" />
              <h2>Our mission</h2>
              {about.mission.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>
            <motion.div className="mv__card" variants={item} style={{ background: 'var(--concrete)' }}>
              <Eye size={36} color="var(--water-deep)" />
              <h2>Our vision</h2>
              {about.vision.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>
          </Stagger>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap quote">
          <motion.div className="quote__mark" aria-hidden="true"
            initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}>“</motion.div>
          <div className="quote__text">
            <h2 className="visually-hidden">Chairman's message</h2>
            {about.chairman.map((p, i) => <Reveal key={i} delay={i * 0.1}><p>{p}</p></Reveal>)}
            <Reveal delay={0.3}><p className="quote__sig">Chairman, Optima Star Technical Services L.L.C.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head"><WordReveal className="section__title" text="What we stand for" /></div>
          <Stagger className="reasons">
            {reasons.map((r) => (
              <motion.div className="reason" key={r.title} variants={item}>
                <div className="reason__icon"><r.icon size={26} /></div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand title="Ready to work with us?" text="Tell us about your project and we'll show you how our team can help." />
    </>
  );
}
