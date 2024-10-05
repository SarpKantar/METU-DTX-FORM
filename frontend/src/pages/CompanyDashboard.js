import React, { useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase'; // Import storage from firebase.js
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import '../styling/CompanyDashboard.css';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase'; // Import Firestore
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import pdfIcon from '../file_icons/pdf-icon.png';
import docIcon from '../file_icons/doc-icon.png';
import xlsIcon from '../file_icons/xls-icon.png';
import uploadArrow from '../upload-big-arrow.png'; 
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { useDropzone } from 'react-dropzone';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [assessors, setAssessors] = useState([]); // State for assessors
  const [showAssessors, setShowAssessors] = useState(false); // State to toggle assessor visibility
  const [expandedAssessorId, setExpandedAssessorId] = useState(null); // State to track expanded assessor
  const { currentUser, setCurrentUser, logout } = useAuth();
  const [assessorStatuses, setAssessorStatuses] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [fileIcon, setFileIcon] = useState(null);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    console.log('Retrieved user from session storage:', user); // Log the user
    if (!user) {
      navigate(-1);
    } else {
      fetchCompanyName(); // Fetch company name when the component mounts
      fetchAssessors(); // Fetch assessors when the component mounts
      fetchFeedbacks();
    }
  }, [navigate]);

  const fetchCompanyName = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const companyDoc = await getDoc(doc(db, 'companyUsers', user.uid));
    console.log('Retrieved company document from Firestore:', companyDoc.data()); // Log the company document
    if (companyDoc.exists()) {
      setCompanyName(companyDoc.data().companyName); // Assuming the company's name is stored in the 'companyName' field
      fetchUploadedFiles(companyDoc.data().companyName); // Fetch uploaded files when company name is retrieved
    }
  };

  const fetchUploadedFiles = async (companyName) => {
    const storageRef = ref(storage, `companyFiles/${companyName}`);
    const fileList = await listAll(storageRef);
    const files = await Promise.all(fileList.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const metadata = await getMetadata(itemRef);
      return { name: itemRef.name, url, type: metadata.contentType };
    }));
    setUploadedFiles(files);
  };
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const fetchUploadedFiles = useCallback(async () => {
    try {
        const userId = currentUser.uid;
        console.log(`Fetching uploaded files for user ID: ${userId}`);

        const filesRef = ref(storage, `companyFiles/${userId}`);
        console.log(`Files reference: ${filesRef.toString()}`);

        const filesList = await listAll(filesRef);
        console.log(`Files list retrieved: ${filesList.items.length} items found.`);

        const filesData = await Promise.all(
            filesList.items.map(async (item) => {
                const url = await getDownloadURL(item);
                console.log(`Retrieved URL for file: ${item.name}`);
                return { name: item.name, url };
            })
        );

        console.log(`Successfully fetched ${filesData.length} files.`);
        setUploadedFiles(filesData);
    } catch (error) {
        console.error('Error fetching files:', error);
        // Hata alındığında state değişikliği yapmaktan kaçının
    }
}, [currentUser.uid]);

  const fetchAssessors = useCallback(async () => {
    const assessorCollection = collection(db, 'assessorUsers'); // Adjust the collection name as needed
    const assessorSnapshot = await getDocs(assessorCollection);
    const assessorList = assessorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    // Assessor'ların durumunu kontrol et
    const collaborationRequestsSnapshot = await getDocs(collection(db, 'collaborationRequests'));
    const statuses = {};
    collaborationRequestsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.companyId === sessionStorage.getItem('companyId')) {
        statuses[data.assessorId] = data.status;
      }
    });
  
    setAssessors(assessorList); // Set the assessors state
    setAssessorStatuses(statuses); // Set the assessor statuses
  }, []);

  const fetchFeedbacks = useCallback(async () => {
    const collaborationRequestsSnapshot = await getDocs(collection(db, 'collaborationRequests'));
    const feedbacks = {};
    collaborationRequestsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.companyId === sessionStorage.getItem('companyId') && data.feedback) {
        feedbacks[data.assessorId] = data.feedback;
      }
    });
    setFeedbacks(feedbacks);
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchUploadedFiles();
      fetchAssessors(); // Fetch assessors when the component mounts
      fetchFeedbacks();
    }
  }, [navigate, fetchUploadedFiles, fetchAssessors, fetchFeedbacks]);


  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteFile = async (fileName) => {
    try {
      const fileRef = ref(storage, `companyFiles/${fileName}`);
      await deleteObject(fileRef);
      fetchUploadedFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFillAssessmentForm = () => {
    navigate('/company-form'); // Ensure this route is correct
  };

  const handleLogout = async () => {
    await logout(); // Call the logout function
    setCurrentUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    navigate(-1, { replace: true });
  };

  const handleUpload = async () => {
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    if (!companyName) {
      alert('Company name not found.');
      return;
    }

    const storageRef = ref(storage, `companyFiles/${companyName}/${file.name}`);

    uploadBytes(storageRef, file)
      .then(() => {
        setUploadStatus('File uploaded successfully!'); // Set success message
        setShowUploadSuccess(true);
        setFile(null);
        setFileName('');
        // Fetch the updated list of uploaded files
        fetchUploadedFiles(companyName);
        setTimeout(() => {
          setShowUploadSuccess(false);
          setUploadStatus('');
          setFileIcon(null);
        }, 3000);

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
      setFileName(selectedFile.name.slice(0, 15) + (selectedFile.name.length > 15 ? '...' : ''));
      setFileIcon(getFileIcon(selectedFile.type));
      setShowUploadSuccess(false); // Reset the upload success state
      setUploadStatus(''); // Clear any previous upload status
    } else {
      setFile(null);
      setFileName('');
      setFileIcon(null);
    }
  };

  const handleRequestCollaboration = async (assessorId) => {
    try {
      const companyId = sessionStorage.getItem('companyId'); // Assuming you have the company ID
  
      if (!companyId) {
        throw new Error('Company ID not found in session storage.');
      }
  
      // Daha önce aynı assessor'a istek gönderilip gönderilmediğini kontrol et
      const collaborationRequestsSnapshot = await getDocs(collection(db, 'collaborationRequests'));
      const existingRequest = collaborationRequestsSnapshot.docs.find(doc => {
        const data = doc.data();
        return data.companyId === companyId && data.assessorId === assessorId;
      });
  
      if (existingRequest) {
        alert('You have already sent a request to this assessor.');
        return;
      }
  
      await addDoc(collection(db, 'collaborationRequests'), {
        companyId: companyId, // Use the retrieved company ID
        assessorId: assessorId,
        status: 'pending', // Initial status
        //createdAt: new Date(),
      });
  
      // Assessor'un durumunu güncelle
      setAssessorStatuses(prevStatuses => ({
        ...prevStatuses,
        [assessorId]: 'pending'
      }));
  
      alert('Collaboration request sent successfully!');
    } catch (error) {
      console.error('Error sending collaboration request:', error.message);
      alert('Failed to send collaboration request. Please try again.');
    }
  };

  const toggleAssessors = () => {
    setShowAssessors(!showAssessors); // Toggle the visibility of assessors
  };

  const toggleAssessorDetails = (assessorId) => {
    setExpandedAssessorId(expandedAssessorId === assessorId ? null : assessorId); // Toggle the selected assessor's details
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
    <div className="company-dashboard-container">
      <h1 className="company-dashboard-title">Company Dashboard</h1>
      <div className="company-dashboard-content">
        <div className="company-dashboard-left-section">
          <button className="company-dashboard-button dark" onClick={handleFillAssessmentForm}>Fill Assessment Form</button>
        </div>
        
        <div className="company-dashboard-center-section">
          <h2 className="company-dashboard-assessor-header" onClick={toggleAssessors}>
            Available Assessors {showAssessors ? '▲' : '▼'}
          </h2>
          {showAssessors && (
            <div className="company-dashboard-assessor-list">
          {assessors.length === 0 ? (
            <p>No assessors available.</p>
          ) : (
            assessors.map(assessor => (
              <div key={assessor.id} className="assessor-item">
                <p onClick={() => toggleAssessorDetails(assessor.id)} style={{ cursor: 'pointer' }}>
                  {assessor.name} - {assessor.email} {expandedAssessorId === assessor.id ? '▼' : '▲'}
                </p>
                {expandedAssessorId === assessor.id && (
                  <div className="assessor-details">
                    <p><strong>Phone:</strong> {assessor.phone}</p>
                    <p><strong>Expertise:</strong> {assessor.expertise}</p>
                    {assessorStatuses[assessor.id] ? (
                      <div className={`status-box ${assessorStatuses[assessor.id]}`}>
                        {assessorStatuses[assessor.id]}
                      </div>
                    ) : (
                      <button className="button" onClick={() => handleRequestCollaboration(assessor.id)}>Work with this Assessor</button>
                    )}
                    {feedbacks[assessor.id] && (
                      <div className="feedback-box">
                        <p><strong>Feedback:</strong> {feedbacks[assessor.id]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
  </div>
  <div className="company-dashboard-right-section">
  <div className="company-dashboard-upload-container">
    <label className="company-dashboard-file-upload">
      Choose File
      <input type="file" onChange={handleFileChange} className="company-dashboard-file-input" />
    </label>
    <img 
      src={uploadArrow} 
      alt="Upload" 
      className="company-dashboard-upload-arrow" 
      onClick={handleUpload}
    />
  </div>
  {fileName && !showUploadSuccess && (
    <div className="company-dashboard-selected-file">
      {fileIcon && <img src={fileIcon} alt="File Icon" className="company-dashboard-file-icon" />}
      <span>Selected File: {fileName}</span>
    </div>
  )}
  {showUploadSuccess && (
    <>
      {uploadStatus && <p>{uploadStatus}</p>}
    </>
  )}
  
  <div className="company-dashboard-uploaded-files">
    <h2>Uploaded Files</h2>
    <ul>
      {uploadedFiles.map(file => (
        <li key={file.name}>
          <img src={getFileIcon(file.type)} alt="File Icon" className="company-dashboard-file-icon" />
          <a href={file.url} download>{file.name}</a>
        </li>
      ))}
    </ul>
  </div>
</div>
      </div>
      <div className="company-dashboard-logout-container">
        <button className="company-dashboard-button light company-dashboard-logout-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
);
};

export default CompanyDashboard;