import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userType = JSON.parse(user).userType;
      if (userType === 'assessor') {
        navigate('/assessor-dashboard');
      } else if (userType === 'company') {
        navigate('/company-form');
      }
    }
  }, [navigate]);

  return children;
};

export default SessionChecker;