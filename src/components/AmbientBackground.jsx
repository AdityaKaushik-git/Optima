import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#f4f6f8', overflow: 'hidden' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', width: '120vw', height: '120vh', left: '-10vw', top: '-10vh' }}
      >
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,174,231,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(29,66,112,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '30%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(0,143,191,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
      </motion.div>
    </div>
  );
}
