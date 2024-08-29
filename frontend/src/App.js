import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyRegister from './pages/CompanyRegister';
import AssessorRegister from './pages/AssessorRegister';
import CompanyLogin from './pages/CompanyLogin';
import AssessorLogin from './pages/AssessorLogin';
import CompanyDashboard from './pages/CompanyDashboard';
import AssessorDashboard from './pages/AssessorDashboard';
import ActivationPage from './pages/ActivationPage'; // Import the ActivationPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/company" element={<CompanyRegister />} />
        <Route path="/register/assessor" element={<AssessorRegister />} />
        <Route path="/login/company" element={<CompanyLogin />} />
        <Route path="/login/assessor" element={<AssessorLogin />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/assessor-dashboard" element={<AssessorDashboard />} />
        <Route path="/activation" element={<ActivationPage />} /> {/* Add the route for ActivationPage */}
      </Routes>
    </Router>
  );
}

export default App;