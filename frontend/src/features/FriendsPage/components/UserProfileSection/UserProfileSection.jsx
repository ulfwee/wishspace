import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfileSection.css';

const UserProfileSection = ({ 
  user, 
  wishlists, 
  onSendRequest, 
  isFriend 
}) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="user-profile-section">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{user.username}</h2>
            <p>{user.biography || "No biography yet."}</p>
          </div>
        </div>

        {isFriend ? (
          <button className="btn-friends" disabled>
            ✓ Friends
          </button>
        ) : (
          <button 
            className="btn-send-request" 
            onClick={() => onSendRequest(user.id || user.uid)}
          >
            + Add Friend
          </button>
        )}
      </div>

      <div className="wishlists-carousel">
        {wishlists.map(list => (
          <div 
            key={list.id} 
            className="mini-wishlist-card" 
            onClick={() => navigate(`/wishlists/${list.id}`)}
          >
            <h3>{list.title}</h3>
            <p>{list.description?.substring(0, 60)}...</p>
            <span className="view-link">View List →</span>
          </div>
        ))}
        {wishlists.length === 0 && (
          <p className="empty-msg">This user has no public wishlists.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileSection;