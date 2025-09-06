const { createClient } = require("redis");
require("dotenv").config();
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const client = createClient({
  username: "default",
  password: REDIS_PASSWORD,
  socket: {
    host: "redis-15168.c258.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 15168,
  },
});

client.on("error", (err) => console.error("❌ Redis Client Error", err));

(async () => {
  await client.connect();
  console.log("✅ Redis connected");
})();

module.exports = client;