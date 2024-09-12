import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styling/AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingCompanyRequests, setPendingCompanyRequests] = useState([]);
  const [pendingAssessorRequests, setPendingAssessorRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [collaborationRequests, setCollaborationRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const pendingSnapshot = await getDocs(collection(db, 'pendingUsers'));
      const companyRequests = [];
      const assessorRequests = [];

      pendingSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.type === 'company') {
          companyRequests.push({ id: doc.id, ...doc.data() });
        } else if (data.type === 'assessor') {
          assessorRequests.push({ id: doc.id, ...doc.data() });
        }
      });

      setPendingCompanyRequests(companyRequests);
      setPendingAssessorRequests(assessorRequests);
    };

    const fetchCollaborationRequests = async () => {
      const collaborationSnapshot = await getDocs(collection(db, 'collaborationRequests'));
      const collaborationRequests = collaborationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCollaborationRequests(collaborationRequests);
    };

    fetchRequests();
    fetchCollaborationRequests();
  }, []);

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
      navigate('/login');
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

  
  const handleCollaborationApprove = async (requestId) => {
    try {
      const requestRef = doc(db, 'collaborationRequests', requestId);
      await setDoc(requestRef, { status: 'approved' }, { merge: true });
      setCollaborationRequests(collaborationRequests.map(request =>
        request.id === requestId ? { ...request, status: 'approved' } : request
      ));
    } catch (error) {
      console.error('Error approving collaboration request:', error);
    }
  };

  const handleCollaborationReject = async (requestId) => {
    try {
      await deleteDoc(doc(db, 'collaborationRequests', requestId));
      setCollaborationRequests(collaborationRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error rejecting collaboration request:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="requests-list">
        <h2>Pending Requests</h2>
        <h3>Company Requests</h3>
        {pendingCompanyRequests.length === 0 ? (
          <p className="no-requests-message">No company requests available.</p>
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
          <div key={request.id} className="request-item">
            <p>Company ID: {request.companyId}</p>
            <p>Assessor ID: {request.assessorId}</p>
            <p>Status: {request.status}</p>
            {request.status === 'pending' && (
              <div className="button-container">
                <button className="approve" onClick={() => handleCollaborationApprove(request.id)}>Approve</button>
                <button className="reject" onClick={() => handleCollaborationReject(request.id)}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default AdminDashboard;