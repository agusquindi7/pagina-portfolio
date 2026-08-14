import { Helmet } from 'react-helmet-async';
import { useState, useEffect} from 'react';
import Project from './Project';
import './FullStackPage.css'; // Asegúrate de tener un archivo CSS para los estilos

function BackEndPage({ projects, handleDelete, deletingId }) {
const placeholderProject = {
  Title: "Placeholder Project",
  Technologies: ["React", "Node.js", "Express", "MongoDB"],
  Description: "This is a placeholder project description.",
  Image: "https://upload.wikimedia.org/wikipedia/commons/a/af/PowerShell_Core_6.0_icon.png"
};

const [dots, setDots] = useState('')
useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Helmet>
              <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              <title>Back End</title>
              <meta name="description" content="Proyectos Back End de Agustín Quindimil" />
      </Helmet>
      <h2 style={{ textAlign: 'center' }}>Back End Projects</h2>
      
      {/* Idle No Projects Placeholder */}
      <div className="project-grid">
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <Project key={index} project={project} handleDelete={handleDelete} deletingId={deletingId} />
          ))
        ) : (
          <p className="no-projects">No projects yet{dots}</p>
        )}
      </div>
    </div>
  );
}

export default BackEndPage;