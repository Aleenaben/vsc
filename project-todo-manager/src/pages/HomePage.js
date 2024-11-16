import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  // Fetch projects
  useEffect(() => {
    axios.get('/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // Create a new project
  const createProject = () => {
    axios.post('/api/projects', { title })
      .then(response => {
        setProjects([...projects, response.data]);
        setTitle('');
      })
      .catch(error => console.error('Error creating project:', error));
  };

  return (
    <div>
      <h1>Projects</h1>
      <div>
        <input
          type="text"
          placeholder="New Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createProject}>Create Project</button>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span>{project.title}</span>
            <button onClick={() => navigate(`/project/${project.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
