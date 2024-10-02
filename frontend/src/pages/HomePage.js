import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/HomePage.css';
import DTXLogo from '../DTX-Logo-Sqr.png';

const Image = ({ src, alt, className }) => <img src={src} alt={alt} className={className} />;

const HomePage = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState('main');

  const handleShowLoginOptions = () => {
    setShowOptions('login');
  };

  const handleShowRegisterOptions = () => {
    setShowOptions('register');
  };

  const handleCompanyLogin = () => {
    
    navigate('/login-company')
  };
  
  const handleAssessorLogin = () => {
    
    navigate('/login-assessor');
  };

  const handleCompanyRegister = () => {
    navigate('/register/company');
  };

  const handleAssessorRegister = () => {
    navigate('/register/assessor');
  };

  const handleBack = () => {
    setShowOptions('main');
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <Image src={DTXLogo} alt="METU DTX Logo" className="logo large-logo" />
      </div>
      <div className="login-box">
        <h1 className="title-home">
          <span>METU DTX</span>
          <div>Digital Maturity Assessment</div>
        </h1>
        {showOptions === 'main' && (
          <>
            <button className="button dark" onClick={handleShowLoginOptions}>Log in</button>
            <button className="button light" onClick={handleShowRegisterOptions}>Sign up</button>
          </>
        )}
        {showOptions === 'login' && (
          <>
            <button className="button dark" onClick={handleCompanyLogin}>Log in as Company</button>
            <button className="button dark" onClick={handleAssessorLogin}>Log in as Assessor</button>
            <button className="button light" onClick={handleBack}>Back</button>
          </>
        )}
        {showOptions === 'register' && (
          <>
            <button className="button dark" onClick={handleCompanyRegister}>Sign up as Company</button>
            <button className="button dark" onClick={handleAssessorRegister}>Sign up as Assessor</button>
            <button className="button light" onClick={handleBack}>Back</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;