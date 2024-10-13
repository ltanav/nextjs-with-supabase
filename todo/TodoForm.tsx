import axios from 'axios';
import { useState } from 'react';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todo = { title, description };
    await axios.post('/api/todos', todo);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Loo TODO</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label className="block mb-2">
          Pealkiri:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Kirjeldus:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Loo TODO
        </button>
      </form>
    </div>
  );
};

export default TodoForm;