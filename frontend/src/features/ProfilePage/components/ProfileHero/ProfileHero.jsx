import React, { useState, useRef } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import './ProfileHero.css'

const ProfileHero = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = user?.name && user?.surname 
    ? `${user.name[0]}${user.surname[0]}`.toUpperCase() 
    : user?.username?.slice(0, 2).toUpperCase() || 'JD';

  return (
    <>
        <div className="profile-hero">
            <div className="profile-content-wrapper">
            <div className="profile-avatar-container">
                <div className="profile-avatar">
                    {user.avatarUrl ? (
                        <img 
                        src={user.avatarUrl} 
                        alt="Avatar" 
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                    ) : (
                        initials
                    )}
                </div>
                <button className="edit-avatar-btn">📷</button>
            </div>

            <div className="profile-info">
                <h1 className="profile-name">{user.name} {user.surname}</h1>
                <p className="profile-email">{user.email}</p>
                <p className="profile-bio">{user.bio || '✨ Making gift-giving magical since 2024'}</p>
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
        onSave={(updatedData) => {
          console.log('Updated:', updatedData);
        }}
      />
    </>
  );
};

export default ProfileHero;