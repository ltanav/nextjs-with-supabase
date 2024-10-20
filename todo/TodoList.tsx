import axios from 'axios';
import { useState, useEffect } from 'react';
import TodoItem from './todo/TodoItem';
import '../styles/globals.css'; // Import the global styles

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <svg
          className="animate-spin h-5 w-5 text-gray-500"
          viewBox="0 0 24 24"
        >
          <!-- Spinner icon -->
        </svg>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todo List</h1>
      <ul className="todo-list divide-y divide-gray-200">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;