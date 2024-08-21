import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import '../styling/AssessorDashboard.css';

const AssessorDashboard = () => {
  const [companyForms, setCompanyForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyForms = async () => {
      const querySnapshot = await getDocs(collection(db, 'companyForms'));
      const forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanyForms(forms);
    };

    fetchCompanyForms();
  }, []);

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

  return (
    <div className="container">
      <h1 className="title">Assessor Dashboard</h1>
      <div className="options">
        <h2>Company Forms</h2>
        <ul>
          {companyForms.map(form => (
            <li key={form.id}>
              <span>{form.companyName}</span>
              <button onClick={() => downloadPDF(form)}>Download PDF</button>
              <button onClick={() => downloadWord(form)}>Download Word</button>
            </li>
          ))}
        </ul>
        <button className="button" onClick={handleAssessment}>Fill Assessment Form</button>
        <button className="button" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default AssessorDashboard;