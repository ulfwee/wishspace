import React, { useState, useEffect } from 'react';
import './EditWishlistModal.css';

const EditWishlistModal = ({ isOpen, onClose, wishlist, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        privacy: 'public',
        eventCategory: 'Other',
        eventDate: ''
    });

    useEffect(() => {
        if (wishlist && isOpen) {
            setFormData({
                title: wishlist.title || '',
                description: wishlist.description || '',
                privacy: wishlist.privacy || 'public',
                eventCategory: wishlist.eventCategory || 'Other',
                eventDate: wishlist.eventDate ? wishlist.eventDate.split('T')[0] : ''
            });
        }
    }, [wishlist, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редагувати вішліст</h2>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Назва вішлісту *"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Опис вішлісту"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <select name="privacy" value={formData.privacy} onChange={handleChange}>
                        <option value="public">Публічний</option>
                        <option value="friends">Тільки друзі</option>
                        <option value="private">Приватний</option>
                    </select>

                    <select name="eventCategory" value={formData.eventCategory} onChange={handleChange}>
                        <option value="Birthday">День народження</option>
                        <option value="Wedding">Весілля</option>
                        <option value="New Year">Новий рік</option>
                        <option value="Other">Інше</option>
                    </select>

                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Скасувати</button>
                        <button type="submit">Зберегти зміни</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditWishlistModal;