import ProfileHeader from "../components/ProfileHeader";
import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";
import WeatherCard from "../components/WeatherCard";
import "../css/Home.css"; // Assuming you have a CSS file for styling

const Home = ({ user, loading, weatherData, onSearch, onAddFav }) => {
  return (
    <div className="home-container">
      {user && <ProfileHeader name={user.name} />}
      <SearchForm onSearch={onSearch} />
      
      <div className="weather-results">
        {loading && <Loader />}
        {weatherData && <WeatherCard data={weatherData} />}
        
        {user && weatherData && (
          <button
            onClick={onAddFav}
            className="favorite-button"
          >
            <span className="button-icon">⭐</span>
            <span className="button-text">Add to Favorites</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;