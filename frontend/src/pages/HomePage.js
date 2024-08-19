import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/HomePage.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const HomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login/company');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1 className="title-home">Digital Innovation Assessment</h1>
        <button className="button" onClick={handleLogin}>Log in</button>
        <button className="button" onClick={handleRegister}>Sign up</button>
      </div>
    </div>
  );
};

export default HomePage;