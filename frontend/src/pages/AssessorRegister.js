import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/RegisterPage.css';

const AssessorRegister = () => {
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
      const res = await axios.post('/api/users/register', { email, password, userType: 'company' });
      console.log(res.data);
      navigate('/login/company');
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || 'Error registering user');
    }
  };
  return (
    <div className="container">
      <h1 className="title">Assessor Register</h1>
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
    </div>
  );
};

export default AssessorRegister;