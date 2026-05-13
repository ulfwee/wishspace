import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import StatCard from './components/StatCard/StatCard';
import EventItem from './components/EventItem/EventItem';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
        <HomeHeader activePage="home" />

      <main className="main-content">
        <header className="header-row">
          <div className="header-title">
            <h1>My Dashboard</h1>
            <p>Track your wishlists and upcoming events</p>
          </div>
          <a href="/wishlists"><button className="btn-create">+ Create Wishlist</button></a>
        </header>

        <div className="stats-grid">
          <StatCard title="Total Wishlists" value="3" icon="🎁" bgColor="rgba(194, 216, 196, 0.4)" />
          <StatCard title="Total Items" value="44" icon="❤️" bgColor="#FDE2E4" />
          <StatCard title="Upcoming Events" value="3" icon="📅" bgColor="#E0F2F1" />
        </div>

        <section className="events-section">
          <div className="section-title-row">
            <h2>Upcoming Events</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <EventItem name="Sarah Johnson" type="Birthday" date="May 10" daysLeft="9" icon="👩‍🦰" />
          <EventItem name="Mike Chen" type="Anniversary" date="May 15" daysLeft="14" icon="🧔" />
          <EventItem name="Emma Davis" type="Graduation" date="May 20" daysLeft="19" icon="🎓" />
        </section>
      </main>
    </div>
  );
};

export default HomePage;