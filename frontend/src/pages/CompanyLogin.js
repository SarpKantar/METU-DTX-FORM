import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import '../styling/LoginPage.css';

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth(); // Ensure you have a way to set currentUser

  useEffect(() => {
    console.log('Current User:', currentUser);

    const checkUserType = async () => {
      if (currentUser) {
        const q = query(collection(db, 'companyUsers'), where('email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          console.log('User is a company user, navigating to dashboard.');
          navigate('/company-dashboard'); // Redirect to company dashboard if already logged in
        } else {
          console.log('No matching company user found.'); // Log if no user is found
        }
      }
    };
    checkUserType();
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    setErrorMessage(''); // Clear previous error message
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set currentUser in context
      setCurrentUser(user); // Set the current user in context
      console.log('User Logged In:', user);
      sessionStorage.setItem('user', JSON.stringify(user)); // Ensure this line is present

      // Check if the user is a company user using their email
      const q = query(collection(db, 'companyUsers'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Redirect to the company dashboard
        navigate('/company-dashboard');
      } else {
        setErrorMessage('User is not a company user.'); // Handle case where user is not a company user
      }
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