import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import ProfileHero from './components/ProfileHero/ProfileHero';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("You are not logged in");
                    return;
                }

                const response = await axios.get(
                    'http://localhost:5000/users/me',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setUser(response.data);
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.error || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);       
    };

    if (loading) return <div className="loading-screen">Завантаження профілю...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!user) return <div>Користувач не знайдений</div>;

    return (
        <div className="profile-page">
            <HomeHeader activePage="profile" />

            <main className="profile-container">
                <ProfileHero 
                    user={user} 
                    onUserUpdate={handleUserUpdate}     
                />
                
                
            </main>
        </div>
    );
};

export default ProfilePage;