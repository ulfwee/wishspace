import React from 'react';
import './WishlistHero.css';

const WishlistHero = ({ title, progress, itemCount, reservedCount, onAddClick, onBack, isOwner, privacy }) => {
  const privacySettings = {
    public: { label: "Public", icon: "🌐" },
    friends: { label: "Friends Only", icon: "👥" },
    private: { label: "Private", icon: "🔒" }
  };
  const currentPrivacy = privacySettings[privacy] || privacySettings.public;
  return (
    <div className="heroSection">
      <div className="heroTop">
        <div className="titleRow">
          <button className="backArrowBtn" onClick={onBack}>←</button>
          <h1 className="title">{title}</h1>
          <span className="birthdayEmoji">🎂</span>
          {isOwner && <button className="editBtn">✎</button>}
        </div>
        {isOwner && <button className="addButton" onClick={onAddClick}>+ Add Item</button>}
      </div>

      <div className="metaRow">
        <span className="privacyBadge">
          {currentPrivacy.icon} {currentPrivacy.label}
        </span>
        <span>{itemCount} items • {reservedCount} reserved</span>
      </div>
      <div className="progressSection">
        <div className="progressLabels">
          <span className="progressTitle">Gift Planning Progress</span>
          <span className="progressPercent">{progress}%</span>
        </div>
        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default WishlistHero;