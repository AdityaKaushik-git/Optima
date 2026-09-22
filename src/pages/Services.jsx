import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import WaterproofingPanels from '../components/WaterproofingPanels';
import CrossSection from '../components/CrossSection';
import CTABand from '../components/CTABand';
import { Reveal, Stagger, item, WordReveal } from '../components/Reveal';
import { useBooking } from '../components/Booking';
import { services, heroSlides } from '../data/site';

export default function Services() {
  const { open } = useBooking();
  return (
    <>
      <PageHeader
        title="Our services"
        lede="Waterproofing is what we're known for. We also handle the finishing, fit-out and MEP work around it, so one team can take your job from start to finish."
        image={heroSlides[1]}
      />

      <section className="section">
        <div className="wrap">
          <div className="section__head section__head--split">
            <WordReveal className="section__title" text="Waterproofing systems" />
            <Reveal delay={0.1}><p className="section__lede">Five systems, each suited to a different part of a building. Not sure which you need? We'll inspect and recommend.</p></Reveal>
          </div>
          <WaterproofingPanels />
        </div>
      </section>

      <CrossSection />

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <WordReveal className="section__title" text="Everything else your building needs" />
            <Reveal delay={0.1}><p className="section__lede">Select any service to request a visit for it.</p></Reveal>
          </div>
          <Stagger className="svc-grid" gap={0.05}>
            {services.map((s) => (
              <motion.button
                type="button"
                key={s.title}
                className={`svc${s.featured ? ' svc--featured' : ''}`}
                variants={item}
                onClick={() => open(s.title)}
                style={{ border: 0, textAlign: 'left', font: 'inherit', color: 'inherit' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="svc__icon"><s.icon size={26} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.button>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABand />
    </>
  );
}
