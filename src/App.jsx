import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { BookingProvider } from './components/Booking';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import RecentProjects from './pages/RecentProjects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const curtain = [0.76, 0, 0.24, 1];

function Page({ children }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
      {/* Water-blue curtain that wipes between pages */}
      <motion.div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, background: 'var(--water-deep)', zIndex: 85, transformOrigin: 'top', pointerEvents: 'none' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: curtain, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
      />
      <motion.div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, background: 'var(--water-deep)', zIndex: 85, transformOrigin: 'bottom', pointerEvents: 'none' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.55, ease: curtain } }}
      />
    </>
  );
}

import AmbientBackground from './components/AmbientBackground';

export default function App() {
  const location = useLocation();
  return (
    <BookingProvider>
      <AmbientBackground />
      <Loader />
      <ScrollProgress />
      <TopBar />
      <Navbar />
      <main>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/services" element={<Page><Services /></Page>} />
            <Route path="/projects" element={<Page><Projects /></Page>} />
            <Route path="/recent-projects" element={<Page><RecentProjects /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingActions />
    </BookingProvider>
  );
}
