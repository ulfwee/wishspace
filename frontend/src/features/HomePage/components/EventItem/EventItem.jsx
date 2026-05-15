import React from 'react';
import './EventItem.css';

const EventItem = ({ name, type, date, daysLeft, icon }) => {
  const isNumeric = typeof daysLeft === 'number';
  const daysText = isNumeric ? (daysLeft === 1 ? 'day' : 'days') : '';

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
        <div className="days-left">
          🕒 {daysLeft} {daysText}
        </div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
};

export default EventItem;