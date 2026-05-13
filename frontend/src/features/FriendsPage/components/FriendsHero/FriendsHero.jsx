import React, { useState } from 'react';
import './FriendsHero.css';

const FriendsHero = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch(search);
    };

    return (
        <section className="friends-hero">
            <div className="hero-content">
                <h1>Discover People</h1>
                <p>Connect with friends and explore their curated wishlists</p>
                
                <div className="search-bar-container">
                    <span className="search-icon" onClick={() => onSearch(search)}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </section>
    );
};

export default FriendsHero;