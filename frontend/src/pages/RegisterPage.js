import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleCompanyRegister = () => {
    navigate('/register/company');
  };

  const handleAssessorRegister = () => {
    navigate('/register/assessor');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <button className="button" onClick={handleCompanyRegister}>Company Register</button>
      <button className="button" onClick={handleAssessorRegister}>Assessor Register</button>
      <button className="top-left-button-register" onClick={() => navigate('/')}>Return to Home</button>
      <button className="button" onClick={handleBack}>Back</button>
    </div>
  );
};

export default RegisterPage;