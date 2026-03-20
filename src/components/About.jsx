import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');
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

  return (
    <section id="about" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>About Me</span></h2>
      <div className="about-wrapper fade-in">
        <div className="about-profile">
          <div className="stat-card">
            <i className="fas fa-code"></i>
            <h4>Software Developer</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Building with React & Python</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-graduation-cap"></i>
            <h4>2025 Graduate</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>JEC, Mechatronics</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-rocket"></i>
            <h4>AI Enthusiast</h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Ready to deploy</p>
          </div>
        </div>

        <div className="about-content-box">
          <div className="tab-header">
            <button
              className={`tab-btn ${activeTab === 'story' ? 'active' : ''}`}
              onClick={() => setActiveTab('story')}
            >
              My Story
            </button>
            <button
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
            <button
              className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              Vision
            </button>
          </div>

          <div className={`tab-body ${activeTab === 'story' ? 'active-tab' : ''}`}>
            <h3 style={{ marginBottom: '0.5rem' }}>The Builder:</h3>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
              I'm a passionate Software Developer and AI Engineer who loves turning complex problems into elegant solutions.
              With a strong foundation in full-stack web development and machine learning, I build end-to-end products that
              combine AI-driven insights with seamless user experiences.
            </p>
            <h3 style={{ marginBottom: '0.5rem' }}>The Innovator:</h3>
            <p style={{ color: 'var(--text-gray)' }}>
              From building production-ready web applications with Google OAuth and real-time synchronization to developing
              ML models with 91% accuracy, I constantly push the boundaries of what's possible. I'm driven by the challenge
              of creating intelligent, scalable software solutions.
            </p>
          </div>

          <div className={`tab-body ${activeTab === 'education' ? 'active-tab' : ''}`}>
            <div className="timeline-item">
              <span className="year">2021 – 2025</span>
              <h4>B.Tech in Mechatronics</h4>
              <p style={{ color: 'var(--text-gray)' }}>Jabalpur Engineering College (JEC)</p>
            </div>
            <div className="timeline-item">
              <span className="year">2020 – 2021</span>
              <h4>Senior Secondary (CBSE) - Class XII</h4>
              <p style={{ color: 'var(--text-gray)' }}>St. Gabriel's Senior Secondary School</p>
            </div>
            <div className="timeline-item">
              <span className="year">2018 – 2019</span>
              <h4>Secondary (CBSE) - Class X</h4>
              <p style={{ color: 'var(--text-gray)' }}>St. Gabriel's Senior Secondary School</p>
            </div>
          </div>

          <div className={`tab-body ${activeTab === 'vision' ? 'active-tab' : ''}`}>
            <h3 style={{ marginBottom: '1rem' }}>My Goal</h3>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
              To build intelligent, scalable applications that solve real-world challenges.
            </p>
            <ul className="vision-list">
              <li>
                <i className="fas fa-check-circle"></i>
                Master Cloud Architecture (AWS/Azure)
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Contribute to Open Source AI Projects
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Build scalable AI-driven applications
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Excel in Full-Stack Web Development
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
