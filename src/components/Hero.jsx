import { useState, useEffect } from 'react';

const roles = [
  'Software Developer',
  'AI Engineer',
  'ML Enthusiast',
  'Full-Stack Builder',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      // Typing or deleting
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Currently Learning Badge */}
        <div className="learning-badge">
          <span className="pulse-dot"></span>
          <span>🔥 Currently learning: AWS Solutions Architect</span>
        </div>

        <h1>
          Hi, I'm <span>Prayas</span>
        </h1>
        <div className="typing-container">
          <span className="typing-text">{text}</span>
          <span className="cursor">|</span>
        </div>
        <p>
          I build scalable web applications and love solving real-world problems.
          Specializing in Machine Learning, Full-Stack Development, and intelligent software solutions.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">Download Resume</a>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="profile-img-box">
          <div className="hero-icon">
            <span className="bracket left">&lt;</span>
            <span className="slash">/</span>
            <span className="bracket right">&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
