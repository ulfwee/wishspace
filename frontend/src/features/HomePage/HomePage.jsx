import React, {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import HomeHeader from
'../../components/HomeHeader/HomeHeader';

import StatCard from
'./components/StatCard/StatCard';

import EventItem from
'./components/EventItem/EventItem';

import './HomePage.css';

const HomePage = () => {

  const [events, setEvents] = useState([]);

  const [stats, setStats] = useState({

    totalWishlists: 0,
    totalItems: 0,
    upcomingEvents: 0

  });

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const token =
        localStorage.getItem('token');

      if (!token) return;

      const wishlistRes =
        await axios.get(
          'https://wishspace.onrender.com/wishlist',
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const wishlists =
        wishlistRes.data.wishlistsInfo || [];

      let totalItems = 0;

      for (const wishlist of wishlists) {

        try {

          const itemsRes =
            await axios.get(
              `https://wishspace.onrender.com/wishlists/${wishlist.id}/items`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          totalItems +=
            itemsRes.data.length;

        } catch (error) {

          console.log(
            'Failed loading items:',
            error
          );

        }
      }

      const notifRes =
        await axios.get(
          'https://wishspace.onrender.com/notifications',
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const notifications =
        notifRes.data || [];

      const eventNotifications =
        notifications.filter(
          notif =>
            notif.type ===
            'event_reminder'
        );

      setEvents(eventNotifications);

      setStats({

        totalWishlists:
          wishlists.length,

        totalItems,

        upcomingEvents:
          eventNotifications.length

      });

    } catch (error) {

      console.error(
        'Dashboard error:',
        error.response?.data ||
        error.message
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
              Track your wishlists
              and upcoming events
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
            value={stats.totalWishlists}
            icon="🎁"
            bgColor="rgba(194, 216, 196, 0.4)"
          />

          <StatCard
            title="Total Items"
            value={stats.totalItems}
            icon="❤️"
            bgColor="#FDE2E4"
          />

          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
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
            key={event.id || event.uid}
            name={`${event.friendName || 'Friend'}'s ${event.eventCategory || 'Event'}`}
            type="Friend Event"
            date={
                event.eventDate
                    ? new Date(event.eventDate).toLocaleDateString('uk-UA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Soon'
            }
            daysLeft={event.daysLeft !== null && event.daysLeft !== undefined ? event.daysLeft : 'Soon'}
            icon="🎉"
        />
    ))
) : (
    <p className="no-events">No upcoming events</p>
)}

        </section>

      </main>

    </div>
  );
};

export default HomePage;