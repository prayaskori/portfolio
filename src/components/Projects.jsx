import { useState, useEffect, useRef } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('all');
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

  const projects = [
    {
      title: 'AI-Powered Smart Bookmark Manager',
      tech: 'Next.js • TypeScript • Supabase • OAuth2 • JWT',
      category: 'web',
      description: 'A production-ready web application with Google OAuth, secure JWT-based authentication, Row-Level Security (RLS), and real-time cross-tab synchronization using Supabase Realtime.',
      link: 'https://github.com/prayaskori/SB1',
      demo: null
    },
    {
      title: 'Personalized Movie Recommendation',
      tech: 'Python • NLP • Streamlit • Scikit-learn • Embeddings',
      category: 'ai',
      description: 'A hybrid recommendation engine combining collaborative and content-based filtering with embedding-based semantic search inspired by RAG. Deployed as an interactive Streamlit application.',
      link: 'https://github.com/prayaskori/Movie-Recommendation/blob/main/movie_recommendation.ipynb',
      demo: null
    },
    {
      title: 'Clinical Risk Prediction Engine',
      tech: 'Python • Scikit-learn • KNN • Feature Engineering',
      category: 'ai',
      description: 'Built a clinical risk prediction system using K-Nearest Neighbors with custom feature engineering on 13 medical parameters. Achieved 91% accuracy through hyperparameter tuning, cross-validation, and systematic outlier handling — outperforming baseline models by 12%.',
      link: 'https://github.com/prayaskori/heart-disease-detection',
      demo: null
    },
    {
      title: 'Personal Portfolio',
      tech: 'React • Three.js • Vite • CSS3',
      category: 'web',
      description: 'The responsive website you are viewing right now, featuring 3D backgrounds, animations, hover effects, and a modern dark UI design.',
      link: 'https://github.com/prayaskori',
      demo: null
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>Featured Projects</span></h2>

      {/* Filter Tabs */}
      <div className="project-filters fade-in">
        {[
          { key: 'all', label: 'All' },
          { key: 'ai', label: 'AI / ML' },
          { key: 'web', label: 'Web Dev' },
        ].map(f => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-grid fade-in">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-content">
              <div>
                <p className="project-tech">{project.tech}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-links">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <i className="fab fa-github"></i> View Code <i className="fas fa-external-link-alt" style={{ fontSize: '0.75rem' }}></i>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo-link"
                  >
                    <i className="fas fa-rocket"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
