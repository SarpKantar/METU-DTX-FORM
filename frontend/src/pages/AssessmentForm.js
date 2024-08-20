import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/AssessmentForm.css';

const AssessmentForm = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Assessment form submitted!');
    navigate('/assessor-dashboard');
  };

  return (
    <div className="container">
      <h1 className="title">Assessment Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question 1</label>
          <input
            type="text"
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
            placeholder="Enter your answer"
            required
          />
        </div>
        <div className="form-group">
          <label>Question 2</label>
          <input
            type="text"
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
            placeholder="Enter your answer"
            required
          />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default AssessmentForm;