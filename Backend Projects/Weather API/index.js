const express = require("express");
const { createClient } = require("redis");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.set("json spaces", 2);

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 50,
  message: "Daily limit reached. Try again tomorrow!",
  standardHeaders: true,
  legacyHeaders: false,
});

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Error", err));

(async () => {
  await redisClient.connect();
  console.log("connected to redis");
})();

app.get("/weather/api/:location", limiter, async (req, res) => {
  const city = req.params.location.toLowerCase().trim();

  try {
    const cachedData = await redisClient.get(city);
    if (cachedData) {
      console.log("serving from cache");
      return res.json(JSON.parse(cachedData));
    }

    const data = await fetchData(city);
    if (data) {
      await redisClient.set(city, JSON.stringify(data), { EX: 43200 });
      return res.json(data);
    }

    res.status(404).json({ error: "location not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const fetchData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${process.env.WEATHER_API_KEY}`,
    );

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
