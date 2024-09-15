import React, { useState } from 'react';
import '../styling/FeedBackModal.css';

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Eksikleri Tamamla ve Tekrar Gönder</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Geri bildiriminizi buraya yazın..."
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Gönder</button>
          <button onClick={onClose}>İptal</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;