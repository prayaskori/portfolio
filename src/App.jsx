import { Suspense } from 'react';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      
      {/* 3D Background - Fixed position spanning entire screen */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Suspense fallback={null}>
           <Hero3D />
        </Suspense>
      </div>

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <main>
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
      
    </div>
  );
}

export default App;
