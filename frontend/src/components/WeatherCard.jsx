import '../css/WeatherCard.css';
const WeatherCard = ({ data }) => {
  // Get weather type for styling
  const getWeatherType = () => {
    if (!data) return 'default';
    if (data.temperature < 10) return 'cold';
    if (data.temperature >= 10 && data.temperature < 25) return 'moderate';
    return 'hot';
  };

  const weatherType = getWeatherType();
  const weatherEmoji = {
    cold: '❄️',
    moderate: '🌤️',
    hot: '☀️'
  }[weatherType];

  return (
    <div className={`weather-card ${weatherType}`}>
      <div className="weather-header">
        <h2 className="location">
          {data.city}, {data.country}
          <span className="weather-emoji">{weatherEmoji}</span>
        </h2>
        <p className="weather-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="weather-main">
        <div className="temperature-display">
          <div className="icon-container">
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
              alt="weather-icon"
              className="weather-icon"
            />
          </div>
          <p className="temperature">{data.temperature}°C</p>
        </div>
        <p className="description">{data.description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-info">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{data.humidity}%</p>
          </div>
        </div>
        
        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div className="detail-info">
            <p className="detail-label">Wind</p>
            <p className="detail-value">{data.wind} m/s</p>
          </div>
        </div>
        
        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(data.temperature * 0.9)}°C</p>
          </div>
        </div>
        
        <div className="detail-card">
          <div className="detail-icon">👀</div>
          <div className="detail-info">
            <p className="detail-label">Visibility</p>
            <p className="detail-value">{(data.visibility || 10000) / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;