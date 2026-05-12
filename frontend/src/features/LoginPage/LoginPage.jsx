import React from 'react';
import RegisterForm from './components/LoginForm';
import '../../styles/AuthPages.css';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo-icon">🎁</div>
        <h1>Join WishSpace</h1>
        <p>Start sharing your dreams with friends</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;