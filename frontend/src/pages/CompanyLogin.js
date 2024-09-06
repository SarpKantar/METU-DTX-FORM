import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styling/LoginPage.css';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password]);

  const handleLogin = async () => {
    setErrorMessage(''); // Clear previous error message
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user session in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user));

      // Directly navigate to the company dashboard
      navigate('/company-dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please check your credentials.'); // Set error message
    }
  };

  const handleBack = () => {
    navigate('/login'); // Always navigate to the login page
  };

  return (
    <div className="container">
      <h1 className="title">Company Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        required
      />
      <button className="button" onClick={handleLogin}>Login</button>
      <button className="button" onClick={handleBack}>Back</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default CompanyLogin;