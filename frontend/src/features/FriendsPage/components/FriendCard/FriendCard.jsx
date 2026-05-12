import React from 'react';
import './FriendCard.css';

const FriendCard = ({ name, username, bio, mutualCount, listsCount, eventsCount }) => {
  return (
    <div className="friend-card">
      <div className="friend-card-header"></div>
      <div className="friend-card-body">
        <h3>{name}</h3>
        <span className="friend-username">@{username}</span>
        <p className="friend-bio">{bio}</p>
        <span className="friend-mutual">👥 {mutualCount} mutual</span>
        
        <div className="friend-stats">
          <div className="stat-box">
            <span className="emoji">🎁</span>
            <span className="val">{listsCount}</span>
            <span className="lab">Lists</span>
          </div>
          <div className="stat-box">
            <span className="emoji">📅</span>
            <span className="val">{eventsCount}</span>
            <span className="lab">Events</span>
          </div>
        </div>
        
        <button className="btn-message">💬 Message</button>
      </div>
    </div>
  );
};

export default FriendCard;