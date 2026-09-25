import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Search, CheckCircle2, Building2, HardHat, ClipboardList } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTABand from '../components/CTABand';
import { Reveal, Stagger, item } from '../components/Reveal';
import { recentProjects, heroSlides } from '../data/site';

const STATUS = ['All', 'Running', 'Completed'];
const SCOPES = ['All scopes', ...Array.from(new Set(recentProjects.map((p) => p.scope)))];

export default function RecentProjects() {
  const [status, setStatus] = useState('All');
  const [scope, setScope] = useState('All scopes');
  const [q, setQ] = useState('');

  const rows = useMemo(() => recentProjects
    .map((p, i) => ({ ...p, no: i + 1 }))
    .filter((p) => status === 'All' || p.status === status)
    .filter((p) => scope === 'All scopes' || p.scope === scope)
    .filter((p) => !q.trim() || Object.values(p).join(' ').toLowerCase().includes(q.trim().toLowerCase())), [status, scope, q]);

  const running = recentProjects.filter((p) => p.status === 'Running').length;
  const completed = recentProjects.length - running;
  const contractors = new Set(recentProjects.map((p) => p.contractor)).size;
  const stats = [
    { icon: ClipboardList, value: recentProjects.length, label: 'Projects in Dubai' },
    { icon: HardHat, value: running, label: 'Running now' },
    { icon: CheckCircle2, value: completed, label: 'Completed' },
    { icon: Building2, value: contractors, label: 'Main contractors served' },
  ];

  return (
    <>
      <PageHeader
        title="Recent projects"
        lede="Our current and completed waterproofing work, with the main contractor and consultant on each job."
        image={heroSlides[1]}
      />

      <section className="section" style={{ paddingTop: 'clamp(3rem,6vw,4.5rem)' }}>
        <div className="wrap">
          <Stagger className="rp-stats" gap={0.08}>
            {stats.map((s) => (
              <motion.div key={s.label} className="rp-stat glass-card" variants={item}>
                <s.icon size={22} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </Stagger>

          <Reveal className="rp-toolbar">
            <LayoutGroup id="rp-status">
              <div className="seg glass-card" role="group" aria-label="Filter by status">
                {STATUS.map((s) => (
                  <button key={s} className={status === s ? 'is-on' : undefined} onClick={() => setStatus(s)} aria-pressed={status === s}>
                    {status === s && <motion.span layoutId="seg-bg" className="seg__bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    {s}
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <label className="rp-select glass-card">
              <span className="visually-hidden">Filter by scope</span>
              <select value={scope} onChange={(e) => setScope(e.target.value)}>
                {SCOPES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="rp-search glass-card">
              <Search size={18} />
              <span className="visually-hidden">Search projects</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by area, contractor or consultant" />
            </label>
          </Reveal>

          <Reveal className="rp-table-wrap glass-card">
            <table className="rp-table">
              <caption className="visually-hidden">Recent waterproofing projects by Optima Star Technical Services</caption>
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Project</th>
                  <th scope="col">Scope</th>
                  <th scope="col">Main contractor</th>
                  <th scope="col">Consultant</th>
                  <th scope="col">Client</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {rows.map((p) => (
                    <motion.tr key={p.no} layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}>
                      <td data-label="No." className="rp-no">{String(p.no).padStart(2, '0')}</td>
                      <td data-label="Project" className="rp-project">
                        <strong>{p.project}</strong>
                        <span>{p.plot}</span>
                      </td>
                      <td data-label="Scope"><span className={`scope scope--${p.scope.toLowerCase().replace(/\s+/g, '-')}`}>{p.scope}</span></td>
                      <td data-label="Main contractor">{p.contractor}</td>
                      <td data-label="Consultant">{p.consultant}</td>
                      <td data-label="Client">{p.client}</td>
                      <td data-label="Status">
                        <span className={`status status--${p.status.toLowerCase()}`}>
                          {p.status === 'Running' ? <i className="status__dot" /> : <CheckCircle2 size={14} />}
                          {p.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {rows.length === 0 && (
              <div className="rp-empty">
                <p>No projects match these filters.</p>
                <button className="btn btn--small btn--dark" onClick={() => { setStatus('All'); setScope('All scopes'); setQ(''); }}>Clear filters</button>
              </div>
            )}
          </Reveal>
          <p className="rp-foot">Showing {rows.length} of {recentProjects.length} projects. Pre-qualification documents and consultant approvals are available on request.</p>
        </div>
      </section>

      <CTABand title="Add your project to this list" text="Send us your drawings and specification. We'll prepare the pre-qualification file for your consultant." />
    </>
  );
}
