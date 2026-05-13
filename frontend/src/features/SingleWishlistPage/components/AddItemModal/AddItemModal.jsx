import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddItemModal.css'; // Використовуємо ті ж стилі для гармонії

const INITIAL_STATE = {
    title: '',
    price: '',
    description: '',
    link: '',
    imgURL: '',
    priority: 'medium',
};

const AddItemModal = ({ isOpen, onClose, onItemAdded, wishlistId, token }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setFormData(INITIAL_STATE);
            setError('');
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Додаємо wishlistId до даних перед відправкою
            const itemData = { ...formData };
            
            const res = await axios.post(`http://localhost:5000/wishlists/${wishlistId}/items`, itemData, {
            headers: { Authorization: `Bearer ${token}` }
        });

            if (res.status === 201 || res.status === 200) {
            // Перевірте, що бекенд повертає об'єкт створеного елемента
            onItemAdded(res.data);
            onClose();
        }
        } catch (err) {
            console.error("Error creating item:", err);
        setError(err.response?.data?.error || 'Не вдалося додати подарунок');
    } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Додати подарунок</h2>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Що ти хочеш? *"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Орієнтовна ціна"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="low">Низький пріоритет (бажано)</option>
                        <option value="medium">Середній пріоритет (дуже хочу)</option>
                        <option value="high">Високий пріоритет (мрія!)</option>
                    </select>

                    <input
                        type="url"
                        name="link"
                        placeholder="Посилання на товар (https://...)"
                        value={formData.link}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="imgURL"
                        placeholder="Пряме посилання на картинку"
                        value={formData.imgURL}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Коментар або деталі (розмір, колір тощо)"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} disabled={loading}>
                            Скасувати
                        </button>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Додаємо...' : 'Додати у список'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;