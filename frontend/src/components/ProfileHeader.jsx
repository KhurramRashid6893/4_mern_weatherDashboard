import '../css/ProfileHeader.css';

const ProfileHeader = ({ name }) => {
  return (
    <div className="profile-header">
      <div className="weather-animation">
        <div className="sun"></div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
      </div>
      
      <div className="welcome-content">
        <h2 className="welcome-title">
          <span className="welcome-emoji">👋</span> Hello, 
          <span className="user-name"> {name}</span>
        </h2>
        <p className="welcome-message">
          Ready to check today's forecast? Let's explore the weather together!
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;