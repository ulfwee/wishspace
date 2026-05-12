import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import FriendsHero from './components/FriendsHero/FriendsHero';
import FriendRequestCard from './components/FriendRequestCard/FriendRequestCard';
import FriendCard from './components/FriendCard/FriendCard';
import './FriendsPage.css';

const FriendsPage = () => {
  // Дані для Нових запитів (New Requests)
  const requests = [
    { 
      name: "Isabella Rodriguez", 
      username: "bella_rod", 
      bio: "Interior designer | Sustainable materials", 
      mutualCount: 15 
    },
    { 
      name: "James Wilson", 
      username: "jameswilson", 
      bio: "Environmental scientist | Hiker", 
      mutualCount: 22 
    }
  ];

  // Дані для всіх друзів
  const friends = [
    { 
      name: "Elena Martinez", 
      username: "elena_creates", 
      bio: "Sustainable living advocate | Garden enthusiast", 
      mutualCount: 18, 
      listsCount: 6, 
      eventsCount: 2 
    },
    { 
      name: "Marcus Chen", 
      username: "marcusc", 
      bio: "Coffee roaster | Minimalist lifestyle", 
      mutualCount: 24, 
      listsCount: 4, 
      eventsCount: 1 
    },
    { 
      name: "Sophia Anderson", 
      username: "sophia_and", 
      bio: "Yoga instructor | Plant-based chef", 
      mutualCount: 31, 
      listsCount: 8, 
      eventsCount: 3 
    },
    { 
      name: "Oliver Thompson", 
      username: "oliver_t", 
      bio: "Photographer | Nature lover", 
      mutualCount: 12, 
      listsCount: 3, 
      eventsCount: 1 
    }
  ];

  return (
    <div className="friends-page">
      <HomeHeader activePage="friends" />

      <main className="friends-container">
        <FriendsHero connectionsCount={4} />

        <section className="section-requests">
          <div className="section-header">
            <h2>New Requests</h2>
            <span className="count-badge">{requests.length}</span>
          </div>
          
          <div className="requests-grid">
            {requests.map((req, index) => (
              <FriendRequestCard 
                key={index} 
                {...req} 
              />
            ))}
          </div>
        </section>

        <section className="section-all-friends">
          <div className="section-header">
            <h2>All Friends</h2>
          </div>
          
          <div className="friends-grid">
            {friends.map((friend, index) => (
              <FriendCard 
                key={index} 
                {...friend} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FriendsPage;