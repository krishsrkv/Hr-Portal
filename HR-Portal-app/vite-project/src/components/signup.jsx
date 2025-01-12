import React, { useState } from "react";
import '../App.css'; 

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!name || !email || !password || !role) {
      setError("All fields are required!");
      return;
    }

    // Simulate an API call
    setTimeout(() => {
      console.log("Sign-Up Data:", { name, email, password, role });
      setSuccess("Sign-up successful!");
    }, 1000);
  };

  return (
    <div className="form-container">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label>Role</label>
          <div>
            <input
              type="radio"
              id="hr"
              name="role"
              value="HR"
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <label htmlFor="hr">HR</label>
          </div>
          <div>
            <input
              type="radio"
              id="employee"
              name="role"
              value="Employee"
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <label htmlFor="employee">Employee</label>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;