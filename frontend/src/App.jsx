import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import AuthForm from "./components/AuthForm";
import SearchForm from "./components/SearchForm";
import FavoritesList from "./components/FavoritesList";
import ProfileHeader from "./components/ProfileHeader";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import "./css/main.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  // Mock backend fetch favorites
  const fetchFavorites = () => {
    const data = localStorage.getItem("favorites");
    setFavorites(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    if (token) {
      setUser({ name: localStorage.getItem("userName") || "User" });
      fetchFavorites();
    }
  }, [token]);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/weather/${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeatherData(data);
        setAlert(null);
      } else {
        setAlert({ message: data.message, type: "error" });
        setWeatherData(null);
      }
    } catch (err) {
      setAlert({ message: "Error fetching weather.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = ({ email, password }) => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("userName", email.split("@")[0]);
    setUser({ name: email.split("@")[0] });
    setAlert({ message: "Login successful! 🌤️", type: "success" });
    window.location.href = "/";
  };

  const handleRegister = ({ name, email, password }) => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("userName", name);
    setUser({ name });
    setAlert({ message: "Registration successful! 🎉", type: "success" });
    window.location.href = "/";
  };

  const handleAddFavorite = () => {
    if (!weatherData) return;
    const updated = [...favorites, { city: weatherData.city, country: weatherData.country }];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setAlert({ message: "🌟 Added to favorites!", type: "success" });
  };

  const handleDeleteFavorite = (city) => {
    const updated = favorites.filter((item) => item.city !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setAlert({ message: "🗑️ Removed from favorites", type: "success" });
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <div className="main-content">
          {alert && <Alert message={alert.message} type={alert.type} />}
          
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-page">
                  {user && <ProfileHeader name={user.name} />}
                  <SearchForm onSearch={handleSearch} />
                  {loading && <Loader />}
                  {weatherData && <WeatherCard data={weatherData} />}
                  {user && weatherData && (
                    <div className="favorite-button-container">
                      <button
                        onClick={handleAddFavorite}
                        className="favorite-button"
                      >
                        <span className="button-icon">⭐</span> Add to Favorites
                      </button>
                    </div>
                  )}
                </div>
              }
            />

            <Route
              path="/login"
              element={<AuthForm type="login" onSubmit={handleLogin} />}
            />

            <Route
              path="/register"
              element={<AuthForm type="register" onSubmit={handleRegister} />}
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <div>
                    <ProfileHeader name={user?.name} />
                    <FavoritesList
                      favorites={favorites}
                      onDelete={handleDeleteFavorite}
                      onSearch={handleSearch}
                    />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        <footer className="app-footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} WeatherVista. All rights reserved.</p>
            <p>Made with By Khurram Rashid ☕ using React & OpenWeather API</p>
            <p> As a Part of MERN Project</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;