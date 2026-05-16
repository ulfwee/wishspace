import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import FriendsHero from './components/FriendsHero/FriendsHero';
import UserProfileSection from './components/UserProfileSection/UserProfileSection';
import FriendRequestCard from './components/FriendRequestCard/FriendRequestCard';
import FriendCard from './components/FriendCard/FriendCard';
import './FriendsPage.css';

const FriendsPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWishlists, setSelectedWishlists] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFriendRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('https://wishspace.onrender.com/friends/requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriendRequests(res.data);
    } catch (err) {
      console.error("Get requests failed:", err.response?.data || err.message);
    }
  };

  const fetchMyFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://wishspace.onrender.com/friends/my-friends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyFriends(res.data);
    } catch (err) {
      console.error("Failed to load friends:", err);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
    fetchMyFriends();
  }, []);

  const isAlreadyFriend = (userId) => {
    return myFriends.some(friend => 
      friend.id === userId || friend.uid === userId
    );
  };

  const sendFriendRequest = async (receiverId) => {
    if (!receiverId) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://wishspace.onrender.com/friends/request', 
        { receiverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Не вдалося надіслати запит");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://wishspace.onrender.com/friends/${requestId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFriendRequests(prev => prev.filter(req => req.uid !== requestId));
      fetchMyFriends(); 
    } catch (err) {
      console.error(err);
      alert("Помилка при прийнятті запиту");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://wishspace.onrender.com/friends/${requestId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFriendRequests(prev => prev.filter(req => req.uid !== requestId));
    } catch (err) {
      console.error(err);
      alert("Помилка при відхиленні запиту");
    }
  };

  const handleSearch = async (username) => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await axios.get(`https://wishspace.onrender.com/users/search/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const foundUser = res.data;

      const meRes = await axios.get(`https://wishspace.onrender.com/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const currentUser = meRes.data;

      if (foundUser.id === currentUser.id) {
        alert("Це ви! Перейдіть у свій профіль.");
        setSelectedUser(null);
        setSelectedWishlists([]);
        return;
      }

      setSelectedUser(foundUser);
      
      const wishlistRes = await axios.get(`https://wishspace.onrender.com/users/${foundUser.id}/wishlists`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedWishlists(wishlistRes.data);

    } catch (err) {
      console.error(err);
      alert("Користувача не знайдено");
      setSelectedUser(null);
    }
  };

  return (
    <div className="friends-page">
      <HomeHeader activePage="friends" />
      <main className="friends-container">
        <FriendsHero onSearch={handleSearch} />

        {selectedUser && (
          <UserProfileSection 
            user={selectedUser} 
            wishlists={selectedWishlists}
            onSendRequest={sendFriendRequest}
            isFriend={isAlreadyFriend(selectedUser.id || selectedUser.uid)}
          />
        )}

        <section className="friends-section">
          <div className="section-header">
            <h2>Pending Requests</h2>
            <span className="count-badge">{friendRequests.length}</span>
          </div>

          <div className="requests-grid">
            {friendRequests.length > 0 ? (
              friendRequests.map(request => (
                <FriendRequestCard
                  key={request.uid}
                  request={request}
                  onAccept={acceptRequest}
                  onReject={rejectRequest}
                />
              ))
            ) : (
              <p>Немає нових запитів</p>
            )}
          </div>

          <div className="section-header">
            <h2>Your Friends</h2>
          </div>
          <div className="friends-grid">
            {myFriends.length > 0 ? (
              myFriends.map(friend => (
                <FriendCard
                  key={friend.id || friend.uid}
                  name={friend.username}
                  username={friend.username}
                  bio={friend.biography || "No biography yet"}
                  mutualCount={0}
                  listsCount={0}
                  eventsCount={0}
                  onClick={() => handleSearch(friend.username)}
                />
              ))
            ) : (
              <p className="empty-friends">У вас ще немає друзів</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FriendsPage;