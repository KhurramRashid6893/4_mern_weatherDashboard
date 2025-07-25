const rateLimit = require("express-rate-limit");

const weatherLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later"
  }
});

module.exports = { weatherLimiter };
