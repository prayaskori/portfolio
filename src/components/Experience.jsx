import { useEffect, useRef } from 'react';

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: "Security Analyst Engineer Intern",
      company: "Munitions India Limited, Jabalpur",
      points: [
        "Analyzed 50+ security vulnerabilities across 3 critical systems and implemented protective measures reducing risk exposure by 30%",
        "Collaborated with a 5-member team to enhance system security protocols, resulting in zero security breaches during internship period",
        "Conducted thorough security assessments and documented 15+ risk mitigation strategies adopted by the organization"
      ]
    },
    {
      title: "Engineer Intern",
      company: "Gun Carriage Factory, Jabalpur",
      points: [
        "Gained hands-on experience in industrial engineering practices across 4 production units",
        "Contributed to 2 project development cycles including testing and quality assurance, improving workflow efficiency by 15%",
        "Authored 10+ pages of technical documentation and analysis reports for internal review"
      ]
    }
  ];

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>Experience</span></h2>
      <div style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '2px solid var(--card-border)', paddingLeft: '1rem' }}>
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card fade-in">
            <div className="exp-dot"></div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{exp.title}</h3>
            <h4 style={{ color: 'var(--accent)', fontSize: '1rem', marginBottom: '1rem' }}>{exp.company}</h4>
            <ul style={{ color: 'var(--text-gray)', lineHeight: 1.8 }}>
              {exp.points.map((point, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
