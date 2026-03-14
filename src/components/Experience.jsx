import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: "Security Analyst Engineer Intern",
      company: "Munitions India Limited, Jabalpur",
      points: [
        "Analyzed security vulnerabilities and implemented protective measures",
        "Collaborated with team to enhance system security protocols",
        "Worked on security assessment and risk mitigation strategies"
      ]
    },
    {
      title: "Engineer Intern",
      company: "Gun Carriage Factory, Jabalpur",
      points: [
        "Gained hands-on experience in engineering practices",
        "Contributed to project development and testing",
        "Worked on technical documentation and analysis"
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Briefcase color="var(--accent-purple)" size={36} />
            Experience
          </h2>

          <div style={{ position: 'relative', borderLeft: '2px solid var(--glass-border)', paddingLeft: '2rem', marginLeft: '1rem' }}>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ marginBottom: '3rem', position: 'relative' }}
              >
                {/* Timeline Dot */}
                <div style={{ position: 'absolute', width: '20px', height: '20px', background: 'var(--accent-blue)', borderRadius: '50%', left: '-2.65rem', top: '0.25rem', border: '4px solid var(--root-bg)' }} />
                
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>{exp.title}</h3>
                <h4 style={{ fontSize: '1.125rem', color: 'var(--accent-purple)', marginBottom: '1rem' }}>{exp.company}</h4>
                
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)' }}>
                  {exp.points.map((point, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent-blue)' }}>▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
