import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    } catch {
      alert('Oops! There was a problem submitting your form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>Get In Touch</span></h2>
      <div className="contact-container fade-in">
        {!submitted ? (
          <form
            className="contact-form"
            action="https://formsubmit.co/prayask007@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input type="hidden" name="_subject" value="New message from Portfolio!" />
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%', textAlign: 'center' }}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        ) : (
          <div className="success-popup active">
            <i className="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. I'll get back to you soon.</p>
          </div>
        )}

        <div className="social-links">
          <a href="mailto:prayask007@gmail.com" title="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="tel:+917223980774" title="Phone">
            <i className="fas fa-phone"></i>
          </a>
          <a href="https://github.com/prayaskori" target="_blank" rel="noopener noreferrer" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/prayas-kori-068166395" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Prayas Kori. Designed for the future of AI.</p>
      </footer>
    </section>
  );
}
