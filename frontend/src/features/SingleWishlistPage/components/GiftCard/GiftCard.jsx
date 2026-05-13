import React from 'react';
import './GiftCard.css';

const GiftCard = ({ gift }) => {
  return (
    <div className="card">
      <div className="imageContainer">
        <span className={`priorityBadge priority-${gift.priority || 'medium'}`}>
          {gift.priority}
        </span>
        <div className="itemEmoji">{gift.image || '🎁'}</div>
        <button className="optionsButton">⋮</button>
      </div>
      <div className="details">
        <h3 className="itemTitle">{gift.title || gift.name}</h3>
        <span className="gift-price">
        {gift.price ? Number(gift.price).toFixed(2) : '0.00'} ₴
        </span>      
        </div>
    </div>
  );
};

export default GiftCard;