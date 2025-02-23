import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string); // .env.local의 REDIS_URL 사용

export default redis;
