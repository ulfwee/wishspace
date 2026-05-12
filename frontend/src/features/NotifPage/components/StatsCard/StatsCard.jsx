import React from 'react';
import './StatsCard.css';

const StatsCard = ({ label, count, color }) => {
  return (
    <div className="stats-card" style={{ '--accent-color': color }}>
      <div className="stats-content">
        <span className="stats-count">{count}</span>
        <span className="stats-label">{label}</span>
      </div>
    </div>
  );
};

export default StatsCard;