import React, { useState, useEffect, useMemo } from 'react';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };

        // Зверніть увагу: перевірте, чи правильно вказано шлях до API
        const [wishlistRes, itemsRes] = await Promise.all([
          axios.get(`http://localhost:5000/wishlist/${id}`, { headers }),
          axios.get(`http://localhost:5000/wishlists/${id}/items`, { headers })
        ]);

        setWishlist({
          wishlistInfo: wishlistRes.data.wishlist,
          items: Array.isArray(itemsRes.data) ? itemsRes.data : []
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Не вдалося завантажити дані');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWishlistData();
  }, [id, token]);

  // 1. Отримуємо дані користувача правильно
const userDataString = localStorage.getItem('user');
const userData = userDataString ? JSON.parse(userDataString) : null;
const currentUserId = userData?.id; // Тут буде "4xgJLcjM9TzMxtsrkZqP"

// 2. Оновлена логіка порівняння
const isOwner = useMemo(() => {
  if (!wishlist?.wishlistInfo || !currentUserId) return false;
  
  // ID власника з бази (судячи з ваших логів, воно в полі userId або uid)
  const ownerId = wishlist.wishlistInfo.userId || wishlist.wishlistInfo.uid;
  
  const match = String(currentUserId) === String(ownerId);

  console.log("Ownership Check:", {
    "User from Storage": currentUserId,
    "Owner from DB": ownerId,
    "Result": match
  });

  return match;
}, [wishlist, currentUserId]);

  const filteredItems = useMemo(() => {
    const items = wishlist?.items || [];
    const priorityWeight = { high: 3, medium: 2, low: 1 };

    return items
      .filter(item => {
        const title = (item.title || item.name || '').toLowerCase();
        const matchesSearch = title.includes(searchTerm.toLowerCase());
        const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
        const isBooked = item.isBooked === true || String(item.isBooked) === 'true';
        const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'reserved' ? isBooked : !isBooked;
        return matchesSearch && matchesPriority && matchesStatus;
      })
      .sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));
  }, [wishlist?.items, searchTerm, priorityFilter, statusFilter]);

  const handleItemAdded = (newItem) => {
    setWishlist(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleItemUpdate = (itemId) => {
    setWishlist(prev => ({
        ...prev,
        items: prev.items.map(item => {
            const currentId = item.uid || item._id || item.id;
            if (currentId === itemId) {
                return { ...item, isBooked: true };
            }
            return item;
        })
    }));
};

  if (loading) return <div className="loader">Завантаження...</div>;
  if (error) return <div className="error">{error}</div>;

  const ownerId = wishlist?.wishlistInfo?.userId || wishlist?.wishlistInfo?.uid || wishlist?.wishlistInfo?.ownerId;
const myId = localStorage.getItem('userId');

  return (
    <div className="pageWrapper">
      <HomeHeader />
      <main className="content">
        <WishlistHero 
          title={wishlist?.wishlistInfo?.title} 
          progress={wishlist?.items?.length > 0 ? Math.round((wishlist.items.filter(i => i.isBooked).length / wishlist.items.length) * 100) : 0} 
          itemCount={wishlist?.items?.length} 
          reservedCount={wishlist?.items?.filter(i => i.isBooked).length} 
          onAddClick={() => setIsModalOpen(true)}
          onBack={() => navigate('/wishlists')}
          isOwner={isOwner}
        />

        {isOwner && (
          <AddItemModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onItemAdded={handleItemAdded}
            wishlistId={id}
            token={token}
          />
        )}

        <FilterBar
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        />

        <div className="grid">
        {filteredItems.map(gift => (
          <GiftCard 
              key={gift.uid || gift._id || gift.id} 
              gift={gift} 
              isOwner={isOwner} 
              onUpdate={handleItemUpdate} // Передаємо функцію
          />
        ))}
      </div>
      </main>
    </div>
  );
};

export default SingleWishlistPage;