import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from './components/AdminHeader/AdminHeader';
import './AdminPage.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            alert("Помилка завантаження користувачів");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId, username) => {
        if (!window.confirm(`Видалити користувача ${username}?`)) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setUsers(prev => prev.filter(user => user.id !== userId));
            alert("Користувача видалено");
        } catch (err) {
            alert("Не вдалося видалити користувача");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-page">
            <HomeHeader activePage="admin" />
            
            <main className="admin-container">
                <div className="admin-header">
                    <h1>Admin Panel</h1>
                    <p>Управління користувачами ({users.length})</p>
                    
                    <input
                        type="text"
                        placeholder="Пошук по username або email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="admin-search"
                    />
                </div>

                {loading ? (
                    <p>Завантаження...</p>
                ) : (
                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Дата реєстрації</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id?.slice(0, 8)}...</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-badge ${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            {user.createdAt 
                                                ? new Intl.DateTimeFormat('uk-UA', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }).format(new Date(user.createdAt))
                                                : '—'}
                                        </td>
                                        <td>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => deleteUser(user.id || user.uid, user.username)}
                                            >
                                                Видалити
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;