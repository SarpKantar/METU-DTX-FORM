import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styling/LoginPage.css';

const AssessorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user type in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().userType === 'assessor') {
        navigate('/assessor-dashboard');
      } else {
        alert('Not authorized as assessor user');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleBack = () => {
    navigate(-1);
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
      <button className="button" onClick={() => navigate('/')}>Return to Home</button>
      <button className="button" onClick={handleBack}>Back</button>
    </div>
  );
};

export default AssessorLogin;