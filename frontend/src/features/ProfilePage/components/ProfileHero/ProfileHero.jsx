import React, { useState } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import './ProfileHero.css';

const ProfileHero = ({ user, onUserUpdate }) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = user?.name && user?.surname 
    ? `${user.name[0]}${user.surname[0]}`.toUpperCase() 
    : user?.username?.slice(0, 2)?.toUpperCase() || 'JD';

    const handleSave = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No token found");

            const response = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch {
                    errorData = { error: errorText };
                }
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const result = await response.json();
            const updatedUser = result.data || result.user || result;

            onUserUpdate?.(updatedUser);
            setIsModalOpen(false);

        } catch (error) {
            console.error('Update error:', error);
            alert(error.message || 'Не вдалося оновити профіль');
        }
    };
  return (
    <>
      <div className="profile-hero-card">
        {/* Верхній банер */}
        <div className="profile-banner"></div>

        <div className="profile-content-wrapper">
          <div className="profile-main-info">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" />
                ) : (
                  initials
                )}
              </div>
            </div>

            <div className="profile-text-details">
              <h1 className="profile-name">
                {user?.name} {user?.surname || user?.username}
              </h1>
              <p className="profile-email">{user?.email}</p>
              <p className="profile-bio">
                {user?.bio || '✨ Making gift-giving magical since 2024'}
              </p>
            </div>
          </div>

          <button 
            className="btn-edit-profile" 
            onClick={() => setIsModalOpen(true)}
          >
            ⚙️ Edit Profile
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user}
        onSave={handleSave}
      />
    </>
  );
};

export default ProfileHero;