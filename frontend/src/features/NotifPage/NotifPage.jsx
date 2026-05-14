import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import NotificationCard from './components/NotifCard/NotifCard';
import StatsCard from './components/StatsCard/StatsCard';
import './NotifPage.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    unread: 0,
    bookings: 0,
    friends: 0,
    events: 0,
  });

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No token found");
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:5000/notifications/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const allNotifs = res.data;

      setNotifications(allNotifs);

      const unreadCount = allNotifs.filter(n => !n.isRead).length;
      const friendCount = allNotifs.filter(n => n.type === 'friend_request').length;
      const bookingCount = allNotifs.filter(n => n.type === 'item_booked').length;
      const eventCount = allNotifs.filter(n => n.type === 'event_reminder').length;

      setStats({
        unread: unreadCount,
        bookings: bookingCount,
        friends: friendCount,
        events: eventCount,
      });

    } catch (err) {
      console.error("Failed to fetch notifications:", err.response?.data || err.message);
      if (err.response?.status === 404) {
        console.error("Notifications route not found. Check backend routes.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const unreadNotifs = notifications.filter(n => !n.isRead);

      await Promise.all(
        unreadNotifs.map(notif =>
          axios.put(`http://localhost:5000/notifications/${notif.id}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );

      fetchNotifications(); 
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const newNotifications = notifications.filter(n => !n.isRead);
  const earlierNotifications = notifications.filter(n => n.isRead);

  const getIcon = (type) => {
    switch (type) {
      case 'friend_request': return '👤';
      case 'item_booked': return '🎁';
      case 'event_reminder': return '📅';
      default: return '🔔';
    }
  };

  const statsArray = [
    { label: 'Unread', count: stats.unread, color: '#a855f7' },
    { label: 'Bookings', count: stats.bookings, color: '#f472b6' },
    { label: 'Friends', count: stats.friends, color: '#4ade80' },
    { label: 'Events', count: stats.events, color: '#fbbf24' },
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
          <button className="btn-mark-read" onClick={markAllAsRead} disabled={stats.unread === 0}>
            ✓ Mark all read
          </button>
        </div>

        <div className="stats-grid">
          {statsArray.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              count={stat.count}
              color={stat.color}
            />
          ))}
        </div>

        <section className="notifications-section">
          <div className="section-title">
            <span>🔔</span> New notifications
          </div>
          
        <div className="notifications-list">
          {newNotifications.length > 0 ? (
            newNotifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                notification={{
                  id: notif.uid,
                  type: notif.type,
                  title: notif.type === 'friend_request' ? 'New friend request' : 
                          notif.type === 'item_booked' ? 'Item reserved' : 'Event reminder',
                  message: notif.message,
                  time: 'Just now', 
                  icon: getIcon(notif.type),
                  unread: true,
                }}
                onMarkRead={() => markAsRead(notif.id)}
                onDelete={() => deleteNotification(notif.id)}
              />
            ))
          ) : (
            <p className="no-notifications">No new notifications</p>
          )}
        </div>
      </section>

        <section className="notifications-section">
          <div className="section-title">
            <span>✓</span> Earlier
          </div>
          <div className="notifications-list">
            {earlierNotifications.length > 0 ? (
              earlierNotifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  notification={{
                    id: notif.id,
                    type: notif.type,
                    title: notif.type === 'friend_request' ? 'Friend request' : 
                           notif.type === 'item_booked' ? 'Item reserved' : 'Event reminder',
                    message: notif.message,
                    time: 'Earlier',
                    icon: getIcon(notif.type),
                    unread: false,
                  }}
                  onDelete={() => deleteNotification(notif.uid)}
                />
              ))
            ) : (
              <p className="no-notifications">No earlier notifications yet</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotificationsPage;