import '../css/FavouritesList.css';

const FavoritesList = ({ favorites, onDelete, onSearch }) => {
  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="favorites-emoji">⭐</div>
        <h2 className="favorites-title">Your Favorite Locations</h2>
        <p className="favorites-subtitle">
          {favorites.length === 0 
            ? "Add cities to your favorites for quick access" 
            : "Click on a city to view its weather forecast"}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-emoji">🌍</div>
          <p className="empty-text">No favorite cities yet</p>
          <p className="empty-hint">
            Search for a city and click the star icon to add it here
          </p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav, index) => (
            <div 
              key={index} 
              className="favorite-card"
              onClick={() => onSearch(fav.city)}
            >
              <div className="card-header">
                <div className="weather-emoji">🌤️</div>
                <div className="location-info">
                  <h3 className="city-name">{fav.city}</h3>
                  <p className="country-name">{fav.country}</p>
                </div>
              </div>
              
              <div className="card-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(fav.city);
                  }}
                  className="delete-button"
                  aria-label="Remove from favorites"
                >
                  <span className="delete-icon">🗑️</span>
                  <span className="delete-text">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;