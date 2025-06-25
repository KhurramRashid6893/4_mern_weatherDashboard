const axios = require("axios");

const getWeather = async (req, res) => {
  const city = req.params.city;
  const apiKey = "6e7d9a56bc28f44a977b2e8dea702979";

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const response = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    };

    res.json(response);
  } catch (err) {
  console.error("❌ AXIOS ERROR:", err.response?.data || err.message);
  res.status(500).json({ message: "Failed to fetch weather data" });
}

};

module.exports = { getWeather };
