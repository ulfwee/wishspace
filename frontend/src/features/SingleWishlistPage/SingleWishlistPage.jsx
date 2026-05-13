import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HomeHeader from '../../components/HomeHeader/HomeHeader';
import WishlistHero from './components/WishlistHero/WishlistHero';
import FilterBar from './components/FilterBar/FilterBar';
import GiftCard from './components/GiftCard/GiftCard';
import AddItemModal from './components/AddItemModal/AddItemModal';

import './SingleWishlistPage.css';

const SingleWishlistPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модалки
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    useEffect(() => {
  const fetchWishlistData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [wishlistRes, itemsRes] = await Promise.all([
    axios.get(`http://localhost:5000/wishlist/${id}`, { headers }),
    axios.get(`http://localhost:5000/wishlists/${id}/items`, { headers })
]);

      // ТУТ МАГІЯ:
      // Якщо itemsRes.data — це об'єкт, а не масив, перетворюємо його на масив
      const itemsData = Array.isArray(itemsRes.data) 
        ? itemsRes.data 
        : (itemsRes.data ? [itemsRes.data] : []); 

      setWishlist({
    wishlistInfo: wishlistRes.data.wishlist,
    items: itemsData
});
      
    } catch (err) {
      setError('Не вдалося завантажити дані');
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchWishlistData();
}, [id]);

const handleItemAdded = (newItem) => {
    setWishlist(prev => ({
        ...prev,
        items: [...(prev.items || []), newItem]
    }));
};

  if (loading) return <div className="loader">Завантаження...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!wishlist) return <div>Список не знайдено</div>;

  const wishlistData = wishlist?.wishlistInfo || {};
const items = wishlist?.items || [];
const reservedItems = items.filter(item => 
  item.isBooked === true || item.isBooked === "true"
).length;
  // Розрахунки робимо ТІЛЬКИ якщо завантаження завершено
  const totalItems = items.length;
  const progress = totalItems > 0 ? Math.round((reservedItems / totalItems) * 100) : 0;

  return (
    <div className="pageWrapper">
      <HomeHeader />
      
      <main className="content">

        <WishlistHero 
          title={wishlistData.title} 
        date={wishlistData.date} 
        privacy={wishlistData.privacy}
        progress={progress} 
        itemCount={totalItems} 
        reservedCount={reservedItems} 
        onAddClick={() => setIsModalOpen(true)}
        onBack={() => navigate('/wishlists')}
        />

        <AddItemModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    onItemAdded={handleItemAdded}
                    wishlistId={id}
                    token={localStorage.getItem('token')}
                />

        <FilterBar />

        <div className="grid">
          {items.length > 0 ? (
            items.map(gift => (
              <GiftCard key={gift.id || gift._id} gift={gift} />
            ))
          ) : (
            <p className="emptyMsg">У цьому списку поки немає подарунків.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SingleWishlistPage;