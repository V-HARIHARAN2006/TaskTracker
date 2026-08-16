import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/auth/login",
                formData
            );

            console.log("Login successful:", response.data);

            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            console.log(
                "Token saved:",
                localStorage.getItem("token")
            );

            console.log(
                "User saved:",
                localStorage.getItem("user")
            );

            // Go to dashboard
            window.location.href = "/dashboard";

        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );

            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* Background decorations */}
            <div className="login-decoration decoration-one"></div>
            <div className="login-decoration decoration-two"></div>

            <div className="login-container">

                {/* Left branding section */}
                <div className="login-brand">

                    <div className="brand-logo">
                        ✓
                    </div>

                    <h1>Task Tracker</h1>

                    <p>
                        Organize your work.
                        <br />
                        Achieve your goals.
                    </p>

                    <div className="brand-features">
                        <div>
                            <span>✓</span>
                            Manage your tasks
                        </div>

                        <div>
                            <span>✓</span>
                            Stay productive
                        </div>

                        <div>
                            <span>✓</span>
                            Track your progress
                        </div>
                    </div>

                </div>

                {/* Login card */}
                <div className="login-card">

                    <div className="login-header">
                        <h2>Welcome Back 👋</h2>

                        <p>
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <span>⚠</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="input-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div className="input-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <button
                            className="login-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login
                                    <span className="arrow">→</span>
                                </>
                            )}
                        </button>

                    </form>

                    <div className="login-divider">
                        <span>OR</span>
                    </div>

                    <p className="register-text">
                        Don't have an account?
                        <Link to="/register">
                            Create an account
                        </Link>
                    </p>

                </div>

            </div>

            <div className="login-footer">
                © 2026 Task Tracker • Stay organized, stay productive.
            </div>

        </div>
    );
}

export default Login;