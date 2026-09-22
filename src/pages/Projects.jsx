import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import CTABand from '../components/CTABand';
import { projects, projectFilters, heroSlides } from '../data/site';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      <PageHeader
        title="Projects and case studies"
        crumb="Projects"
        lede="Specialised waterproofing systems and technical services we've delivered across the UAE."
        image={heroSlides[5]}
      />
      <section className="section">
        <div className="wrap">
          <LayoutGroup>
            <div className="filters" role="group" aria-label="Filter projects">
              {projectFilters.map((f) => (
                <button key={f} className={`filter${filter === f ? ' is-on' : ''}`} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                  {filter === f && <motion.span layoutId="filter-bg" className="filter__bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  {f}
                </button>
              ))}
            </div>
            <motion.p layout style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Showing {list.length} {list.length === 1 ? 'project' : 'projects'}
            </motion.p>
            <motion.div className="projects" layout>
              <AnimatePresence mode="popLayout">
                {list.map((p) => <ProjectCard key={p.id} p={p} />)}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
      <CTABand title="Discuss your project" text="Ready to work with a specialised waterproofing contractor? Request a site visit or a consultation with our engineering team." />
    </>
  );
}
