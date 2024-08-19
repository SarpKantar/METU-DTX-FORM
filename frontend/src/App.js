import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyLogin from './pages/CompanyLogin';
import AssessorLogin from './pages/AssessorLogin';
import CompanyRegister from './pages/CompanyRegister';
import AssessorRegister from './pages/AssessorRegister';
import CompanyForm from './pages/CompanyForm';
import FetchData from './components/FetchData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/login/company" element={<CompanyLogin />} />
        <Route path="/login/assessor" element={<AssessorLogin />} />
        <Route path="/register/company" element={<CompanyRegister />} />
        <Route path="/register/assessor" element={<AssessorRegister />} />
        <Route path="/company-form" element={<CompanyForm />} />
        <Route path="/fetch-data" element={<FetchData />} />
      </Routes>
    </Router>
  );
}

export default App;