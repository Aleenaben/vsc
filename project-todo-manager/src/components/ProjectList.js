import React from 'react';

const ProjectList = ({ projects, onSelect }) => {
  return (
    <div>
      <h2>All Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => onSelect(project.id)}>{project.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
