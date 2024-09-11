import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the import based on your firebase config
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const AdminPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'registrationRequests'));
      const requestsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(requestsData);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    const requestDoc = doc(db, 'registrationRequests', id);
    await updateDoc(requestDoc, { status: 'approved' });
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleReject = async (id) => {
    const requestDoc = doc(db, 'registrationRequests', id);
    await updateDoc(requestDoc, { status: 'rejected' });
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-item">
            <p>{request.email}</p>
            <button onClick={() => handleApprove(request.id)}>Approve</button>
            <button onClick={() => handleReject(request.id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;