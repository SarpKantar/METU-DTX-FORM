import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase'; // Import storage from firebase.js
import { ref, uploadBytes } from 'firebase/storage';
import '../styling/CompanyDashboard.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState(''); // New state for file name

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFillAssessmentForm = () => {
    navigate('/company-form'); // Ensure this route is correct
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    navigate('/login', { replace: true });
  };



  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
  
    const storageRef = ref(storage, `companyFiles/${file.name}`);
    
    uploadBytes(storageRef, file)
      .then(() => {
        setUploadStatus('File uploaded successfully!'); // Set success message
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name.slice(0, 15)); // Show only the first 15 characters
    } else {
      alert('No file selected.');
    }
  };

  return (
    <div className="container">
        <h1 className="title">Company Dashboard</h1>
        <button className="button" onClick={handleFillAssessmentForm}>Fill Assessment Form</button>
        <div className="button-cont1">
          <label className="custom-file-upload">
              Choose File
              <input type="file" onChange={handleFileChange} className="file-input" />
          </label>
          <button className="button" onClick={handleUpload}>Upload File</button>
        </div> 
        {fileName && <p className="selected-file">Selected File: {fileName}</p>} {/* Display selected file name */}
        {uploadStatus && <p>{uploadStatus}</p>} {/* Display upload status */}
        <button className="button" onClick={handleLogout}>Log Out</button>
    </div>
);
};

export default CompanyDashboard;