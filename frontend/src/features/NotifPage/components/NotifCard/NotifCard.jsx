import React from 'react';
import './NotifCard.css';

const NotificationCard = ({ notification, onMarkRead, onDelete }) => {
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

      <div className="notification-actions">
        {unread && (
          <button className="mark-read-btn" onClick={onMarkRead}>
            ✓
          </button>
        )}
        <button className="notification-delete" onClick={onDelete}>
          🗑️
        </button>
      </div>
  </div>
);};

export default NotificationCard;