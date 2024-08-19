import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
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

    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login/company');
    } catch (error) {
      console.error('Error registering user:', error);
      alert(`Error registering user: ${error.message}`);
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