import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewWishlistModal.css';

const INITIAL_STATE = {
    title: '',
    description: '',
    privacy: 'public',
    eventCategory: 'Birthday',
    eventDate: '',
    imgURL: ''
};

const NewWishlistModal = ({ isOpen, onClose, onCreateSuccess, token }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const resetForm = () => {
        setFormData(INITIAL_STATE);
        setError('');
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('https://wishspace.onrender.com/wishlist', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 201) {
                onCreateSuccess(res.data);
                onClose();
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Помилка при створенні');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Нова колекція</h2>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Назва колекції *"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="eventDate"
                        placeholder="Дата події *"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Опис (необов'язково)"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <select name="eventCategory" value={formData.eventCategory} onChange={handleChange}>
                        <option value="Birthday">День народження</option>
                        <option value="Wedding">Весілля</option>
                        <option value="Anniversary">Ювілей</option>
                        <option value="Christmas">Різдво</option>
                        <option value="New Year">Новий рік</option>
                        <option value="Other">Інше</option>
                    </select>

                    <select name="privacy" value={formData.privacy} onChange={handleChange}>
                        <option value="public">Публічна</option>
                        <option value="friends">Для друзів</option>
                        <option value="private">Приватна</option>
                    </select>

                    <input
                        type="text"
                        name="imgURL"
                        placeholder="Посилання на зображення (необов'язково)"
                        value={formData.imgURL}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} disabled={loading}>
                            Скасувати
                        </button>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Створення...' : 'Створити'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewWishlistModal;