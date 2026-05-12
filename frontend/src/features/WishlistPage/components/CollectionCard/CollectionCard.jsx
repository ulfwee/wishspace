import React from 'react';
import './CollectionCard.css';

const CollectionCard = ({ title, type, date, current, total, privacy, icon = "🎁" }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="collection-card">
      <div className="card-top">
        <div className="privacy-badge">
          {privacy === 'public' && "🌐 public"}
          {privacy === 'friends' && "👥 friends"}
          {privacy === 'private' && "🔒 private"}
        </div>
      </div>
      
      <div className="card-icon">{icon}</div>

      <div className="card-info">
        <h3>{title}</h3>
        <p>{type}</p>
      </div>

      <div className="card-date">
        📅 {date}
      </div>

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
        <a href="#" className="view-link">
          View Collection <span>→</span>
        </a>
      </div>
    </div>
  );
};

export default CollectionCard;