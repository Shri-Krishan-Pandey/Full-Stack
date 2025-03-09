import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Import the in-memory users array
import { users } from '../components/users';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');

    // Find the user in the in-memory storage
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Simulate token storage
      localStorage.setItem('authToken', 'dummy-token');
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Signin;