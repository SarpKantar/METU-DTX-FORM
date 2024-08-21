import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleCompanyLogin = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userType = JSON.parse(user).userType;
      if (userType === 'company') {
        navigate('/company-form');
        return;
      }
    }
    navigate('/login/company');
  };
  
  const handleAssessorLogin = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userType = JSON.parse(user).userType;
      if (userType === 'assessor') {
        navigate('/assessor-dashboard');
        return;
      }
    }
    navigate('/login/assessor');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <button className="button" onClick={handleCompanyLogin}>Company Login</button>
      <button className="button" onClick={handleAssessorLogin}>Assessor Login</button>
      <button className="button" onClick={handleBack}>Back</button>
    </div>
  );
};

export default LoginPage;