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
import ActivationPage from './pages/ActivationPage';
import CompanyForm from './pages/CompanyForm'; // Import the CompanyForm
import AssessmentForm from './pages/AssessmentForm'; // Import the AssessmentForm
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

function App() {
  return (
    <AuthProvider>
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
          <Route path="/activation" element={<ActivationPage />} />
          <Route path="/company-form" element={<CompanyForm />} /> {/* Ensure this route exists */}
          <Route path="/assessment-form" element={<AssessmentForm />} /> {/* Ensure this route exists */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;