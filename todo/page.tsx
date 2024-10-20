import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

const todosApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('id, title, description');

        if (error) {
          return res.status(500).json({ message: 'Error fetching todos' });
        }

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching todos' });
      }

    case 'POST':
      try {
        const { title, description } = req.body;

        if (!title || !description) {
          return res.status(400).json({ message: 'Title and description are required' });
        }

        const { data, error } = await supabase
          .from('todos')
          .insert({ title, description });

        if (error) {
          return res.status(500).json({ message: 'Error creating todo' });
        }

        return res.status(201).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating todo' });
      }

    case 'PATCH':
      try {
        const { id } = req.query;
        const { title, description } = req.body;

        if (!id) {
          return res.status(400).json({ message: 'ID is required' });
        }

        if (!title && !description) {
          return res.status(400).json({ message: 'At least one field is required' });
        }

        const { data, error } = await supabase
          .from('todos')
          .update(id, { title, description });

        if (error) {
          return res.status(500).json({ message: 'Error updating todo' });
        }

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Error updating todo' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ message: 'ID is required' });
        }

        const { data, error } = await supabase
          .from('todos')
          .delete(id);

        if (error) {
          return res.status(500).json({ message: 'Error deleting todo' });
        }

        return res.status(204).json({ message: 'Todo deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting todo' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default todosApi;