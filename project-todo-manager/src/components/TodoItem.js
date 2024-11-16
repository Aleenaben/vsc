import React from 'react';

const TodoItem = ({ todo, project, setProjects }) => {
  const toggleStatus = () => {
    const updatedTodo = { ...todo, status: todo.status === 'Pending' ? 'Complete' : 'Pending' };
    const updatedTodos = project.todos.map((t) => (t.id === todo.id ? updatedTodo : t));
    const updatedProject = { ...project, todos: updatedTodos };
    setProjects((projects) =>
      projects.map((p) => (p.id === project.id ? updatedProject : p))
    );
  };

  const deleteTodo = () => {
    const updatedTodos = project.todos.filter((t) => t.id !== todo.id);
    const updatedProject = { ...project, todos: updatedTodos };
    setProjects((projects) =>
      projects.map((p) => (p.id === project.id ? updatedProject : p))
    );
  };

  return (
    <li>
      <span>{todo.description}</span>
      <span>({todo.status})</span>
      <button onClick={toggleStatus}>Toggle Status</button>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
};

export default TodoItem;
