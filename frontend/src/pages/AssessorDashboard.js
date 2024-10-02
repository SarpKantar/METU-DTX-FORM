import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import '../styling/AssessorDashboard.css';
import { useAuth } from '../context/AuthContext';
import pdfIcon from '../file_icons/pdf-icon.png';
import docIcon from '../file_icons/doc-icon.png';
import xlsIcon from '../file_icons/xls-icon.png';
import uploadArrow from '../upload-big-arrow.png';

const AssessorDashboard = () => {
  const [companyForms, setCompanyForms] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, logout } = useAuth();
  const [fileIcon, setFileIcon] = useState(null);
  const [attainedCompanies, setAttainedCompanies] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);
  const [assessorName, setAssessorName] = useState('');
  const [loading, setLoading] = useState(true);


  const fetchUploadedFiles = async (assessorName) => {
    const storageRef = ref(storage, `assessorFiles/${assessorName}`);
    const fileList = await listAll(storageRef);
    const files = await Promise.all(fileList.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const metadata = await getMetadata(itemRef);
      return { name: itemRef.name, url, type: metadata.contentType };
    }));
    setUploadedFiles(files);
  };

  useEffect(() => {
    if (currentUser === null) {
      navigate('/login-assessor');
    } else if (currentUser) {
      const fetchCompanyForms = async () => {
        const assessorDoc = await getDoc(doc(db, 'assessorUsers', currentUser.uid));
        
        if (assessorDoc.exists()) {
          const assignedCompanyIDs = assessorDoc.data().assignedCompanyIDs;
          setAssessorName(assessorDoc.data().name); // Assuming the assessor's name is stored in the 'name' field

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

          // Fetch uploaded files
          fetchUploadedFiles(assessorDoc.data().name);
          setLoading(false);
        }
      };

      fetchCompanyForms();
    }
    else {
      navigate('/login-assessor');
    }
  }, [currentUser, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }



  const handleLogout = async () => {
    console.log('Current User before logout:', currentUser);
    await logout();
    setCurrentUser(null);
    console.log('Current User after logout:', currentUser);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    navigate(-1, { replace: true });
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
    navigate(-1);
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

    const storageRef = ref(storage, `assessorFiles/${assessorName}/${file.name}`);
    
    uploadBytes(storageRef, file)
      .then(() => {
        setUploadStatus('File uploaded successfully!');
        setFile(null);
        setFileName('');
        // Fetch the updated list of uploaded files
        fetchUploadedFiles(assessorName);
        setTimeout(() => {
          setUploadStatus('');
        }, 3000);
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
<div className="assessor-dashboard-container">
  <h1 className="assessor-dashboard-title">Assessor Dashboard</h1>
  <div className="assessor-dashboard-content">
    <div className="assessor-dashboard-left-section">
      <div className="assessor-dashboard-attained-companies">
        <h2>Attained Companies</h2>
        {attainedCompanies.map(companyID => (
          <button key={companyID} className="assessor-dashboard-attained-button" onClick={() => handleCompanyClick(companyID)}>
            {companyUsers.find(company => company.id === companyID)?.companyName || 'Unknown Company'}
          </button>
        ))}
      </div>
    </div>
    <div className="assessor-dashboard-center-section">
      <button className="assessor-dashboard-button dark" onClick={handleAssessment}>Fill Assessment Form</button>
      <button className="assessor-dashboard-button light" onClick={handleBack}>Back</button>
      <button className="assessor-dashboard-button light" onClick={handleLogout}>Log Out</button>
    </div>

    <div className="assessor-dashboard-right-section">
  <div className="assessor-dashboard-upload-container">
    <label className="assessor-dashboard-file-upload">
      Choose File
      <input type="file" onChange={handleFileChange} className="assessor-dashboard-file-input" />
    </label>
    <img 
      src={uploadArrow} 
      alt="Upload" 
      className="assessor-dashboard-upload-arrow" 
      onClick={handleUpload}
    />
  </div>
  {fileName && (
    <div className="assessor-dashboard-selected-file">
      <img src={fileIcon} alt="File Icon" className="assessor-dashboard-file-icon" />
      <span>Selected File: {fileName}</span>
    </div>
  )}
    {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
  
  <div className="assessor-dashboard-uploaded-files">
  <h2>Uploaded Files</h2>
  <ul>
    {uploadedFiles.map(file => (
      <li key={file.name}>
        <img src={getFileIcon(file.type)} alt="File Icon" className="assessor-dashboard-file-icon" />
        <a href={file.url} download>{file.name}</a>
      </li>
    ))}
  </ul>
</div>
</div>
  </div>
</div>
  );
};

export default AssessorDashboard;