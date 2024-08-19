import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginPage.css';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Company Login:', { email, password });
    // Navigate to company form page after successful login
    navigate('/company-form');
  };

  return (
    <div className="container">
      <h1 className="title">Company Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button className="button" onClick={handleLogin}>Login</button>
      <button className="button" onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default CompanyLogin;