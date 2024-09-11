import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase'; // Import storage from firebase.js
import { ref, uploadBytes } from 'firebase/storage';
import '../styling/CompanyDashboard.css';
import { useAuth } from '../context/AuthContext';
import pdfIcon from '../file_icons/pdf-icon.png'; // Example icon import
import docIcon from '../file_icons/doc-icon.png'; // Example icon import
import xlsIcon from '../file_icons/xls-icon.png'; // Example icon import

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState(''); // New state for file name
  const [fileIcon, setFileIcon] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFillAssessmentForm = () => {
    navigate('/company-form'); // Ensure this route is correct
  };

  const handleLogout = async () => {
    await logout(); // Call the logout function
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
        setUploadStatus('File uploaded successfully!');
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
      setFileName(selectedFile.name.slice(0, 15));
      setFileIcon(getFileIcon(selectedFile.type)); // Set the icon based on file type
    } else {
      alert('No file selected.');
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'application/pdf':
        return pdfIcon;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword': 
        return docIcon;
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return xlsIcon;
      default:
        return null;
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
      {fileName && (
        <div className="selected-file" style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Selected File: {fileName}</p>
          {fileIcon && <img src={fileIcon} alt="File Icon" className="file-icon" />} {/* Display the icon */}
        </div>
      )}
      {uploadStatus && <p>{uploadStatus}</p>}
      <button className="button" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default CompanyDashboard;