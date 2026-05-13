import React from 'react';
import './WishlistHero.css';

const WishlistHero = ({ title, progress, itemCount, reservedCount, onAddClick, onBack, isOwner }) => {
  return (
    <div className="heroSection">
      <div className="heroTop">
        <div className="titleRow">
          <button className="backArrowBtn" onClick={onBack}>←</button>
          <h1 className="title">{title}</h1>
          <span className="birthdayEmoji">🎂</span>
          {/* Редагувати може тільки власник */}
          {isOwner && <button className="editBtn">✎</button>}
        </div>
        {/* Додавати може тільки власник */}
        {isOwner && <button className="addButton" onClick={onAddClick}>+ Add Item</button>}
      </div>

      <div className="metaRow">
        <span className="privacyBadge">👥 Friends Only</span>
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