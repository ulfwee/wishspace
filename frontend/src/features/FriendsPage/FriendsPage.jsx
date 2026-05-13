import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import FriendsHero from './components/FriendsHero/FriendsHero';
import UserProfileSection from './components/UserProfileSection/UserProfileSection';
import FriendRequestCard from './components/FriendRequestCard/FriendRequestCard';
import './FriendsPage.css';

const FriendsPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedWishlists, setSelectedWishlists] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [myFriends, setMyFriends] = useState([]);

    const handleSearch = async (username) => {
      try {
          const token = localStorage.getItem('token');
          
          // 1. Спочатку шукаємо користувача
          const res = await axios.get(`http://localhost:5000/users/search/${username}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          const foundUser = res.data;

          // 2. Отримуємо дані "про мене" (якщо вони вже завантажені у стейт `currentUser`, використовуй його)
          // Якщо стейту немає, можна зробити запит або перевірити по username з localStorage
          const meRes = await axios.get(`http://localhost:5000/users/me`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          const currentUser = meRes.data;

          // 3. Перевірка: чи не є знайдений юзер мною?
          if (foundUser.id === currentUser.id) {
              alert("Це ви! Перейдіть у свій профіль, щоб переглянути власні вішлісти.");
              setSelectedUser(null);
              setSelectedWishlists([]);
              return; // Перериваємо функцію
          }

          // 4. Якщо це інша людина — показуємо профіль та вішлісти
          setSelectedUser(foundUser);
          
          const wishlistRes = await axios.get(`http://localhost:5000/users/${foundUser.id}/wishlists`, {
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

                {/* Блок знайденого користувача або вибраного друга */}
                {selectedUser && (
                    <UserProfileSection 
                        user={selectedUser} 
                        wishlists={selectedWishlists}
                        onSendRequest={(id) => console.log("Request to", id)}
                    />
                )}

                <section className="friends-section">
                    <div className="section-header">
                        <h2>Pending Requests</h2>
                        <span className="count-badge">{friendRequests.length}</span>
                    </div>
                    <div className="requests-grid">
                        {/* Map friendRequests here */}
                    </div>

                    <div className="section-header">
                        <h2>Your Friends</h2>
                    </div>
                    <div className="friends-carousel">
                        {/* Ряд карток друзів, при кліку на які викликається setSelectedUser */}
                        {myFriends.map(friend => (
                            <div className="friend-circle-card" key={friend.id} onClick={() => handleSearch(friend.username)}>
                                <div className="friend-avatar-small">{friend.username[0]}</div>
                                <span>{friend.username}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FriendsPage;