import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { team } from '../data/site';
import { Reveal, Stagger, item, WordReveal } from './Reveal';

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');

export default function Team() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section__head">
          <WordReveal className="section__title" text="The partners behind Optima Star" />
          <Reveal delay={0.1}>
            <p className="section__lede">Two partners, one standard: every system is installed the way it was approved.</p>
          </Reveal>
        </div>
        <Stagger className="team" gap={0.14}>
          {team.map((m) => (
            <motion.article key={m.fullName} className="member glass-card" variants={item}>
              <div className="member__photo">
                {m.photo
                  ? <img src={m.photo} alt={`${m.fullName}, ${m.role}`} loading="lazy" />
                  : (
                    <div className="member__mono" aria-hidden="true">
                      <svg viewBox="0 0 200 240">
                        <defs>
                          <linearGradient id={`g-${m.name}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#1d4270" /><stop offset="1" stopColor="#0b1b2e" />
                          </linearGradient>
                        </defs>
                        <rect width="200" height="240" fill={`url(#g-${m.name})`} />
                        <circle cx="100" cy="92" r="40" fill="rgba(255,255,255,.1)" />
                        <path d="M28 240 C34 170 166 170 172 240 Z" fill="rgba(255,255,255,.1)" />
                      </svg>
                      <span>{initials(m.name)}</span>
                    </div>
                  )}
              </div>
              <div className="member__body">
                <p className="member__role">{m.role}</p>
                <h3>{m.fullName}</h3>
                <p className="member__exp"><Briefcase size={16} /> {m.experience}</p>
                <p className="member__bio">{m.bio}</p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
