import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Droplets } from 'lucide-react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import CrossSection from '../components/CrossSection';
import WaterproofingPanels from '../components/WaterproofingPanels';
import CTABand from '../components/CTABand';
import { Reveal, Stagger, item, WordReveal } from '../components/Reveal';
import { services, reasons, projects, process, teamImage } from '../data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />

      <section className="section section--white">
        <div className="wrap">
          <div className="section__head section__head--split">
            <WordReveal className="section__title" text="Our waterproofing services" />
            <Reveal delay={0.1}>
              <p className="section__lede">
                Waterproofing is our primary specialisation. Our certified team installs systems for
                residential and commercial projects across the UAE, built to protect the structure for the long term.
              </p>
            </Reveal>
          </div>
          <WaterproofingPanels />
          <Reveal style={{ marginTop: '2rem' }}>
            <Link className="link-arrow" to="/services">View all services <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
      </section>

      <CrossSection />

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <WordReveal className="section__title" text="Why clients choose Optima Star" />
            <Reveal delay={0.1}>
              <p className="section__lede">We're committed to delivering the best waterproofing and technical services in Dubai, and it shows in how we work.</p>
            </Reveal>
          </div>
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

      <section className="section section--white">
        <div className="wrap">
          <div className="section__head section__head--split">
            <WordReveal className="section__title" text="Recent projects" />
            <Reveal delay={0.1}>
              <p className="section__lede">Substructure waterproofing for residential and commercial buildings in Dubai.</p>
              <Link className="link-arrow" to="/projects" style={{ marginTop: '1rem' }}>See all case studies <ArrowRight size={18} /></Link>
            </Reveal>
          </div>
          <Stagger className="teasers" gap={0.12}>
            {projects.map((p) => (
              <motion.div key={p.id} variants={item}>
                <Link to="/projects" className="teaser">
                  <img src={p.images[0]} alt="" loading="lazy" />
                  <div className="teaser__body">
                    <span>{p.location}</span>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <Process />
      <CTABand />
    </>
  );
}

function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const badgeY = useTransform(scrollYProgress, [0, 1], ['40%', '-40%']);

  return (
    <section className="section" ref={ref}>
      <div className="wrap intro">
        <div className="intro__media">
          <motion.div
            style={{ borderRadius: 28, overflow: 'hidden' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img className="intro__img" src={teamImage} alt="The Optima Star team at work on site" style={{ y, scale: 1.15 }} />
          </motion.div>
          <motion.div className="intro__badge" style={{ y: badgeY }}>
            <strong><Droplets size={28} /></strong>
            Waterproofing is our core specialisation
          </motion.div>
        </div>
        <div className="intro__body">
          <WordReveal className="section__title" text="A technical contractor you can rely on" />
          <Reveal delay={0.1}>
            <p>
              Optima Star Technical Services L.L.C. is a UAE-based technical contracting company providing waterproofing,
              civil, interior and engineering support services for residential, commercial and industrial projects.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              With hands-on industry experience and a practical approach to project execution, we deliver reliable solutions
              for modern construction across the U.A.E, with high standards of workmanship, safety, technical accuracy and timely delivery.
            </p>
          </Reveal>
          <Stagger as="ul" className="intro__list" gap={0.04}>
            {services.map((s) => (
              <motion.li key={s.title} className={s.featured ? 'is-core' : undefined} variants={item}>{s.title}</motion.li>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <Link to="/about" className="link-arrow">More about us <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  return (
    <section className="section section--ink" ref={ref}>
      <div className="wrap">
        <div className="section__head">
          <WordReveal className="section__title" text="From first call to handover" />
          <Reveal delay={0.1}><p className="section__lede">Every job follows the same five steps, so you always know what happens next.</p></Reveal>
        </div>
        <Stagger className="process" gap={0.12}>
          <div className="process__rail"><motion.i style={{ scaleX: scrollYProgress }} /></div>
          {process.map((s, n) => (
            <motion.div className="step" key={s.title} variants={item}>
              <span className="step__num">{n + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
