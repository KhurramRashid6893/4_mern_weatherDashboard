import '../css/Alert.css'; // Importing the CSS for styling
const Alert = ({ message, type }) => {
  // Determine styling based on alert type
  const styles = {
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      emoji: "⛈️",
      title: "Weather Alert!",
      icon: "❌"
    },
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      emoji: "🌈",
      title: "Success!",
      icon: "✅"
    }
  };

  const { bg, text, emoji, title, icon } = styles[type] || styles.success;

  return (
    <div className={`alert-container ${bg}`}>
      <div className="alert-header">
        <span className="alert-emoji">{emoji}</span>
        <h3 className="alert-title">{title}</h3>
        <span className="alert-icon">{icon}</span>
      </div>
      <div className={`alert-message ${text}`}>
        {message}
      </div>
      <div className="alert-progress"></div>
    </div>
  );
};

export default Alert;