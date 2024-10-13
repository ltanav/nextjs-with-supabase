import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabase';

const todos = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data, error } = await supabase
        .from('todos')
        .select('id, title, description');
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch todos' });
      }
      return res.status(200).json(data);
    case 'POST':
      const { title, description } = req.body;
      const { data: createdTodo, error: createError } = await supabase
        .from('todos')
        .insert({ title, description });
      if (createError) {
        return res.status(500).json({ error: 'Failed to create todo' });
      }
      return res.status(201).json(createdTodo);
    case 'PATCH':
      const { id } = req.query;
      const { title: updatedTitle, description: updatedDescription } = req.body;
      const { data: updatedTodo, error: updateError } = await supabase
        .from('todos')
        .update(id, { title: updatedTitle, description: updatedDescription });
      if (updateError) {
        return res.status(500).json({ error: 'Failed to update todo' });
      }
      return res.status(200).json(updatedTodo);
    case 'DELETE':
      const { id: todoId } = req.query;
      const { error: deleteError } = await supabase
        .from('todos')
        .delete(todoId);
      if (deleteError) {
        return res.status(500).json({ error: 'Failed to delete todo' });
      }
      return res.status(204).json({});
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default todos;