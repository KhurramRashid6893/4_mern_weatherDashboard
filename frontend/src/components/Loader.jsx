import '../css/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="weather-loader">
        <div className="sun"></div>
        <div className="cloud"></div>
      </div>
      <p className="loader-text">Gathering weather data...</p>
    </div>
  );
};

export default Loader;