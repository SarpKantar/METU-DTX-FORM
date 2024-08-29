import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/CompanyDashboard.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFillAssessmentForm = () => {
    navigate('/company-form');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    navigate('/login', { replace: true });
  };

  return (
    <div className="container">
      <h1 className="title">Company Dashboard</h1>
      <button className="button" onClick={handleFillAssessmentForm}>Fill Assessment Form</button>
      <button className="button" onClick={handleLogout}>Log Out</button> {/* Logout Button */}
    </div>
  );
};

export default CompanyDashboard;