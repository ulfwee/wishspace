import React from 'react';
import './WishlistHero.css';

const WishlistHero = ({ title, progress, itemCount, reservedCount, onAddClick, onBack }) => {
  return (
    <div className="heroSection">
      <div className="heroTop">
        <div className="titleRow">
          {/* Стрілка Назад */}
          <button className="backArrowBtn" onClick={onBack}>←</button>
          
          <h1 className="title">{title}</h1>
          <span className="birthdayEmoji">🎂</span>
          <button className="editBtn">✎</button>
        </div>
        <button className="addButton" onClick={onAddClick}>+ Add Item</button>
      </div>

      <div className="metaRow">
        <span className="privacyBadge">👥 Friends Only</span>
        <span className="statsText">
          <strong>{itemCount}</strong> items • <strong>{reservedCount}</strong> reserved
        </span>
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