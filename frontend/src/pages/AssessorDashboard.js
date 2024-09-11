import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage} from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { ref, uploadBytes } from 'firebase/storage'; // Import uploadBytes
import '../styling/AssessorDashboard.css';

const AssessorDashboard = () => {
  const [companyForms, setCompanyForms] = useState([]);
  const [file, setFile] = useState(null); // State for file
  const [uploadStatus, setUploadStatus] = useState(''); // State for upload status
  const [fileName, setFileName] = useState(''); // State for file name
  const navigate = useNavigate();

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
            .filter(form => assignedCompanyIDs.includes(form.id)); // Filter by assigned company IDs

          setCompanyForms(forms);
        }
      };

      fetchCompanyForms();
    }
  }, [navigate]);

  const handleLogout = () => {
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
    navigate(-1);
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

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const storageRef = ref(storage, `assessorFiles/${file.name}`); // Store in assessorFiles folder
    
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

  return (
    <div className="container">
      <h1 className="title">Assessor Dashboard</h1>
      <div className="options">
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
        {fileName && <p className="selected-file">Selected File: {fileName}</p>} {/* Display selected file name */}
        {uploadStatus && <p>{uploadStatus}</p>} {/* Display upload status */}
      </div>
    </div>
  );
  
};

export default AssessorDashboard;