import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import WishlistHero from './components/WishlistHero/WishlistHero';
import CollectionCard from './components/CollectionCard/CollectionCard';
import './WishlistPage.css';

const WishlistsPage = () => {
  const collections = [
    {
      title: "Summer Garden Wedding",
      type: "Wedding Registry",
      date: "August 15, 2026",
      current: 24,
      total: 32,
      privacy: "public",
      icon: "💍"
    },
    {
      title: "Milestone 35th Birthday",
      type: "Birthday Celebration",
      date: "June 20, 2026",
      current: 14,
      total: 18,
      privacy: "friends",
      icon: "🎂"
    },
    {
      title: "Sustainable Home Renovation",
      type: "Home & Living",
      date: "September 1, 2026",
      current: 8,
      total: 25,
      privacy: "private",
      icon: "🏡"
    },
    {
      title: "Winter Holiday Gathering",
      type: "Family Event",
      date: "December 24, 2026",
      current: 5,
      total: 40,
      privacy: "friends",
      icon: "🎄"
    }
  ];

  const handleCreateNewCollection = () => {
    alert("Відкриваємо модалку створення нової колекції!");
  };

  return (
    <div className="wishlists-page-container">
      {/* Навігація зверху */}
      <HomeHeader activePage="wishlists" />

      <main className="wishlists-main-content">
        {/* Hero-блок зі статистикою */}
        <WishlistHero 
          totalWishes={97} 
          reservedGifts={51} 
          completionRate={53} 
          onActionClick={handleCreateNewCollection}
        />

        {/* Секція зі списком колекцій */}
        <div className="collections-section">
          <div className="section-header">
            <h2>Active Collections</h2>
            <div className="filter-tabs">
              <button className="filter-tab active">All</button>
              <button className="filter-tab">Public</button>
              <button className="filter-tab">Private</button>
            </div>
          </div>

          <div className="collections-grid">
            {collections.map((collection, index) => (
              <CollectionCard 
                key={index}
                title={collection.title}
                type={collection.type}
                date={collection.date}
                current={collection.current}
                total={collection.total}
                privacy={collection.privacy}
                icon={collection.icon}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WishlistsPage;