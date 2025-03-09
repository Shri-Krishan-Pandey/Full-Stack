import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// In-memory storage for credentials
// let users = [];
import { users } from '../components/users';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    // Check if username already exists
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      setError('Username already taken');
      return;
    }

    // Store credentials in memory
    users.push({ username, password });
    console.log('Users:', users); // For debugging

    // Show success message and redirect
    setSuccess('Signup successful! Redirecting to login...');
    setTimeout(() => navigate('/signin'), 2000);
  };

  return (
    <div className="form-container">
      <h2>Sign up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSignup}>
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
          Sign Up
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}

export default Signup;
