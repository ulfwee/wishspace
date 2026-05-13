import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HomeHeader from '../../components/HomeHeader/HomeHeader';
import WishlistHero from './components/WishlistHero/WishlistHero';
import FilterBar from './components/FilterBar/FilterBar';
import GiftCard from './components/GiftCard/GiftCard';

import './SingleWishlistPage.css';

const SingleWishlistPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/wishlists/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setWishlist(response.data);
      } catch (err) {
        setError('Не вдалося завантажити список бажань');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWishlistData();
  }, [id]);

  if (loading) return <div className={styles.loader}>Завантаження...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!wishlist) return <div>Список не знайдено</div>;

  const totalItems = wishlist.items?.length || 0;
  const reservedItems = wishlist.items?.filter(item => item.isReserved).length || 0;
  const progress = totalItems > 0 ? Math.round((reservedItems / totalItems) * 100) : 0;

  return (
    <div className={styles.pageWrapper}>
      <HomeHeader />
      
      <main className={styles.content}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← Назад до списків
        </button>

        <WishlistHero 
          title={wishlist.title} 
          date={wishlist.date} 
          progress={progress} 
          itemCount={totalItems} 
          reservedCount={reservedItems} 
          privacy={wishlist.privacy}
        />

        <FilterBar />

        <div className={styles.grid}>
          {wishlist.items && wishlist.items.length > 0 ? (
            wishlist.items.map(gift => (
              <GiftCard key={gift._id} gift={gift} />
            ))
          ) : (
            <p className={styles.emptyMsg}>У цьому списку поки немає подарунків.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SingleWishlistPage;