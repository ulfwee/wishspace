import React from 'react';
import './FriendsHero.css';

const FriendsHero = ({ connectionsCount = 4 }) => {
  return (
    <section className="friends-hero">
      <div className="hero-top-row">
        <div className="hero-badge">
          👥 {connectionsCount} Connections
        </div>
      </div>

      <div className="hero-main-content">
        <h1>Your Circle</h1>
        <p>Celebrate together, share joy, and make every moment meaningful</p>
      </div>

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search connections..." 
        />
      </div>
    </section>
  );
};

export default FriendsHero;