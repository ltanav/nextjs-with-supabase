import axios from 'axios';
import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string;
}

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleEdit = async () => {
    await axios.patch(`/api/todos/${todo.id}`, { title, description });
    setEditing(false);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/todos/${todo.id}`);
    onDelete(todo.id);
  };

  return (
    <li className="flex justify-between mb-4">
      {editing ? (
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
      ) : (
        <span className="text-lg">{todo.title}</span>
      )}
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleEdit}
      >
        Muuda
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Kustuta
      </button>
    </li>
  );
};

export default TodoItem;