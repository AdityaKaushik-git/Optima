import { motion } from 'framer-motion';
import { BadgeCheck, Building2 } from 'lucide-react';
import { approvals, consultants, registrations } from '../data/site';
import { Reveal, Stagger, item, WordReveal } from './Reveal';

export default function Credentials({ tone = 'white' }) {
  return (
    <section className={`section section--${tone}`}>
      <div className="wrap">
        <div className="section__head section__head--split">
          <WordReveal className="section__title" text="Approved by the people who check our work" />
          <Reveal delay={0.1}>
            <p className="section__lede">
              Manufacturers certify us to install their systems. Consultants pre-qualify us before we set foot on site.
              Every document is available with our pre-qualification file.
            </p>
          </Reveal>
        </div>

        <Stagger className="creds" gap={0.05}>
          {approvals.map((a) => (
            <motion.div key={a.name} className="cred glass-card" variants={item}>
              <BadgeCheck size={22} className="cred__icon" />
              <div>
                <strong>{a.name}</strong>
                <span>{a.scope}</span>
              </div>
            </motion.div>
          ))}
        </Stagger>

        <div className="creds__foot">
          <Reveal className="creds__block">
            <h3>Pre-qualified by consultants</h3>
            <ul className="chips">
              {consultants.map((c) => <li key={c}><Building2 size={15} /> {c}</li>)}
            </ul>
          </Reveal>
          <Reveal className="creds__block" delay={0.08}>
            <h3>Registered in Dubai</h3>
            <dl className="regs">
              {registrations.map((r) => (
                <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
