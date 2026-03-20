import { useState, useEffect, useRef } from 'react';

const skillData = {
  Python: {
    icon: 'fab fa-python',
    topics: ['Data Structures', 'Pandas & NumPy', 'Flask / FastAPI', 'Automation Scripts', 'Scikit-learn', 'TensorFlow / Keras']
  },
  JavaScript: {
    icon: 'fab fa-js-square',
    topics: ['ES6+ Features', 'Async/Await', 'DOM Manipulation', 'Node.js', 'TypeScript']
  },
  React: {
    icon: 'fab fa-react',
    topics: ['Hooks & State Management', 'Next.js', 'Component Architecture', 'REST API Integration', 'Responsive UI']
  },
  'Machine Learning': {
    icon: 'fas fa-brain',
    topics: ['Supervised Learning', 'Neural Networks', 'CNNs', 'Transfer Learning', 'Feature Engineering', 'Model Evaluation']
  },
  NLP: {
    icon: 'fas fa-language',
    topics: ['Text Classification', 'Sentiment Analysis', 'Named Entity Recognition (NER)', 'Transformers & BERT', 'Embeddings']
  },
  'LLM & RAG': {
    icon: 'fas fa-robot',
    topics: ['Retrieval Augmented Generation (RAG)', 'Vector Databases', 'Semantic Search', 'LLM Integration', 'Embeddings']
  },
  'Web Dev': {
    icon: 'fas fa-globe',
    topics: ['React & Next.js', 'Tailwind CSS', 'REST APIs', 'FastAPI / Flask', 'Supabase', 'OAuth2 / JWT']
  },
  'Cloud & DB': {
    icon: 'fab fa-aws',
    topics: ['AWS (EC2, S3, Lambda)', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'CI/CD Basics']
  },
  SQL: {
    icon: 'fas fa-database',
    topics: ['Relational Design', 'Joins & Subqueries', 'Normalization', 'ACID Properties']
  },
  'Git & Tools': {
    icon: 'fab fa-git-alt',
    topics: ['Version Control', 'Branching & Merging', 'Pull Requests', 'Jupyter Notebooks']
  },
  'Data Science': {
    icon: 'fas fa-chart-bar',
    topics: ['Data Cleaning', 'Feature Engineering', 'Outlier Detection', 'Data Normalization', 'Visualization']
  },
  Testing: {
    icon: 'fas fa-vial',
    topics: ['Software Testing', 'Test Case Design', 'Manual Testing', 'API Testing', 'Bug Tracking']
  }
};

export default function Skills() {
  const [modalSkill, setModalSkill] = useState(null);
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

  const openModal = (skillName) => {
    setModalSkill(skillName);
  };

  const closeModal = () => {
    setModalSkill(null);
  };

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <h2 className="section-title fade-in"><span>Technical Skills</span></h2>
      <div className="skills-container fade-in">
        {Object.entries(skillData).map(([name, data]) => (
          <div
            key={name}
            className="skill-card"
            onClick={() => openModal(name)}
          >
            <i className={data.icon}></i>
            <h4>{name}</h4>
            <p className="skill-hint">Click for details</p>
          </div>
        ))}
      </div>

      {/* Skill Modal */}
      <div
        className={`modal-overlay ${modalSkill ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {modalSkill && (
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h3>{modalSkill}</h3>
            <ul className="modal-list">
              {skillData[modalSkill].topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
