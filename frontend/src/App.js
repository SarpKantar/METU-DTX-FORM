import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyAnswer from './pages/CompanyAnswer';
import HomePage from './pages/HomePage';
import CompanyRegister from './pages/CompanyRegister';
import AssessorRegister from './pages/AssessorRegister';
import CompanyLogin from './pages/CompanyLogin';
import AssessorLogin from './pages/AssessorLogin';
import CompanyDashboard from './pages/CompanyDashboard';
import AssessorDashboard from './pages/AssessorDashboard';
import ActivationPage from './pages/ActivationPage';
import CompanyForm from './pages/CompanyForm'; // Import the CompanyForm
import AssessmentForm from './pages/AssessmentForm'; // Import the AssessmentForm
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import AdminLogin from './pages/AdminLogin';

import AdminDashboard from './pages/AdminDashboard';
import ChatbotInterface from './components/ChatbotInterface';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register/company" element={<CompanyRegister />} />
          <Route path="/register/assessor" element={<AssessorRegister />} />
          <Route path="/login-company" element={<CompanyLogin />} />
          <Route path="/login-assessor" element={<AssessorLogin />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/assessor-dashboard" element={<AssessorDashboard />} />
          <Route path="/activation" element={<ActivationPage />} />
          <Route path="/company-answer/:companyID" element={<CompanyAnswer />} />
          <Route path="/company-form" element={<CompanyForm />} /> {/* Ensure this route exists */}
          <Route path="/assessment-form" element={<AssessmentForm />} /> {/* Ensure this route exists */}
          <Route path="/chatbot" element={<ChatbotInterface />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;