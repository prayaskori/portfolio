import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav>
      <a href="#" className="logo">PK</a>
      
      {/* Hamburger button for mobile */}
      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#experience" onClick={handleNavClick}>Experience</a>
        <a href="#skills" onClick={handleNavClick}>Skills</a>
        <a href="#projects" onClick={handleNavClick}>Projects</a>
        <a href="#contact" onClick={handleNavClick}>Contact</a>
      </div>
    </nav>
  );
}
