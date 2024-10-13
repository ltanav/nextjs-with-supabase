import axios from 'axios';
import { useState, useEffect } from 'react';
import TodoItem from './todo/TodoItem';

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

