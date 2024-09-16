import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { ref, uploadBytes } from 'firebase/storage';
import '../styling/AssessorDashboard.css';
import { useAuth } from '../context/AuthContext';
import pdfIcon from '../file_icons/pdf-icon.png';
import docIcon from '../file_icons/doc-icon.png';
import xlsIcon from '../file_icons/xls-icon.png';

const AssessorDashboard = () => {
  const [companyForms, setCompanyForms] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, logout } = useAuth();
  const [fileIcon, setFileIcon] = useState(null);
  const [attainedCompanies, setAttainedCompanies] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      const fetchCompanyForms = async () => {
        const userObj = JSON.parse(user);
        const assessorDoc = await getDoc(doc(db, 'assessorUsers', userObj.uid));
        
        if (assessorDoc.exists()) {
          const assignedCompanyIDs = assessorDoc.data().assignedCompanyIDs;

          const querySnapshot = await getDocs(collection(db, 'companyForms'));
          const forms = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(form => assignedCompanyIDs.includes(form.id));

          setCompanyForms(forms);

          const usersSnapshot = await getDocs(collection(db, 'companyUsers'));
          const users = usersSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(user => assignedCompanyIDs.includes(user.id));

          setAttainedCompanies(assignedCompanyIDs);
          setCompanyUsers(users);
        }
      };

      fetchCompanyForms();
    }
  }, [navigate]);

  const handleLogout = async () => {
    console.log('Current User before logout:', currentUser);
    await logout();
    setCurrentUser(null);
    console.log('Current User after logout:', currentUser);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    navigate('/login', { replace: true });
  };

  const downloadPDF = (form) => {
    const doc = new jsPDF();
    doc.text(JSON.stringify(form, null, 2), 10, 10);
    doc.save(`${form.companyName}.pdf`);
  };

  const downloadWord = (form) => {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/msword' });
    saveAs(blob, `${form.companyName}.doc`);
  };

  const handleAssessment = () => {
    navigate('/assessment-form');
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name.slice(0, 15));
      setFileIcon(getFileIcon(selectedFile.type));
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

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const storageRef = ref(storage, `assessorFiles/${file.name}`);
    
    uploadBytes(storageRef, file)
      .then(() => {
        setUploadStatus('File uploaded successfully!');
        setFile(null);
        setFileName('');
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
      });
  };

  const handleCompanyClick = (companyID) => {
    navigate(`/company-answer/${companyID}`);
  };

  return (
    <div className="container">
      <h1 className="title">Assessor Dashboard</h1>
      <div className="options">
        <h2>Attained Companies</h2>
        <div>
          {attainedCompanies.map(companyID => {
            const company = companyUsers.find(form => form.id === companyID);
            return (
              <button key={companyID} className="attained-button" onClick={() => handleCompanyClick(companyID)}>
                {company ? company.companyName : 'Unknown Company'}
              </button>
            );
          })}
        </div>
        <h2>Company Forms</h2>
        <ul>
          {companyForms.map(form => (
            <li key={form.id}>
              <span>{form.companyName}</span>
              <button className="download-button" onClick={() => downloadPDF(form)}>Download PDF</button>
              <button className="download-button" onClick={() => downloadWord(form)}>Download Word</button>
            </li>
          ))}
        </ul>
        <button className="button" onClick={handleAssessment}>Fill Assessment Form</button>
        <button className="button" onClick={handleBack}>Back</button>
        <button className="button" onClick={handleLogout}>Log Out</button>
      </div>
      <div className="upload-section">
        <h2>Upload File</h2>
        <label className="custom-file-upload">
          Choose File
          <input type="file" onChange={handleFileChange} className="file-input" />
        </label>
        <button className="button" onClick={handleUpload}>Upload File</button>
        {fileName && (
          <div className="selected-file" style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px' }}>Selected File: {fileName}</p>
            {fileIcon && <img src={fileIcon} alt="File Icon" className="file-icon" />}
          </div>
        )}
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default AssessorDashboard;