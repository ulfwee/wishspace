import React from 'react';
import './EventItem.css';

const EventItem = ({ name, type, date, daysLeft, icon }) => {
  return (
    <div className="event-item">
      <div className="event-user">
        <div className="event-avatar">{icon}</div>
        <div className="event-details">
          <div className="name">{name}</div>
          <div className="type">{type}</div>
        </div>
      </div>
      <div className="event-time">
        <div className="days-left">🕒 {daysLeft} days</div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
};

export default EventItem;