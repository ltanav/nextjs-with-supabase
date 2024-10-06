import { login } from '../utils/supabase';

const handleLogin = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const user = await login(email, password);
  if (user) {
    console.log('Logged in successfully!');
    // Redirect to a protected page or display a success message
  } else {
    console.error('Invalid login credentials');
    // Display an error message
  }
};

return (
  <form onSubmit={handleLogin}>
    <input type="email" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
);