import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import '../styling/AssessmentForm.css';

const AssessmentForm = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [formData, setFormData] = useState({
    city: '',
    sector: '',
    producingGoods: '',
    productionOnSite: '',
    useOfCAD: '',
    managementUnderstanding: '',
    inHouseDevelopment: '',
    digitalMaturity: '',
    availabilityOfRAndD: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const querySnapshot = await getDocs(collection(db, 'companyForms'));
      const companyNames = querySnapshot.docs.map(doc => doc.data().companyName);
      setCompanies(companyNames);
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assessmentData = {
      selectedCompany,
      ...formData
    };

    try {
      await addDoc(collection(db, 'assessmentForms'), assessmentData);
      alert('Assessment form submitted successfully!');
      navigate('/assessor-dashboard');
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('Error submitting form');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <div className="intro-text">
        <h1>Assessment Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Company</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            required
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>{company}</option>
            ))}
          </select>
        </div>
        {selectedCompany && (
          <>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="form-group">
              <label>Sector</label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="Enter sector"
                required
              />
            </div>
            <div className="form-group">
              <label>Company is producing goods/process design, is not an engineering company</label>
              <input
                type="text"
                name="producingGoods"
                value={formData.producingGoods}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <div className="form-group">
              <label>There is at least one production on site</label>
              <input
                type="text"
                name="productionOnSite"
                value={formData.productionOnSite}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <div className="form-group">
              <label>Use of (at least) CAD (CAx) and ERP</label>
              <input
                type="text"
                name="useOfCAD"
                value={formData.useOfCAD}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <div className="form-group">
              <label>Company management has a basic understanding of digital transformation</label>
              <input
                type="text"
                name="managementUnderstanding"
                value={formData.managementUnderstanding}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <div className="form-group">
              <label>Company has either an in-house development of own products or collaborative product (or process) development with partners</label>
              <input
                type="text"
                name="inHouseDevelopment"
                value={formData.inHouseDevelopment}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <div className="form-group">
              <label>Company has already a basic level of digital maturity</label>
              <input
                type="text"
                name="digitalMaturity"
                value={formData.digitalMaturity}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <div className="form-group">
              <label>Availability of R&D and/or Design Center/Process Design Department in the company is preferable</label>
              <input
                type="text"
                name="availabilityOfRAndD"
                value={formData.availabilityOfRAndD}
                onChange={handleChange}
                placeholder="Yes/No"
                required
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleBack}>Back</button>
          </>
        )}
      </form>
    </div>
  );
};

export default AssessmentForm;