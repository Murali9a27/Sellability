import { redis } from './redis';

// export async function getCache<T>(key: string): Promise<T | null> {
//   const data = await redis.get(key);
//   return data ? (JSON.parse(data) as T) : null;
// }

// export async function setCache(
//   key: string,
//   value: unknown,
//   ttl: number
// ) {
//   await redis.setEx(key, ttl, JSON.stringify(value));
// }



export async function getCache<T>(key: string): Promise<T | null> {
  return null; // disable cache
}

export async function setCache() {
  return;
}