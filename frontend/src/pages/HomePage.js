import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleShowRegisterOptions = () => {
    setShowRegisterOptions(true);
  };

  const handleCompanyRegister = () => {
    navigate('/register/company');
  };

  const handleAssessorRegister = () => {
    navigate('/register/assessor');
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1 className="title-home">Digital Innovation Assessment</h1>
        {!showRegisterOptions ? (
          <>
            <button className="button" onClick={handleLogin}>Log in</button>
            <button className="button" onClick={handleShowRegisterOptions}>Sign up</button>
          </>
        ) : (
          <>
            <button className="button" onClick={handleCompanyRegister}>Company Register</button>
            <button className="button" onClick={handleAssessorRegister}>Assessor Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;