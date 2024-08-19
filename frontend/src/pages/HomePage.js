import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
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