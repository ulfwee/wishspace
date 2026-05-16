import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HomeHeader from '../../components/HomeHeader/HomeHeader';
import WishlistHero from './components/WishlistHero/WishlistHero';
import FilterBar from './components/FilterBar/FilterBar';
import GiftCard from './components/GiftCard/GiftCard';
import AddItemModal from './components/AddItemModal/AddItemModal';
import EditWishlistModal from './components/EditWishlistModal/EditWishlistModal'; 
import ConfirmDeleteModal from './components/ConfirmDeleteModal/ConfirmDeleteModal';
import './SingleWishlistPage.css';

const SingleWishlistPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const token = localStorage.getItem('token');

    const fetchWishlistData = async () => {
        if (!token) {
            setError("Please login to view this content");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const headers = { Authorization: `Bearer ${token}` };

            const [wishlistRes, itemsRes] = await Promise.all([
                axios.get(`https://wishspace.onrender.com/wishlist/${id}`, { headers }),
                axios.get(`https://wishspace.onrender.com/wishlists/${id}/items`, { headers })
            ]);

            const wishlistData = wishlistRes.data.wishlist || wishlistRes.data;
            const userData = JSON.parse(localStorage.getItem('user'));
            
            const currentUserId = userData?.id || userData?.uid;
            const ownerId = wishlistData.userId || wishlistData.uid;

            const isOwner = String(currentUserId) === String(ownerId);
            const isFriend = userData?.friends?.includes(ownerId);

            if (wishlistData.privacy === 'private' && !isOwner) {
                setAccessDenied(true);
            } else if (wishlistData.privacy === 'friends' && !isOwner && !isFriend) {
                setAccessDenied(true);
            } else {
                setWishlist({
                    wishlistInfo: wishlistData,
                    items: Array.isArray(itemsRes.data) ? itemsRes.data : []
                });
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError('Failed to load wishlist data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchWishlistData();
    }, [id, token]);

    const isOwner = useMemo(() => {
        if (!wishlist?.wishlistInfo) return false;
        const userData = JSON.parse(localStorage.getItem('user'));
        const currentUserId = userData?.id || userData?.uid;
        const ownerId = wishlist.wishlistInfo.userId || wishlist.wishlistInfo.uid;
        return String(currentUserId) === String(ownerId);
    }, [wishlist]);


    const handleEditWishlist = async (updatedData) => {
        try {
            await axios.put(`https://wishspace.onrender.com/wishlist/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchWishlistData(); 
            setIsEditModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Помилка при редагуванні");
        }
    };

    const handleDeleteWishlist = async () => {
        try {
            await axios.delete(`https://wishspace.onrender.com/wishlist/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsDeleteModalOpen(false);
            navigate('/wishlists');
        } catch (err) {
            console.error(err);
            alert("Помилка при видаленні");
        }
    };

    const filteredItems = useMemo(() => {
        const items = wishlist?.items || [];
        const priorityWeight = { high: 3, medium: 2, low: 1 };

        return items
            .filter(item => {
                const title = (item.title || item.name || '').toLowerCase();
                const matchesSearch = title.includes(searchTerm.toLowerCase());
                const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
                
                const isBooked = item.isBooked === true || String(item.isBooked) === 'true';
                const matchesStatus = statusFilter === 'all' 
                    ? true 
                    : statusFilter === 'reserved' ? isBooked : !isBooked;

                return matchesSearch && matchesPriority && matchesStatus;
            })
            .sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0));
    }, [wishlist?.items, searchTerm, priorityFilter, statusFilter]);

    const handleItemAdded = (newItem) => {
        setWishlist(prev => ({ 
            ...prev, 
            items: [...(prev.items || []), newItem] 
        }));
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
    if (accessDenied) {
    return (
        <div className="pageWrapper">
            <HomeHeader />
            <main className="content private-state-container">
                <div className="private-card">
                    <div className="private-icon">🔒</div>
                    <h2>This Wishlist is Private</h2>
                    <p>
                        The owner has restricted this collection. 
                        Only confirmed friends or the owner can view these items.
                    </p>
                    <button 
                        className="back-home-btn" 
                        onClick={() => navigate('/wishlists')}
                    >
                        ← Back to My Wishlists
                    </button>
                </div>
            </main>
        </div>
    );
}
    if (error) return <div className="error">{error}</div>;

    const itemsCount = wishlist?.items?.length || 0;
    const reservedCount = wishlist?.items?.filter(i => i.isBooked).length || 0;
    const progressPercent = itemsCount > 0 ? Math.round((reservedCount / itemsCount) * 100) : 0;

    console.log("Модалка відкрита?", isDeleteModalOpen);
    return (
        <div className="pageWrapper">
            <HomeHeader />
            <main className="content">
                <WishlistHero 
                    title={wishlist?.wishlistInfo?.title} 
                    progress={progressPercent} 
                    itemCount={itemsCount} 
                    reservedCount={reservedCount} 
                    onAddClick={() => setIsModalOpen(true)}
                    onBack={() => navigate('/wishlists')}
                    isOwner={isOwner}
                    privacy={wishlist?.wishlistInfo?.privacy}
                    onEditClick={() => setIsEditModalOpen(true)}     
                    onDeleteClick={() => setIsDeleteModalOpen(true)}            
                />

                <ConfirmDeleteModal 
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteWishlist}
                    title={wishlist?.wishlistInfo?.title}
                />

                {isOwner && (
                    <>
                        <AddItemModal 
                            isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                            onItemAdded={handleItemAdded}
                            wishlistId={id}
                            token={token}
                        />

                        <EditWishlistModal 
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            wishlist={wishlist?.wishlistInfo}
                            onSave={handleEditWishlist}
                        />
                    </>
                )}

                <FilterBar
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    priorityFilter={priorityFilter} 
                    setPriorityFilter={setPriorityFilter}
                    statusFilter={statusFilter} 
                    setStatusFilter={setStatusFilter}
                />

                <div className="grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map(gift => (
                            <GiftCard 
                                key={gift.uid || gift._id || gift.id} 
                                gift={gift} 
                                isOwner={isOwner} 
                                onUpdate={handleItemUpdate}
                            />
                        ))
                    ) : (
                        <p className="no-items">No items found matching your filters.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SingleWishlistPage;