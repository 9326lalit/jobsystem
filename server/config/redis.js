// const { createClient } = require("redis");
// const redisClient = createClient({ url: process.env.REDIS_URL });
// redisClient.connect();
// module.exports = redisClient;

const Redis = require("ioredis");

const redis = new Redis({
  host: "127.0.0.1", // or 'localhost'
  port: 6379,
  // password: 'yourpassword', // if password is set in container
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

module.exports = redis;
