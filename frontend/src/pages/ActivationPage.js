import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/ActivationPage.css';

const ActivationPage = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login/company'); // Redirect to the company login page
  };

  return (
    <div className="container">
      <h1 className="title">Activate Your Account</h1>
      <p>
        A verification email has been sent to your email address. Please check your inbox and click on the verification link to activate your account.
      </p>
      <p>
        If you don't see the email, please check your spam folder.
      </p>
      <button className="button" onClick={handleBackToLogin}>Back to Login</button>
    </div>
  );
};

export default ActivationPage;