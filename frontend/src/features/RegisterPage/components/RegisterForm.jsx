import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Google Login Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      const res = await axios.post(
        'https://wishspace.onrender.com/users/google-auth',
        { idToken: credentialResponse.credential },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Google registration failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    alert("Не вдалося увійти через Google");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://wishspace.onrender.com/users/register',
        formData
      );
      
      localStorage.setItem('token', response.data.token);
      navigate('/home');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Не вдалося зареєструвати користувача');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="card-header">
        <h2>Create Account</h2>
        <p>Fill in your details to get started</p>
      </div>

      {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input 
              type="text" 
              name="name"
              placeholder="First Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <span className="input-icon">👤</span>
            <input 
              type="text" 
              name="surname"
              placeholder="Last Name" 
              value={formData.surname}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <span className="input-icon">🧑‍💼</span>
          <input 
            type="text" 
            name="username"
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="input-group">
          <span className="input-icon">✉️</span>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="divider">
          <span>Or join with</span>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="filled_blue"
          size="large"
          text="signup_with"
          shape="pill"
        />

        <div className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;