import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string); // .env.local의 REDIS_URL 사용

export default redis;

// vercel에서 제공하는 redis 서비스를 사용하기 위해 ioredis를 사용
// redis는 db 서버로 사용되며, redis 서버를 사용하면 데이터를 빠르게 저장하고 불러올 수 있다.