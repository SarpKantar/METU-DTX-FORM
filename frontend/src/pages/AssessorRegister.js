import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import '../styling/RegisterPage.css';

const AssessorRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user information in pendingUsers collection
      await setDoc(doc(db, 'pendingUsers', user.uid), {
        email: user.email,
        name: name,
        surname: surname,
        linkedin: linkedin,
        type: 'assessor', // Indicate the type of user
        status: 'pending',
        assignedCompanyIDs: [], // New array for storing company IDs
        assessorID: user.uid
      });

      // Send email verification
      await sendEmailVerification(user);

      // Navigate to the activation page
      navigate('/activation');
    } catch (error) {
      console.error('Error registering user:', error);
      alert(`Error registering user: ${error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };


return (
  <div className="assessor-register-container">
    <h1 className="assessor-register-title">Sign Up as Assessor</h1>
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="assessor-register-input"
      required
    />
    <input
      type="text"
      placeholder="Surname"
      value={surname}
      onChange={(e) => setSurname(e.target.value)}
      className="assessor-register-input"
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="assessor-register-input"
      required
    />
    <input
      type="url"
      placeholder="LinkedIn Profile URL"
      value={linkedin}
      onChange={(e) => setLinkedin(e.target.value)}
      className="assessor-register-input"
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="assessor-register-input"
      required
    />
    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="assessor-register-input"
      required
    />
    <button className="assessor-register-button" onClick={handleRegister}>Sign up</button>
    <button className="assessor-register-back-button" onClick={handleBack}>Back</button>
  </div>
);

};

export default AssessorRegister;