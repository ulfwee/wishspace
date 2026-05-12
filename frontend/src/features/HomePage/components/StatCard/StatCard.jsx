import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="stat-card" style={{ backgroundColor: bgColor }}>
      <div className="stat-card-info">
        <div className="title">{title}</div>
        <div className="value">{value}</div>
      </div>
      <div className="stat-card-icon">{icon}</div>
    </div>
  );
};

export default StatCard;