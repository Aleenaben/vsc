import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  const addProject = (title) => {
    const newProject = { id: Date.now(), title, todos: [] };
    setProjects([...projects, newProject]);
  };

  const selectProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setCurrentProject(project);
  };

  return (
    <div className="App">
      <h1>Project Management</h1>
      <button onClick={() => addProject(prompt('Enter project title:'))}>Create New Project</button>

      <ProjectList projects={projects} onSelect={selectProject} />

      {currentProject && (
        <ProjectDetail project={currentProject} setProjects={setProjects} />
      )}
    </div>
  );
};

export default App;


