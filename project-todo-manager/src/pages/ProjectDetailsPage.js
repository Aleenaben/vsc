import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch project details
  useEffect(() => {
    axios.get(`/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
        setTodos(response.data.todos);
      })
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);

  // Add a new todo
  const addTodo = () => {
    axios.post(`/api/projects/${id}/todos`, { description: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  // Mark todo as complete
  const toggleTodoStatus = (todoId, status) => {
    axios.patch(`/api/projects/${id}/todos/${todoId}`, { status })
      .then(() => {
        setTodos(todos.map(todo =>
          todo.id === todoId ? { ...todo, status } : todo
        ));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  return (
    <div>
      {project && (
        <>
          <h1>
            <input
              type="text"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              onBlur={() => axios.patch(`/api/projects/${id}`, { title: project.title })}
            />
          </h1>
          <h2>Todos</h2>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <span>{todo.description}</span>
                <button onClick={() => toggleTodoStatus(todo.id, todo.status === 'Pending' ? 'Completed' : 'Pending')}>
                  {todo.status === 'Pending' ? 'Mark Complete' : 'Mark Pending'}
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>
        </>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
