import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import WishlistHero from './components/WishlistHero/WishlistHero';
import CollectionCard from './components/CollectionCard/CollectionCard';
import NewWishlistModal from './components/NewWishlistModal/NewWishlistModal';
import './WishlistPage.css';

const WishlistsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchWishlists = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('https://wishspace.onrender.com/wishlist', {
  headers: { Authorization: `Bearer ${token}` }
});

console.log("ДАНІ З СЕРВЕРА:", response.data);
        
        const data = response.data.wishlistsInfo || response.data || [];
        setCollections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Помилка завантаження:", error);
        setCollections([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [token]);

  const handleCreateSuccess = (response) => {
  const newWishlist = response.wishlistinfo || response;
  
  setCollections((prev) => [newWishlist, ...prev]);
};

  return (
    <div className="wishlists-page-container">
      <HomeHeader activePage="wishlists" />

      <main className="wishlists-main-content">
        <WishlistHero 
          totalWishes={collections.length}
          reservedGifts={0} 
          completionRate={0} 
          onActionClick={() => setIsModalOpen(true)}
        />

        <div className="collections-section">
          <div className="section-header">
            <h2>Active Collections</h2>
          </div>

          <div className="collections-grid">
            {loading ? (
              <p>Завантаження...</p>
            ) : collections.length > 0 ? (
              collections.map((collection) => (
                <CollectionCard 
                  key={collection.id || collection._id}
                  title={collection.title}
                  eventCategory={collection.eventCategory}
                  privacy={collection.privacy}
                  imgURL={collection.imgURL}
                  onClick={() => navigate(`/wishlists/${collection.id || collection._id}`)}
                />
              ))
            ) : (
              <p>У вас ще немає створених колекцій.</p>
            )}
          </div>
        </div>
      </main>

      <NewWishlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSuccess={handleCreateSuccess}
        token={token}
      />
    </div>
  );
};

export default WishlistsPage;