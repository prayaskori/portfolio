import { useEffect, useRef } from 'react';

export default function Testimonials() {
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

  const testimonials = [
    {
      quote: "Prayas demonstrated exceptional problem-solving skills during his internship. His ability to analyze security systems and implement practical solutions was impressive for someone at his level.",
      author: "Internship Supervisor",
      role: "Munitions India Limited"
    },
    {
      quote: "A dedicated and curious engineer who consistently goes beyond the requirements. His projects in machine learning and web development showcase a rare blend of technical depth and clean code.",
      author: "Faculty Mentor",
      role: "Jabalpur Engineering College"
    }
  ];

  return (
    <section id="testimonials" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>Recommendations</span></h2>
      <div className="testimonial-grid fade-in">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <p className="quote">
              <i className="fas fa-quote-left" style={{ color: 'var(--accent)', marginRight: '8px', fontSize: '1.2rem' }}></i>
              {t.quote}
            </p>
            <div>
              <span className="author">{t.author}</span>
              <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem', display: 'block' }}>{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
