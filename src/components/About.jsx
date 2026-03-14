import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Hero Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', marginBottom: '4rem' }}
        >
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Prayas Kori
          </h1>
          <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            Software Developer & AI Engineer
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            I build scalable web applications and love solving real-world problems. As a fresh AI Engineer and Software Developer, I leverage machine learning and modern web technologies to create intelligent solutions. Passionate about building end-to-end products that combine AI-driven insights with seamless user experiences. Constantly learning and exploring new technologies to stay at the cutting edge of innovation.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:prayask007@gmail.com" className="btn-primary" style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-blue)', color: '#000', borderRadius: '8px', fontWeight: 600, transition: 'transform 0.2s', display: 'inline-block' }}>
              Email Me
            </a>
            <a href="#projects" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', fontWeight: 600, backdropFilter: 'blur(5px)', transition: 'background 0.2s', display: 'inline-block' }}>
              View Projects
            </a>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel"
          style={{ padding: '2rem', marginTop: '2rem' }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Skills & Expertise</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>Programming Languages</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }}>{skill}</span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>AI & Machine Learning</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Machine Learning', 'Deep Learning', 'Neural Networks', 'CNNs', 'Transfer Learning', 'Feature Engineering', 'Model Evaluation', 'Recommendation Systems', 'LLM Integration', 'Embeddings', 'Semantic Search', 'Vector Databases', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'Streamlit'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '999px', color: 'var(--accent-blue)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>Web Development</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'REST APIs', 'FastAPI', 'Flask', 'Supabase', 'OAuth2', 'JWT Authentication'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '999px', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.2)' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>Databases & Cloud</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                 {['PostgreSQL', 'MySQL', 'MongoDB', 'AWS (EC2, S3, IAM, Lambda)', 'Docker'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>Tools & CS Core</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Git', 'Jupyter', 'Software Testing', 'Test Case Design', 'Manual Testing', 'API Testing', 'Functional Testing', 'Bug Tracking', 'Statistics', 'Data Structures & Algorithms', 'Object-Oriented Programming', 'System Design'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '4rem' }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Education & Certifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', color: '#fff' }}>Bachelor of Technology in Mechatronics</h4>
              <p style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>Jabalpur Engineering College (2021 – 2025)</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', color: '#fff' }}>Senior Secondary (CBSE) - Class XII</h4>
              <p style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>St. Gabriel's Senior Secondary School (2020-2021)</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', color: '#fff' }}>Secondary (CBSE) - Class X</h4>
              <p style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>St. Gabriel's Senior Secondary School (2018-2019)</p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
