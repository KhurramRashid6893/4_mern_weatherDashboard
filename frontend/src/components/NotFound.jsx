const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="weather-scene">
        <div className="cloud sad-cloud">
          <div className="face">
            <div className="eye left"></div>
            <div className="eye right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="rain">
          {[...Array(20)].map((_, i) => <div key={i} className="drop"></div>)}
        </div>
        <div className="ground"></div>
      </div>
      
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Weather Page Not Found!</h2>
        <p className="error-message">
          Looks like this forecast blew away in the wind. 
          Let's find you a sunny destination instead.
        </p>
        
        <div className="action-buttons">
          <a href="/" className="home-button">
            <span className="button-icon">🏠</span> 
            Return Home
          </a>
          <a href="/" className="search-button">
            <span className="button-icon">🔍</span> 
            Search Weather
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;