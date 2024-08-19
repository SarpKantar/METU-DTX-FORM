import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/RegisterPage.css';

const CompanyRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/api/register', { email, password });
      console.log(res.data);
      navigate('/login/company');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Company Register</h1>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
      />
      <button className="button" onClick={handleRegister}>Register</button>
      <button className="button" onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default CompanyRegister;