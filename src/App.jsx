import { Suspense } from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechTicker from './components/TechTicker';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import './index.css';

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <TechTicker />
      <Skills />
      <Testimonials />
      <Projects />
      <Contact />
      <BackToTop />
    </>
  );
}

export default App;
