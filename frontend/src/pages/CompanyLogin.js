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
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    console.log('Current User:', currentUser);

    const checkUserType = async () => {
      if (currentUser) {
        const q = query(collection(db, 'companyUsers'), where('email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          console.log('User is a company user, navigating to dashboard.');
          navigate('/company-dashboard');
        } else {
          console.log('No matching company user found.');
        }
      }
    };
    checkUserType();
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setCurrentUser(user);
      console.log('User Logged In:', user);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Check if the user is in the pendingUsers collection
      const pendingUserQuery = query(collection(db, 'pendingUsers'), where('email', '==', user.email));
      const pendingUserSnapshot = await getDocs(pendingUserQuery);

      if (!pendingUserSnapshot.empty) {
        setErrorMessage('Your account is pending approval. Please wait for an administrator to review your registration.');
        return;
      }

      // Check if the user is a company user using their email
      const companyUserQuery = query(collection(db, 'companyUsers'), where('email', '==', user.email));
      const companyUserSnapshot = await getDocs(companyUserQuery);

      if (!companyUserSnapshot.empty) {
        navigate('/company-dashboard');
      } else {
        setErrorMessage('User is not a company user.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const handleBack = () => {
    navigate('/login');
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CompanyLogin;