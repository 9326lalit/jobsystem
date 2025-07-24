const redis = require("../config/redis");

const setCache = async (key, value, expiryInSec = 3600) => {
  await redis.set(key, JSON.stringify(value), "EX", expiryInSec);
};

const getCache = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

module.exports = { setCache, getCache };
