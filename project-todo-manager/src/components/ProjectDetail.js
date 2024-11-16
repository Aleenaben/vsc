import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { exportToMarkdown } from './utils/exportToMarkdown';

const ProjectDetail = ({ project, setProjects }) => {
  const [todoDescription, setTodoDescription] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      description: todoDescription,
      status: 'Pending',
      created_date: new Date(),
    };
    const updatedProject = { ...project, todos: [...project.todos, newTodo] };
    setProjects((projects) =>
      projects.map((p) => (p.id === project.id ? updatedProject : p))
    );
    setTodoDescription('');
  };

  const updateProjectTitle = () => {
    const newTitle = prompt('Enter new project title:', project.title);
    const updatedProject = { ...project, title: newTitle };
    setProjects((projects) =>
      projects.map((p) => (p.id === project.id ? updatedProject : p))
    );
    setEditingTitle(false);
  };

  const handleExport = () => {
    const markdown = exportToMarkdown(project);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${project.title}-summary.md`;
    link.click();
  };

  return (
    <div>
      <h2>
        {editingTitle ? (
          <input
            type="text"
            value={project.title}
            onChange={(e) => (project.title = e.target.value)}
            onBlur={updateProjectTitle}
          />
        ) : (
          <span onClick={() => setEditingTitle(true)}>{project.title}</span>
        )}
      </h2>

      <h3>Todos</h3>
      <ul>
        {project.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} project={project} setProjects={setProjects} />
        ))}
      </ul>
      <input
        type="text"
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <button onClick={handleExport}>Export to Markdown</button>
    </div>
  );
};

export default ProjectDetail;
