import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import NotificationCard from './components/NotifCard/NotifCard';
import StatsCard from './components/StatsCard/StatsCard';
import './NotifPage.css';

const NotificationsPage = () => {
  const stats = [
    { label: 'Unread', count: 2, color: '#a855f7' },
    { label: 'Bookings', count: 1, color: '#f472b6' },
    { label: 'Friends', count: 2, color: '#4ade80' },
    { label: 'Events', count: 2, color: '#fbbf24' },
  ];

  const newNotifications = [
    {
      id: 1,
      type: 'friend_request',
      title: 'New friend request',
      message: 'Jessica Taylor sent you a friend request',
      time: '5 minutes ago',
      icon: '👤',
      unread: true,
    },
    {
      id: 2,
      type: 'item_reserved',
      title: 'Item reserved',
      message: 'Someone reserved "Wireless Headphones" from your Birthday wishlist',
      time: '2 hours ago',
      icon: '🎁',
      unread: true,
    },
  ];

  return (
    <div className="notifications-page">
      <HomeHeader activePage="notifications" />

      <main className="notifications-container">
        <div className="notifications-header">
          <div>
            <h1>Notifications</h1>
            <p>Stay updated with your wishlists and friends</p>
          </div>
          <button className="btn-mark-read">
            ✓ Mark all read
          </button>
        </div>

        {/* Статистика */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              count={stat.count}
              color={stat.color}
            />
          ))}
        </div>

        {/* Нові сповіщення */}
        <section className="notifications-section">
          <div className="section-title">
            <span>🔔</span> New notifications
          </div>
          
          <div className="notifications-list">
            {newNotifications.map((notif) => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </div>
        </section>

        {/* Раніше */}
        <section className="notifications-section">
          <div className="section-title">
            <span>✓</span> Earlier
          </div>
          {/* Тут можна додати старіші сповіщення */}
          <p className="no-notifications">No earlier notifications yet</p>
        </section>
      </main>
    </div>
  );
};

export default NotificationsPage;