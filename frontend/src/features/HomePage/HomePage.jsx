import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HomeHeader from '../../components/HomeHeader/HomeHeader';
import StatCard from './components/StatCard/StatCard';
import EventItem from './components/EventItem/EventItem';

import './HomePage.css';

const HomePage = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const res = await axios.get(
        'http://localhost:5000/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const eventNotifications = res.data.filter(
        notif => notif.type === 'event_reminder'
      );

      setEvents(eventNotifications);

    } catch (error) {

      console.error(
        'Failed to fetch events:',
        error.response?.data || error.message
      );

    }
  };

  return (
    <div className="home-container">

      <HomeHeader activePage="home" />

      <main className="main-content">

        <header className="header-row">

          <div className="header-title">
            <h1>My Dashboard</h1>
            <p>
              Track your wishlists and upcoming events
            </p>
          </div>

          <a href="/wishlists">
            <button className="btn-create">
              + Create Wishlist
            </button>
          </a>

        </header>

        <div className="stats-grid">

          <StatCard
            title="Total Wishlists"
            value="3"
            icon="🎁"
            bgColor="rgba(194, 216, 196, 0.4)"
          />

          <StatCard
            title="Total Items"
            value="44"
            icon="❤️"
            bgColor="#FDE2E4"
          />

          <StatCard
            title="Upcoming Events"
            value={events.length}
            icon="📅"
            bgColor="#E0F2F1"
          />

        </div>

        <section className="events-section">

          <div className="section-title-row">

            <h2>Upcoming Events</h2>

            <button className="view-all-btn">
              View All
            </button>

          </div>

          {events.length > 0 ? (

            events.map(event => (

              <EventItem
                key={event.id}
                name={event.message}
                type="Friend Event"
                date={
                  event.createdAt
                    ? new Date(
                        event.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : 'Soon'
                }
                daysLeft="Soon"
                icon="🎉"
              />

            ))

          ) : (

            <p className="no-events">
              No upcoming events
            </p>

          )}

        </section>

      </main>

    </div>
  );
};

export default HomePage;