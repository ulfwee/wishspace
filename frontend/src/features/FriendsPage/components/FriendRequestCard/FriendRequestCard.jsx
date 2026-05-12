import React from 'react';
import './FriendRequestCard.css';

const FriendRequestCard = ({ name, username, bio, mutualCount }) => {
  return (
    <div className="request-card">
      <div className="request-info">
        <div className="request-avatar">{name.charAt(0)}</div>
        <div className="request-details">
          <h4>{name}</h4>
          <span className="username">@{username}</span>
          <p className="bio">{bio}</p>
          <span className="mutual">👥 {mutualCount} mutual friends</span>
        </div>
      </div>
      <div className="request-actions">
        <button className="btn-accept">✓ Accept</button>
        <button className="btn-decline">✕ Decline</button>
      </div>
    </div>
  );
};

export default FriendRequestCard;