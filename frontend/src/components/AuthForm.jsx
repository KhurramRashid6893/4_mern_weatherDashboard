import { useState } from "react";
import "../css/AuthForm.css"; // Assuming you have a CSS file for styling

const AuthForm = ({ type, onSubmit }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isRegister = type === "register";
  const weatherEmoji = isRegister ? "🌤️" : "🔑";
  const title = isRegister ? "Create Your Weather Account" : "Welcome Back to WeatherVista";

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-weather">{weatherEmoji}</div>
        <h2 className="auth-title">{title}</h2>
        <p className="auth-subtitle">
          {isRegister 
            ? "Join us to track weather across the globe" 
            : "Sign in to access your weather dashboard"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="auth-input"
            />
          </div>
        )}

        <div className="input-group">
          <span className="input-icon">✉️</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="auth-input"
          />
        </div>

        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="auth-input"
          />
        </div>

        <button type="submit" className="auth-button">
          <span className="button-text">
            {isRegister ? "Create Account" : "Login to Dashboard"}
          </span>
          <span className="button-arrow">→</span>
        </button>

        <div className="auth-footer">
          <p className="auth-redirect">
            {isRegister 
              ? "Already have an account? " 
              : "Don't have an account? "}
            <a href={isRegister ? "/login" : "/register"} className="auth-link">
              {isRegister ? "Login here" : "Register now"}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;