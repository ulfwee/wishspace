import React from 'react';
import axios from 'axios';
import './GiftCard.css';

const GiftCard = ({ gift, isOwner, onUpdate }) => {
    const itemId = gift.uid || gift._id || gift.id;
    
    const isBooked = gift.isBooked === true || String(gift.isBooked) === 'true';

    const handleBook = async () => {
        if (isOwner || isBooked) return;

        const ownerId = gift.userId || gift.ownerId;

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/items/${itemId}/book`, 
                { 
                    ownerId: ownerId, 
                    isAnonymous: false 
                }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (onUpdate) {
                onUpdate(itemId);
            }
        } catch (error) {
            console.error("Backend error:", error.response?.data);
            alert(error.response?.data?.error || 'Помилка бронювання');
        }
    };
    const imageSource = gift.imgURL;
    return (
        <div className="card">
            <div className="imageContainer">
                <span className={`priorityBadge priority-${gift.priority}`}>{gift.priority}</span>
                {imageSource && imageSource.startsWith('http') ? (
                    <img 
                        src={imageSource} 
                        alt={gift.title} 
                        className="itemImage" 
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=🎁'; }}
                    />
                ) : (
                    <div className="itemEmoji">{imageSource || '🎁'}</div>
                )}
                
            </div>
            <div className="details">
                <h3 className="itemTitle">{gift.title}</h3>
                <span className="gift-price">{gift.price} ₴</span>
                {isBooked ? (
                    <div className="bookedBadge">Зарезервовано</div>
                ) : (
                    !isOwner ? (
                        <button className="bookButton" onClick={handleBook}>Забронювати</button>
                    ) : (
                        <div className="availableBadge">Ваш подарунок</div>
                    )
                )}
            </div>
        </div>
    );
};

export default GiftCard;