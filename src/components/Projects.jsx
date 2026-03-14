import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "AI-Powered Smart Bookmark Manager",
      tags: ["Next.js", "TypeScript", "Supabase", "OAuth2", "JWT"],
      points: [
        "Designed and developed a production-ready web application with Google OAuth and secure JWT-based authentication",
        "Implemented Row-Level Security (RLS) to enforce strict per-user data isolation",
        "Engineered real-time cross-tab synchronization using Supabase Realtime",
        "Optimized database queries for performance and scalability"
      ],
      link: "https://github.com/prayaskori/SB1"
    },
    {
      title: "Personalized Movie Recommendation System",
      tags: ["Python", "NLP", "Streamlit", "Scikit-learn", "Embeddings"],
      points: [
        "Built a hybrid recommendation engine combining collaborative and content-based filtering",
        "Integrated embedding-based semantic search inspired by Retrieval-Augmented Generation (RAG)",
        "Evaluated model performance using precision, recall, and F1-score metrics",
        "Deployed an interactive Streamlit application for real-time recommendations"
      ],
      link: "https://github.com/prayaskori/Movie-Recommendation"
    },
    {
      title: "Heart Disease Detection",
      tags: ["Python", "Scikit-learn", "Machine Learning", "KNN"],
      points: [
        "Developed a K-Nearest Neighbors (KNN) classification model using 13 clinical features",
        "Built a user interface for real-time prediction and inference",
        "Improved prediction accuracy to 91% through feature tuning and model optimization",
        "Created comprehensive data analysis and model evaluation reports"
      ],
      link: "https://github.com/prayaskori/heart-disease-detection"
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Code2 color="var(--accent-blue)" size={36} />
            Featured Projects
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{project.title}</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-blue)', borderRadius: '999px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', flexGrow: 1 }}>
                  {project.points.map((point, i) => (
                    <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#4ade80' }}>✓</span>
                      {point}
                    </li>
                  ))}
                </ul>

                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontWeight: 500, marginTop: 'auto', width: 'max-content' }}
                >
                  <Github size={20} />
                  View on GitHub
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
