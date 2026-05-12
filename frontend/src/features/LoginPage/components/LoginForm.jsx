import React, { useState } from 'react';
import googleLogo from "../../../assets/google.png";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-card">
      <div className="card-header">
        <h2>Create Account</h2>
        <p>Fill in your details to get started</p>
      </div>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        
        <div className="input-group">
          <span className="input-icon">✉️</span>
          <input type="email" placeholder="Email" required />
        </div>

        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        <button type="submit" className="btn-primary">
          Log In
        </button>

        <div className="divider">
          <span>Or join with</span>
        </div>

        <button type="button" className="btn-google">
          <img 
            src={googleLogo}
            alt="Google" 
          />
          Sign up with Google
        </button>

        <div className="auth-footer">
          Dont have an account? <a href="/register">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;