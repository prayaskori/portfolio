import { useEffect, useRef } from 'react';

export default function Certifications() {
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

  const certifications = [
    {
      title: 'Machine Learning Specialization',
      issuer: 'Coursera (Stanford / DeepLearning.AI)',
      icon: 'fas fa-brain'
    },
    {
      title: 'Python for Data Science',
      issuer: 'IBM',
      icon: 'fab fa-python'
    },
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      icon: 'fab fa-aws'
    },
    {
      title: 'Full-Stack Web Development',
      issuer: 'Udemy',
      icon: 'fas fa-code'
    }
  ];

  return (
    <section id="certifications" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>Certifications</span></h2>
      <div className="cert-grid fade-in">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <div className="cert-icon">
              <i className={cert.icon}></i>
            </div>
            <div className="cert-info">
              <h4>{cert.title}</h4>
              <p>{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
