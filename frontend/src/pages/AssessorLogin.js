import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginPage.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AssessorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to assessor dashboard or another page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Assessor Login</h1>
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

export default AssessorLogin;