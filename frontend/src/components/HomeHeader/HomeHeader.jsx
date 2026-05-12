import React from 'react';
import './HomeHeader.css';

const HomeHeader = ({ activePage = 'home' }) => {
  return (
    <header className="home-header">
      <div className="header-logo">
        <div className="logo-square">W</div>
        <span>WishGift</span>
      </div>

      <nav className="header-nav">
        <a href="/home" className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
          Home
        </a>
        <a href="/wishlists" className={`nav-item ${activePage === 'wishlists' ? 'active' : ''}`}>
          Wishlists
        </a>
        <a href="/friends" className={`nav-item ${activePage === 'friends' ? 'active' : ''}`}>
          Friends
        </a>
        <a href="/notifications" className={`nav-item ${activePage === 'notifications' ? 'active' : ''}`}>
          Notifications
        </a>
      </nav>

      <div className="header-actions">
        <button className="theme-btn" title="Toggle Theme">
          🌙
        </button>
        <a href="/me">
            <div className="user-profile-circle"> </div>
        </a>
      </div>
    </header>
  );
};

export default HomeHeader;