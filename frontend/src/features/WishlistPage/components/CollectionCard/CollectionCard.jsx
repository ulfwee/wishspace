import React from 'react';
import './CollectionCard.css';

const CollectionCard = ({ 
  _id, id, title, type, eventCategory, date, current = 0, 
  total = 0, privacy, imgURL, icon = "🎁", 
  onClick 
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="collection-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-top">
        <div className="privacy-badge">
          {privacy === 'public' && "🌐 public"}
          {privacy === 'friends' && "👥 friends"}
          {privacy === 'private' && "🔒 private"}
        </div>
      </div>
      
      {imgURL ? (
        <img src={imgURL} alt={title} className="card-image" />
      ) : (
        <div className="card-icon">{icon}</div>
      )}

      <div className="card-info">
        <h3>{title}</h3>
        <p>{eventCategory || type}</p>
      </div>

      {date && <div className="card-date">📅 {date}</div>}

      <div className="progress-section">
        <div className="progress-labels">
          <span>Progress</span>
          <span>{current}/{total}</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>

      <div className="card-footer">
        <span className="view-link">View Collection →</span>
      </div>
    </div>
  );
};

export default CollectionCard;