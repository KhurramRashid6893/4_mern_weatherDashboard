import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "../css/Navbar.css"; 

const Navbar = () => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("favorites");
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="logo-section">
          <div className="weather-logo">🌤️</div>
          <h1 className="app-title">
            <Link to="/">WeatherVista</Link>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links-container ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-emoji">🏠</span> Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-emoji">⭐</span> Favorites
              </Link>
            </li>

            {!token ? (
              <>
                <li>
                  <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    <span className="nav-emoji">🔑</span> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-link register-link" onClick={() => setIsMenuOpen(false)}>
                    <span className="nav-emoji">📝</span> Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="welcome-text">
                  <span className="welcome-emoji">👋</span> Hi, {userName || "User"}!
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    <span className="logout-emoji">🚪</span> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;