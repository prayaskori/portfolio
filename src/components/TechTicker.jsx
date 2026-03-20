export default function TechTicker() {
  const techs = [
    { icon: 'fab fa-python', name: 'Python' },
    { icon: 'fab fa-js-square', name: 'JavaScript' },
    { icon: 'fab fa-react', name: 'React' },
    { icon: 'fas fa-brain', name: 'Machine Learning' },
    { icon: 'fas fa-robot', name: 'AI' },
    { icon: 'fas fa-database', name: 'SQL' },
    { icon: 'fab fa-node-js', name: 'Node.js' },
    { icon: 'fab fa-aws', name: 'AWS' },
    { icon: 'fab fa-docker', name: 'Docker' },
    { icon: 'fab fa-git-alt', name: 'Git' },
    { icon: 'fas fa-flask-vial', name: 'Flask' },
    { icon: 'fas fa-chart-line', name: 'Data Science' },
  ];

  // Double the items for seamless loop
  const allTechs = [...techs, ...techs];

  return (
    <div className="tech-ticker">
      <div className="ticker-wrapper">
        {allTechs.map((tech, i) => (
          <span key={i} className="ticker-item">
            <i className={tech.icon}></i>
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
