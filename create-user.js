import createUser from '../utils/supabase';

const handleCreateUser  = async () => {
  try {
    await createUser('example@example.com', 'example-password');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

handleCreateUser ();