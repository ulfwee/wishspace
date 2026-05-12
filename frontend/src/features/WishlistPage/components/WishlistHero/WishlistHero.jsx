import React from 'react';
import './WishlistHero.css';

const WishlistHero = ({ 
  totalWishes = 0, 
  reservedGifts = 0, 
  completionRate = 0, 
  onActionClick 
}) => {
  return (
    <section className="wishlist-hero">
      <div className="hero-badge">✨ My Personal Space</div>
      
      <div className="hero-main-row">
        <div className="hero-text">
          <h1>Gift Collections</h1>
          <p>
            Curated moments of joy, thoughtfully organized for life's 
            celebrations and your personal dreams.
          </p>
        </div>
        
        <button className="btn-create-collection" onClick={onActionClick}>
          <span style={{ fontSize: '1.4rem' }}>+</span> New Collection
        </button>
      </div>

      <div className="hero-stats-row">
        <div className="hero-stat-item">
          <span className="stat-number">{totalWishes}</span>
          <span className="stat-label">Total Wishes</span>
        </div>
        
        <div className="hero-stat-item">
          <span className="stat-number">{reservedGifts}</span>
          <span className="stat-label">Reserved Gifts</span>
        </div>
        
        <div className="hero-stat-item">
          <span className="stat-number">{completionRate}%</span>
          <span className="stat-label">Completion</span>
        </div>
      </div>
    </section>
  );
};

export default WishlistHero;