import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';
import Team from '../components/Team';
import Credentials from '../components/Credentials';
import { Reveal, Stagger, item, WordReveal } from '../components/Reveal';
import { about, heroSlides, services, reasons, local } from '../data/site';

export default function About() {
  return (
    <>
      <PageHeader
        title="About us"
        lede="A Dubai waterproofing contractor built around one job: keeping water out of buildings."
        image={heroSlides[2]}
      />

      <section className="section">
        <div className="wrap intro">
          <motion.div
            className="about-collage"
            initial={{ clipPath: 'inset(0 100% 0 0 round 28px)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0 round 28px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <img src={local('sbs-torch-applied.jpg')} alt="Torch-applying SBS membrane on site" />
            <img src={local('pile-head-treatment.jpg')} alt="Pile heads treated with epoxy grout" />
            <img src={local('pile-cap-membrane.jpg')} alt="Pile cap tanked with SBS membrane" />
          </motion.div>
          <div className="intro__body">
            <WordReveal className="section__title" text="Optima Star Technical Services" />
            <Reveal><p>Optima Star Technical Services L.L.C. is a Dubai-licensed waterproofing contractor. We work for main contractors, consultants and developers on residential towers, commercial buildings, villas and infrastructure.</p></Reveal>
            <Reveal delay={0.05}><p>We are approved applicators for Soprema, Mapei, Petrozo, Geobit, Royal Industries, Corrotech and Innochem, and we have been pre-qualified on projects reviewed by EDMAC, National Engineering Bureau, AREC, BDA and FACE Architecture.</p></Reveal>
            <Reveal delay={0.1}><p>Our engineers prepare the pre-qualification file, material submittals, method statements and shop drawings. Our own applicators install the system, and a non-working superintendent checks every lap before it is covered.</p></Reveal>
            <Stagger as="ul" className="intro__list" gap={0.04}>
              {services.map((s) => <motion.li key={s.title} variants={item}>{s.title}</motion.li>)}
            </Stagger>
          </div>
        </div>
      </section>

      <Team />

      <section className="section section--white" style={{ paddingTop: 'clamp(4rem,8vw,6rem)' }}>
        <div className="wrap">
          <Stagger className="mv" gap={0.15}>
            <motion.div className="mv__card mv__card--dark" variants={item}>
              <Target size={36} color="var(--star)" />
              <h2>Our mission</h2>
              {about.mission.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>
            <motion.div className="mv__card glass-card" variants={item}>
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
            <h2 className="visually-hidden">Message from the managing partner</h2>
            {about.chairman.map((p, i) => <Reveal key={i} delay={i * 0.1}><p>{p}</p></Reveal>)}
            <Reveal delay={0.3}><p className="quote__sig">Managing Partner, Optima Star Technical Services L.L.C.</p></Reveal>
          </div>
        </div>
      </section>

      <Credentials tone="plain" />

      <section className="section section--white">
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

      <CTABand title="Ready to work with us?" text="Tell us about your project and we'll send our pre-qualification file for your consultant." />
    </>
  );
}
