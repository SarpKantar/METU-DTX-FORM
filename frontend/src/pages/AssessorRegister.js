import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, doc, setDoc,collection } from 'firebase/firestore';
import '../styling/RegisterPage.css';

const AssessorRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [surname, setSurname] = useState(''); // New state for surname
  const navigate = useNavigate();
  const [assignedCompanyIDs, setAssignedCompanyIDs] = useState([]); // New state for assigned company IDs
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

      const companyDocRef = await addDoc(collection(db, 'assessorUsers'), {
        email: user.email,
        name: name, // Include name
        surname: surname, // Include surname
        assignedCompanyIDs: [], // Initialize assignedCompanyIDs as an empty array
      });
      // Store additional user information in Firestore
      await setDoc(doc(db, 'assessorUsers', companyDocRef.id), {
        email: user.email,
        name: name, // Include name
        surname: surname, // Include surname
        assignedCompanyIDs: [], // Initialize assignedCompanyIDs as an empty array
        assessorID: companyDocRef.id
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
    <div className="container">
      <h1 className="title">Assessor Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        required
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="input"
        required
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input"
        required
      />
      <button className="button" onClick={handleRegister}>Register</button>
      <button className="button" onClick={handleBack}>Back</button>
    </div>
  );
};

export default AssessorRegister;  