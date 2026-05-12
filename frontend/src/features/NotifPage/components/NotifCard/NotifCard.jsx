import React from 'react';
import './NotifCard.css';

const NotificationCard = ({ notification }) => {
  const { title, message, time, icon, unread } = notification;

  return (
    <div className={`notification-card ${unread ? 'unread' : ''}`}>
      <div className="notification-icon">
        <span>{icon}</span>
      </div>

      <div className="notification-content">
        <div className="notification-title">{title}</div>
        <div className="notification-message">{message}</div>
        <div className="notification-time">{time}</div>
      </div>

      <button className="notification-delete">
        🗑️
      </button>
    </div>
  );
};

export default NotificationCard;