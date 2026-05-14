import React from 'react';
import './FriendCard.css';

const FriendCard = ({ 
    name, 
    username, 
    bio, 
    mutualCount = 0, 
    listsCount = 0, 
    eventsCount = 0,
    onClick 
}) => {
    return (
        <div className="friend-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="friend-card-header">
                <div className="friend-avatar-large">
                    {username ? username.charAt(0).toUpperCase() : 'U'}
                </div>
            </div>
            
            <div className="friend-card-body">
                <h3>{name}</h3>
                <span className="friend-username">@{username}</span>
                <p className="friend-bio">{bio}</p>                
      
            </div>
        </div>
    );
};

export default FriendCard;