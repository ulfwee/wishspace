import React from 'react';
import RegisterForm from './components/RegisterForm';
import '../../styles/AuthPages.css';

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo-icon">🎁</div>
        <h1>Join WishSpace</h1>
        <p>Start sharing your dreams with friends</p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;