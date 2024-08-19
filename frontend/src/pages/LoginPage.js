import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleCompanyLogin = () => {
    navigate('/login/company');
  };

  const handleAssessorLogin = () => {
    navigate('/login/assessor');
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <button className="button" onClick={handleCompanyLogin}>Company Login</button>
      <button className="button" onClick={handleAssessorLogin}>Assessor Login</button>
      <button className="top-left-button-login" onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default LoginPage;