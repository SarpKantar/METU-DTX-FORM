import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import '../styling/LoginPage.css';

const AssessorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {      
    console.log('Current User:', currentUser);
    if (currentUser) {
      const checkUserType = async () => {
        const q = query(collection(db, 'assessorUsers'), where('email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          console.log('User is an assessor user, navigating to dashboard.');
          navigate('/assessor-dashboard'); // Redirect to assessor dashboard if already logged in
        }
      };
      checkUserType();
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    setErrorMessage(''); // Clear previous error message
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user session in sessionStorage
      setCurrentUser(user); 
      sessionStorage.setItem('user', JSON.stringify(user)); 

      // Check if the user is in the pendingUsers collection
      const pendingUserQuery = query(collection(db, 'pendingUsers'), where('email', '==', user.email));
      const pendingUserSnapshot = await getDocs(pendingUserQuery);

      if (!pendingUserSnapshot.empty) {
        setErrorMessage('Your account is pending approval. Please wait for an administrator to review your registration.');
        return;
      }

      // Check if the user is an assessor user using their email
      const q = query(collection(db, 'assessorUsers'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        navigate('/assessor-dashboard');
      } else {
        setErrorMessage('User is not an assessor user.'); // Handle case where user is not an assessor user
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
      <h1 className="title">Assessor Login</h1>
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

export default AssessorLogin;