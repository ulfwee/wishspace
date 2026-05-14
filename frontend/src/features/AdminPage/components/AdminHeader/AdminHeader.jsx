import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';

const HomeHeader = ({ activePage = 'home' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
      if (window.confirm("Ви дійсно хочете вийти з акаунту?")) {
          localStorage.removeItem('token');     
          navigate('/');                   
      }
  };
  return (
    <header className="home-header">
      <div className="header-logo">
        <div className="logo-square">W</div>
        <span>WishGift</span>
      </div>

      <div className="header-actions">
        <button className="theme-btn" title="Toggle Theme" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;