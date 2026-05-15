import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import googleLogo from "../../../assets/google.png";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/users/login',
                formData
            );

            console.log("Login response:", response.data);

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }

        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <div className="card-header">
                <h2>Login into account</h2>
                <p>Fill in your details to get started</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>

                <div className="input-group">
                    <span className="input-icon">✉️</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <span className="input-icon">🔒</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>

                <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>

                <div className="divider">
                    <span>Or join with</span>
                </div>

                <button type="button" className="btn-google">
                    <img src={googleLogo} alt="Google" />
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