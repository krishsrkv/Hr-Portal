import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeesData from './hr.json'; // Import employee data
import '../App.css'; // Ensure you have the CSS file imported

const LoginPage = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check credentials against hardcoded values
    const user = employeesData.find(emp => emp.email === email && emp.password === password);
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Invalid credentials!');
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;