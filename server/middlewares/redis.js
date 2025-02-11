const redis = require("../config/redis");

const cacheMiddleware =
  (keyPrefix, expireTime = 60) =>
  async (req, res, next) => {
    try {
      const sortedQuery = Object.entries(req.query)
        .sort()
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const key = `${keyPrefix}:${sortedQuery}`;
      const cachedData = await redis.get(key);

      if (cachedData) {
        console.log(`🚀 Cache hit: ${key}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      console.log(`🆕 Cache miss: ${key}`);

      const originalJson = res.json.bind(res);

      res.json = async (body) => {
        try {
          await redis.setex(key, expireTime, JSON.stringify(body));
        } catch (error) {
          console.error("❌ Redis Set Error:", error);
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error("❌ Redis Middleware Error:", error);
      next();
    }
  };

module.exports = cacheMiddleware;
