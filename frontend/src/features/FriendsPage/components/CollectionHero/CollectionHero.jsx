import React from 'react';
import './CollectionHero.css';

const CollectionHero = ({ totalWishes, reservedGifts, completion }) => {
  return (
    <section className="collection-hero">
      <div className="hero-top">
        <div className="hero-badge">✨ 4 Active Collections</div>
        <button className="btn-new-collection">+ New Collection</button>
      </div>
      
      <div className="hero-title-section">
        <h1>Gift Collections</h1>
        <p>Curated moments of joy, thoughtfully organized for life's celebrations</p>
      </div>

      <div className="hero-stats-grid">
        <div className="hero-stat-card">
          <span className="stat-number">{totalWishes}</span>
          <span className="stat-label">Total Wishes</span>
        </div>
        
        <div className="hero-stat-card">
          <span className="stat-number">{reservedGifts}</span>
          <span className="stat-label">Reserved Gifts</span>
        </div>
        
        <div className="hero-stat-card">
          <span className="stat-number">{completion}%</span>
          <span className="stat-label">Completion</span>
        </div>
      </div>
    </section>
  );
};

export default CollectionHero;