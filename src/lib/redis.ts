import { createClient } from 'redis';

declare global {
  var redisClient: ReturnType<typeof createClient> | undefined;
}

export const redis =
  global.redisClient ??
  createClient({
    url: process.env.REDIS_URL!,
  });

if (!global.redisClient) {
  redis.connect().catch(console.error);
  global.redisClient = redis;
}