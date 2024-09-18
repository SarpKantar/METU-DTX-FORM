import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '../components/FeedBackModal';
import '../styling/AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingCompanyRequests, setPendingCompanyRequests] = useState([]);
  const [pendingAssessorRequests, setPendingAssessorRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [selectedCollaborationRequest, setSelectedCollaborationRequest] = useState(null);
  const [approvedCollaborationRequests, setApprovedCollaborationRequests] = useState([]);
  const [selectedApprovedRequest, setSelectedApprovedRequest] = useState(null);
  const [feedbackRequestId, setFeedbackRequestId] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      const pendingSnapshot = await getDocs(collection(db, 'pendingUsers'));
      const companyRequests = [];
      const assessorRequests = [];

      pendingSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.type === 'company') {
          companyRequests.push({ id: doc.id, ...data });
        } else if (data.type === 'assessor') {
          assessorRequests.push({ id: doc.id, ...data });
        }
      });

      setPendingCompanyRequests(companyRequests);
      setPendingAssessorRequests(assessorRequests);

      // Collaboration requests
      const collaborationSnapshot = await getDocs(collection(db, 'collaborationRequests'));
      const collaborationRequests = await Promise.all(collaborationSnapshot.docs.map(async docSnapshot => {
        const requestData = { id: docSnapshot.id, ...docSnapshot.data() };
        const companyDoc = await getDoc(doc(db, 'companyUsers', requestData.companyId));
        const assessorDoc = await getDoc(doc(db, 'assessorUsers', requestData.assessorId));

        return {
          ...requestData,
          companyDetails: companyDoc.exists() ? companyDoc.data() : null,
          assessorDetails: assessorDoc.exists() ? assessorDoc.data() : null,
        };
      }));

      // Onaylı istekleri ayır
      const approvedRequests = collaborationRequests.filter(req => req.status === 'approved');
      const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

      setApprovedCollaborationRequests(approvedRequests);
      setCollaborationRequests(pendingRequests);
    };

    fetchRequests();
  }, []);

  const handleEditCollaborationRequest = (requestId) => {
    setFeedbackRequestId(requestId);
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = async (feedback) => {
    try {
      const requestRef = doc(db, 'collaborationRequests', feedbackRequestId);
      await setDoc(requestRef, { feedback }, { merge: true });
      setIsFeedbackModalOpen(false);
      setFeedbackRequestId(null);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleCollaborationApprove = async (requestId) => {
    try {
      const requestRef = doc(db, 'collaborationRequests', requestId);
      const requestDoc = await getDoc(requestRef);
      const requestData = requestDoc.data();
  
      // Update the collaboration request status to 'approved'
      await setDoc(requestRef, { status: 'approved' }, { merge: true });
  
      // Fetch the assessor's document
      const assessorRef = doc(db, 'assessorUsers', requestData.assessorId);
      const assessorDoc = await getDoc(assessorRef);
  
      if (assessorDoc.exists()) {
        const assessorData = assessorDoc.data();
        const updatedAssignedCompanyIDs = [...(assessorData.assignedCompanyIDs || []), requestData.companyId];
  
        // Update the assessor's assignedCompanyIDs array
        await setDoc(assessorRef, { assignedCompanyIDs: updatedAssignedCompanyIDs }, { merge: true });
      }
  
      // Update local state
      const approvedRequest = collaborationRequests.find(req => req.id === requestId);
      if (approvedRequest) {
        setApprovedCollaborationRequests(prev => [...prev, { ...approvedRequest, status: 'approved' }]);
      }
      setCollaborationRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error approving collaboration request:', error);
    }
  };

  const handleCollaborationReject = async (requestId) => {
    setFeedbackRequestId(requestId);
    setIsFeedbackModalOpen(true);
    try {
      const requestRef = doc(db, 'collaborationRequests', requestId);
      await setDoc(requestRef, { status: 'rejected' }, { merge: true });

      // Reddedilen isteği yerel state'den kaldır
      setCollaborationRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting collaboration request:', error);
    }
  };

  const handleCollaborationRequestClick = (request) => {
    if (selectedCollaborationRequest && selectedCollaborationRequest.id === request.id) {
      setSelectedCollaborationRequest(null); // Aynı isteğe tekrar tıklanırsa kapat
    } else {
      setSelectedCollaborationRequest(request); // İsteği aç
    }
  };

  const handleApprovedRequestClick = (request) => {
    if (selectedApprovedRequest && selectedApprovedRequest.id === request.id) {
      setSelectedApprovedRequest(null); // Aynı isteğe tekrar tıklanırsa kapat
    } else {
      setSelectedApprovedRequest(request); // İsteği aç
    }
  };

  const handleApprove = async (id, type) => {
    const docRef = doc(db, 'pendingUsers', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const newCollection = type === 'company' ? 'companyUsers' : 'assessorUsers';

      // Move to the appropriate collection
      await setDoc(doc(db, newCollection, id), { ...userData, status: 'approved' });

      // Delete from pendingUsers
      await deleteDoc(docRef);

      // Update local state
      if (type === 'company') {
        setPendingCompanyRequests(pendingCompanyRequests.filter(request => request.id !== id));
      } else {
        setPendingAssessorRequests(pendingAssessorRequests.filter(request => request.id !== id));
      }
      setSelectedUser(null);
    }
  };

  const handleReject = async (id, type) => {
    const docRef = doc(db, 'pendingUsers', id);

    // Delete from pendingUsers
    await deleteDoc(docRef);

    // Update local state
    if (type === 'company') {
      setPendingCompanyRequests(pendingCompanyRequests.filter(request => request.id !== id));
    } else {
      setPendingAssessorRequests(pendingAssessorRequests.filter(request => request.id !== id));
    }
    setSelectedUser(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleUserClick = (user) => {
    if (selectedUser && selectedUser.id === user.id) {
      setSelectedUser(null); // Deselect if the same user is clicked again
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="requests-list">
        <h2>Pending Requests</h2>
        <h3>Company Requests</h3>
        {pendingCompanyRequests.length === 0 ? (
          <p >No company requests available.</p>
        ) : (
          pendingCompanyRequests.map(request => (
            <div key={request.id} className="request-item" onClick={() => handleUserClick(request)}>
              <p>{request.email}</p>
              <div className='button-container'>
                <button className='approve' onClick={() => handleApprove(request.id, 'company')}>Approve</button>
                <button className='reject' onClick={() => handleReject(request.id, 'company')}>Reject</button>
              </div>
              {selectedUser && selectedUser.id === request.id && (
                <div className="user-details">
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Type:</strong> {selectedUser.type}</p>
                  {selectedUser.companyName && <p><strong>Company Name:</strong> {selectedUser.companyName}</p>}
                </div>
              )}
            </div>
          ))
        )}
        <h3>Assessor Requests</h3>
        {pendingAssessorRequests.length === 0 ? (
          <p>No assessor requests available.</p>
        ) : (
          pendingAssessorRequests.map(request => (
            <div key={request.id} className="request-item" onClick={() => handleUserClick(request)}>
              <p>{request.email}</p>
              <div className='button-container'>
                <button className='approve' onClick={() => handleApprove(request.id, 'assessor')}>Approve</button>
                <button className='reject' onClick={() => handleReject(request.id, 'assessor')}>Reject</button>
              </div>
              {selectedUser && selectedUser.id === request.id && (
                <div className="user-details">
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Type:</strong> {selectedUser.type}</p>
                  {selectedUser.name && <p><strong>Name:</strong> {selectedUser.name}</p>}
                  {selectedUser.surname && <p><strong>Surname:</strong> {selectedUser.surname}</p>}
                  {selectedUser.linkedin && <p><strong>LinkedIn:</strong> {selectedUser.linkedin}</p>}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <h2>Collaboration Requests</h2>
      {collaborationRequests.length === 0 ? (
        <p>No collaboration requests available.</p>
      ) : (
        collaborationRequests.map(request => (
          <div key={request.id} className="request-item" onClick={() => handleCollaborationRequestClick(request)}>
            <p>Company ID: {request.companyId}</p>
            <p>Assessor ID: {request.assessorId}</p>
            <p>Status: {request.status}</p>
            {request.status === 'pending' && (
              <div className="button-container">
                <button className="approve" onClick={() => handleCollaborationApprove(request.id)}>Approve</button>
                <button className="reject" onClick={() => handleCollaborationReject(request.id)}>Reject</button>
              </div>
            )}
            {selectedCollaborationRequest && selectedCollaborationRequest.id === request.id && (
              <div className="collaboration-details">
                <div className="collaboration-box">
                  {request.companyDetails && (
                    <div>
                      <h4>Company Details</h4>
                      <p><strong>Company Name:</strong> {request.companyDetails.companyName}</p>
                      <p><strong>Email:</strong> {request.companyDetails.email}</p>
                    </div>
                  )}
                </div>
                <div className="collaboration-box">
                  {request.assessorDetails && (
                    <div>
                      <h4>Assessor Details</h4>
                      <p><strong>Assessor Name:</strong> {request.assessorDetails.name}</p>
                      <p><strong>Email:</strong> {request.assessorDetails.email}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <h2>Approved Collaboration Requests</h2>
      {approvedCollaborationRequests.length === 0 ? (
        <p>No approved collaboration requests available.</p>
      ) : (
        approvedCollaborationRequests.map(request => (
          <div key={request.id} className="request-item" onClick={() => handleApprovedRequestClick(request)}>
            <p>Company ID: {request.companyId}</p>
            <p>Assessor ID: {request.assessorId}</p>
            <p>Status: {request.status}</p>
            {selectedApprovedRequest && selectedApprovedRequest.id === request.id && (
              <div className="info-container"> {/* Flexbox konteyneri */}
                <div className="info-box">
                  {request.companyDetails && (
                    <div>
                      <h4>Company Details</h4>
                      <p><strong>Company Name:</strong> {request.companyDetails.companyName}</p>
                      <p><strong>Email:</strong> {request.companyDetails.email}</p>
                    </div>
                  )}
                </div>
                <div className="info-box">
                  {request.assessorDetails && (
                    <div>
                      <h4>Assessor Details</h4>
                      <p><strong>Assessor Name:</strong> {request.assessorDetails.name}</p>
                      <p><strong>Email:</strong> {request.assessorDetails.email}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default AdminDashboard;