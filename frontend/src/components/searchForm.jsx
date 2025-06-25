import { useState } from "react";
import "../css/SearchForm.css"; // Assuming you have a CSS file for styling

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2 className="search-title">🔍 Find Your Weather</h2>
        <p className="search-subtitle">Enter any city to get current weather and forecast</p>
      </div>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <span className="input-icon">📍</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
            required
          />
          <button type="submit" className="search-button">
            <span className="button-text">Search</span>
            <span className="button-icon">🌤️</span>
          </button>
        </div>
      </form>
      
      <div className="search-tips">
        <p>💡 Tips: Try "London, UK" or "New York, US" for precise results</p>
      </div>
    </div>
  );
};

export default SearchForm;