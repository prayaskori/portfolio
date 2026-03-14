import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, FileText } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(168, 85, 247, 0.05))' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff' }}>Get In Touch</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Let's work together on something amazing! I'm currently open to new opportunities and collaborations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
            <a href="mailto:prayask007@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.125rem', color: '#fff' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
                <Mail size={24} />
              </div>
              prayask007@gmail.com
            </a>
            
            <a href="tel:+917223980774" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.125rem', color: '#fff' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%', color: 'var(--accent-purple)' }}>
                <Phone size={24} />
              </div>
              +91 7223980774
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.125rem', color: '#fff' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', color: '#f8fafc' }}>
                <MapPin size={24} />
              </div>
              Jabalpur, Madhya Pradesh
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/prayaskori" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', fontWeight: 600, transition: 'background 0.2s' }}>
              <Github size={20} />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/prayas-kori-068166395" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', fontWeight: 600, transition: 'background 0.2s' }}>
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--accent-blue)', color: '#000', borderRadius: '8px', fontWeight: 600, transition: 'transform 0.2s' }}>
              <FileText size={20} />
              View Resume
            </a>
          </div>
        </motion.div>
      </div>

      <footer style={{ textAlign: 'center', marginTop: '6rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <p>© {new Date().getFullYear()} Prayas Kori. Designed & Built with React & Three.js.</p>
      </footer>
    </section>
  );
}
