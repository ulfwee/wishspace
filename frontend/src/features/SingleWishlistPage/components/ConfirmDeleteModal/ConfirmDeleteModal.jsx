import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <div className="confirm-icon">⚠️</div>
        <h2>Видалити вішліст?</h2>
        <p>
          Ви впевнені, що хочете видалити <strong>"{title}"</strong>? 
          Цю дію неможливо буде скасувати, а всі подарунки будуть видалені.
        </p>
        <div className="confirm-actions">
          <button className="cancel-btn" onClick={onClose}>Скасувати</button>
          <button className="delete-confirm-btn" onClick={onConfirm}>Так, видалити</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;