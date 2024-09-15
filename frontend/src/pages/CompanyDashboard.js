import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase'; // Import storage from firebase.js
import { ref, uploadBytes } from 'firebase/storage';
import '../styling/CompanyDashboard.css';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase'; // Import Firestore
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Import Firestore functions

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileName, setFileName] = useState('');
  const [assessors, setAssessors] = useState([]); // State for assessors
  const [showAssessors, setShowAssessors] = useState(false); // State to toggle assessor visibility
  const [expandedAssessorId, setExpandedAssessorId] = useState(null); // State to track expanded assessor
  const { currentUser, setCurrentUser, logout } = useAuth();
  const [assessorStatuses, setAssessorStatuses] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchAssessors(); // Fetch assessors when the component mounts
      fetchFeedbacks();
    }
  }, [navigate]);

  const fetchAssessors = async () => {
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
  };

  const fetchFeedbacks = async () => {
    const collaborationRequestsSnapshot = await getDocs(collection(db, 'collaborationRequests'));
    const feedbacks = {};
    collaborationRequestsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.companyId === sessionStorage.getItem('companyId') && data.feedback) {
        feedbacks[data.assessorId] = data.feedback;
      }
    });
    setFeedbacks(feedbacks);
  };

  const handleFillAssessmentForm = () => {
    navigate('/company-form'); // Ensure this route is correct
  };

  const handleLogout = async () => {
    await logout(); // Call the logout function
    setCurrentUser(null);
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
      {fileName && <p className="selected-file">Selected File: {fileName}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <button className="button" onClick={handleLogout}>Log Out</button>

      <h2 className="assessor-header" onClick={toggleAssessors} style={{ cursor: 'pointer' }}>
        Available Assessors {showAssessors ? '▲' : '▼'}
      </h2>
      {showAssessors && (
        <div className="assessor-list">
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
  );
};

export default CompanyDashboard;